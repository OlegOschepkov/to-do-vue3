<script setup lang="ts">
import TaskForm from '@/components/TaskForm.vue';
import LoadingIndicator from '@/components/UI/LoadingIndicator.vue'
import { useStore } from 'vuex';
import { ref } from 'vue';
import { createNamespacedHelpers } from 'vuex-composition-helpers';
import { Task } from '@/types/task';
const { useGetters, useActions, useMutations } = createNamespacedHelpers( 'task'); // specific module name
import { useRoute } from 'vue-router'
import { useTasks } from '@/hooks/useTasks';

const state = ref<Task>(null);
const route = useRoute();
const btnTitle = 'Изменить';
const store = useStore();
const { getTaskById, getRouteState } = useGetters(['getTaskById', 'getRouteState']);
const { editTask } = useActions(['editTask']);
const { setTaskIdToEdit } = useMutations(['setTaskIdToEdit']);

setTaskIdToEdit(route.params.taskId);

const { isLoading, isError, getTasksFromDB } = useTasks(state, store);

if (!getRouteState.value) {
  getTasksFromDB();
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
    <LoadingIndicator v-if="isLoading"/>
    <TaskForm v-else :initialData="{id: getTaskById.id, date: getTaskById.date, title: getTaskById.title, importance: getTaskById.importance, btnTitle}" @editTask="editTask"/>
  </div>
</template>

<style scoped>

</style>
