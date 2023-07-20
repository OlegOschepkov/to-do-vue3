import {ref, onMounted} from 'vue';

export const useTasks = () => {
  const tasks = ref([]);
  const isLoading = ref(true);
  const isError = ref(false);

  const fetching = async () => {
    try {
      await new Promise((resolve) => {
        setTimeout(() => {
          let returnObj;
          if (!localStorage["todovue3tasks"]) {
            localStorage.setItem('todovue3tasks', '');
          } else {
            returnObj = JSON.parse(localStorage.getItem("todovue3tasks"));
            tasks.value = returnObj.tasks;
          }
          resolve()
        }, 1000)
      });
    } catch (e) {
      isError.value = true;
      console.log(e.message)
    } finally {
      isLoading.value = false;
    }
  }

  onMounted(fetching)

  return {
    tasks, isLoading, isError
  }
}
