<script setup lang="ts">
import TasksList from '@/components/TasksList.vue';
import TaskForm from '@/components/TaskForm.vue';
import BasicSelect from '@/components/UI/BasicSelect.vue';
import BasicTextInput from '@/components/UI/BasicTextInput.vue';
import { useStore } from 'vuex';
import { computed, onUnmounted, ref } from 'vue';
import { createNamespacedHelpers } from 'vuex-composition-helpers';
import { Task } from '@/types/task';
import { SortOption } from '@/types/sortOptions';
import { useTasks } from '@/hooks/useTasks';
const taskModule = createNamespacedHelpers('taskModule');
const authModule = createNamespacedHelpers('authModule');

const state = ref<Task[]>(null);
const store = useStore();
const taskState = store.state.taskModule;
const { addTask, stopListener } = taskModule.useActions(['addTask', 'stopListener']);
const { getSortedAndSearchedActiveTasks, getSortedAndSearchedCompletedTasks } = taskModule.useGetters(['getSortedAndSearchedActiveTasks', 'getSortedAndSearchedCompletedTasks']);
const { setSelectedSort, setSearchQuery } = taskModule.useMutations(['setSelectedSort', 'setSearchQuery']);
const { fetchUser } = authModule.useActions(['fetchUser']);

const { isLoading, isError, getTasksFromDB } = useTasks(state, store);

const selectedSort = computed((): string => taskState.selectedSort);
const searchQuery = computed((): string => taskState.searchQuery);
const sortOptions = computed((): SortOption[] => taskState.sortOptions);

fetchUser();
getTasksFromDB();

onUnmounted(() => {
  stopListener()
});
</script>

<template>
  <div class="container container--animation container--wide">
    <div class="tasks-page">
      <aside class="aside aside--left">
        <div class="form">
          <h3 class="title title--h3">Фильтрация</h3>

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
      </aside>

      <div class="container">
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
      </div>

      <aside class="aside aside--right">
        <TaskForm
          @addTask="addTask"
        />
      </aside>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tasks-page {
  display: flex;
  min-height: calc(100vh - 104px);
}

.aside {
  width: 100%;
  max-width: 250px;
  padding-top: 25px;

  .input-element:first-of-type {
    margin-top: 0;
  }
}
</style>
