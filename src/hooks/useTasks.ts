import { computed } from 'vue';
import { createNamespacedHelpers } from 'vuex-composition-helpers';
const taskModule = createNamespacedHelpers('taskModule');
const authModule = createNamespacedHelpers('authModule');

export function useTasks (state, store) {
  const { fetchTasks } = taskModule.useActions(['fetchTasks']);
  const { fetchUser } = authModule.useActions(['fetchUser']);

  const getTasksFromDB = async () => {
    state.value = await fetchTasks();
  };

  const setUser = async () => {
    await fetchUser();
  }

  const isLoading = computed((): boolean => store.state.taskModule.isLoading);
  const isError = computed((): boolean => store.state.taskModule.isError);

  return {
    getTasksFromDB, setUser, isLoading, isError
  }
}
