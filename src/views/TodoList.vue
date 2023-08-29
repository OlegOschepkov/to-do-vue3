<script setup lang="ts">
import TasksList from '@/components/TasksList.vue';
import TaskForm from '@/components/TaskForm.vue';
import BasicSelect from '@/components/UI/BasicSelect.vue';
import BasicTextInput from '@/components/UI/BasicTextInput.vue';
import { useStore } from 'vuex';
import { computed, onUnmounted, ref } from 'vue';
import { createNamespacedHelpers } from 'vuex-composition-helpers';
import { Task } from '@/types/task';
import { useTasks } from '@/hooks/useTasks';
const { useGetters, useActions, useMutations } = createNamespacedHelpers( 'task'); // specific module name

const state = ref<Task[]>(null);
const store = useStore();
const taskState = store.state.task; // достаем именованный стейт
const { addTask, stopListener } = useActions(['addTask', 'stopListener']);
const { getSortedAndSearchedActiveTasks, getSortedAndSearchedCompletedTasks } = useGetters(['getSortedAndSearchedActiveTasks', 'getSortedAndSearchedCompletedTasks']);
const { setSelectedSort, setSearchQuery } = useMutations(['setSelectedSort', 'setSearchQuery']);

const { isLoading, isError, getTasksFromDB } = useTasks(state, store);

const selectedSort = computed((): string => taskState.selectedSort);
const searchQuery = computed((): string => taskState.searchQuery);
const sortOptions = computed((): string[] => taskState.sortOptions);

getTasksFromDB();

onUnmounted(() => {
  stopListener()
});
</script>

<template>
  <div class="page">
    <div class="form">
      <BasicTextInput
        id="search"
        name="search"
        label="поиск"
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
      />
      <BasicSelect
        :model-value="selectedSort"
        @update:model-value="setSelectedSort"
        :options="sortOptions"
      />
    </div>

    <h1 class="title">Список задач</h1>

    <div class="tasks-container">
      <TasksList
        :is-loading="isLoading"
        :is-error="isError"
        :tasks="getSortedAndSearchedActiveTasks"
      />
      <TasksList
        :is-loading="isLoading"
        :is-error="isError"
        :completed="true"
        :tasks="getSortedAndSearchedCompletedTasks"
      />
    </div>
    <TaskForm @addTask="addTask"/>
  </div>
</template>

<style scoped lang="scss">

</style>
