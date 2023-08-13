<script setup lang="ts">
import taskForm from '@/components/taskForm.vue';
import {useStore} from 'vuex';
import {computed, defineComponent, ref} from 'vue';
import {createNamespacedHelpers} from 'vuex-composition-helpers';
import Task from '@/types/task';
const { useGetters, useActions, useMutations } = createNamespacedHelpers( 'task'); // specific module name
import { useRoute } from 'vue-router'

const state = ref<Task>(null);
const route = useRoute();
const btnTitle = 'Изменить';
const store = useStore();
const { getTaskById, getRouteState } = useGetters(['getTaskById', 'getRouteState']);
const { fetchTasks, editTask } = useActions(['fetchTasks', 'editTask']);
const { setTaskIdToEdit } = useMutations(['setTaskIdToEdit']);

const getTasks = async () => {
  state.value = await fetchTasks()
}

setTaskIdToEdit(route.params.taskId);

const isLoading = computed((): boolean => store.state.task.isLoading);
const isError = computed((): boolean => store.state.task.isError);

if (!getRouteState.value) {
  getTasks();
}
</script>

<template>
  <div class="page">
    <h2 class="title title--h2">
      Редактирование задачи
    </h2>

    <h2 class="title title--h2 error" v-if="isError">
      Произошла ошибка, попробуйте еще раз
    </h2>
    <h2 class="title title--h2" v-if="isLoading">
      Идет загрузка...
    </h2>
    <task-form v-else :initialData="{id: getTaskById.id, date: getTaskById.date, title: getTaskById.title, importance: getTaskById.importance, btnTitle}" @editTask="editTask"/>
  </div>
</template>

<style scoped>

</style>
