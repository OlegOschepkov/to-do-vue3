import { computed } from 'vue';
import { createNamespacedHelpers } from 'vuex-composition-helpers';
const { useActions } = createNamespacedHelpers( 'task'); // specific module name

export function useTasks(state, store) {
  const { fetchTasks } = useActions(['fetchTasks']);

  const getTasksFromDB = async () => {
    state.value = await fetchTasks();
  };

  const isLoading = computed((): boolean => store.state.task.isLoading);
  const isError = computed((): boolean => store.state.task.isError);

  return {
    getTasksFromDB, isLoading, isError
  }
}
