<script setup lang="ts">
import TaskForm from '@/components/TaskForm.vue';
import LoadingIndicator from '@/components/UI/LoadingIndicator.vue'
import { useStore } from 'vuex';
import { ref } from 'vue';
import { createNamespacedHelpers } from 'vuex-composition-helpers';
import { Task } from '@/types/task';
const taskModule = createNamespacedHelpers('taskModule');
const authModule = createNamespacedHelpers('authModule');
import { useRoute } from 'vue-router'
import { useTasks } from '@/hooks/useTasks';

const state = ref<Task>(null);
const route = useRoute();
const store = useStore();
const btnTitle = 'Изменить';
const { getTaskById, getRouteState } = taskModule.useGetters(['getTaskById', 'getRouteState']);
const { editTask } = taskModule.useActions(['editTask']);
const { setTaskIdToEdit } = taskModule.useMutations(['setTaskIdToEdit']);
const { fetchUser } = authModule.useActions(['fetchUser']);

fetchUser();
setTaskIdToEdit(route.params.taskId);

const { isLoading, isError, getTasksFromDB } = useTasks(state, store);

if (!getRouteState.value) {
  getTasksFromDB();
}
</script>

<template>
  <div class="container container--animation">
    <h2 class="title title--h2">
      Редактирование задачи
    </h2>

    <h2
      v-if="isError"
      class="title title--h2 error"
    >
      Произошла ошибка, попробуйте еще раз
    </h2>
    <LoadingIndicator
      v-if="isLoading"
    />
    <TaskForm
      v-else
      :initial-data="{
        id: getTaskById.id,
        date: getTaskById.date,
        title: getTaskById.title,
        importance: getTaskById.importance,
        access: getTaskById.access,
        btnTitle
      }"
      @editTask="editTask"
    />
  </div>
</template>

<style scoped>

</style>
