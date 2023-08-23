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
const { fetchTasks, addTask, stopListener } = useActions(['fetchTasks', 'addTask', 'stopListener']);
const { getSortedAndSearchedTasks } = useGetters(['getSortedAndSearchedTasks']);
const { setSelectedSort, setSearchQuery } = useMutations(['setSelectedSort', 'setSearchQuery']);

const { isLoading, isError, getTasks } = useTasks(state, store);

const selectedSort = computed((): string => taskState.selectedSort);
const searchQuery = computed((): string => taskState.searchQuery);
const sortOptions = computed((): string[] => taskState.sortOptions);

getTasks();

onUnmounted(() => {
  stopListener()
});
</script>

<template>
  <div class="page">
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
    <h2 class="title title--h2 error" v-if="isError">
      Произошла ошибка, попробуйте еще раз
    </h2>
    <h2 class="title title--h2" v-if="getSortedAndSearchedTasks.length === 0 && isLoading === false">
      Создайте задачу или измените условия фильтрации
    </h2>

    <div class="tasks-container" v-else>
      <TasksList
        :is-loading="isLoading"
        :tasks="getSortedAndSearchedTasks"
      />
    </div>
    <TaskForm @addTask="addTask"/>
  </div>
</template>

<style scoped lang="scss">

</style>
