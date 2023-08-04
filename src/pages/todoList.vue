<template>
  <div class="page">
    <basicTextInput
        id="search"
        label="поиск"
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
    />
    <basicSelect
        :model-value="selectedSort"
        @update:model-value="setSelectedSort"
        :options="sortOptions"
    />
    <h2 class="title title--h2 error" v-if="isError">
      Произошла ошибка, попробуйте еще раз
    </h2>
    <h2 class="title title--h2" v-if="isLoading">
      Идет загрузка...
    </h2>
    <div v-else>
      <h2 class="title title--h2" v-if="getSortedAndSearchedTasks.length === 0">
        Создайте задачу или измените условия фильтрации
      </h2>

      <div class="tasks-container" v-else>
        <tasks-list
          :tasks="getSortedAndSearchedTasks"
        />
      </div>
    </div>
    <task-form @addTask="addTask"/>
  </div>
</template>

<script lang="ts">
import tasksList from '@/components/tasksList.vue';
import taskForm from '@/components/taskForm.vue';
import basicSelect from '@/components/UI/basicSelect.vue';
import {useStore} from 'vuex';
import {computed, defineComponent, onUnmounted, ref} from 'vue';
import { createNamespacedHelpers } from 'vuex-composition-helpers';
import Task from '@/types/task';
const { useGetters, useActions, useMutations } = createNamespacedHelpers( 'task'); // specific module name

export default defineComponent({
  name: "todo-list",

  components: {
    tasksList,
    basicSelect,
    taskForm
  },

  setup() {
    const state = ref<Task[]>(null);
    const store = useStore();
    const taskState = store.state.task; // достаем именованный стейт
    const { fetchTasks, addTask, stopListener } = useActions(['fetchTasks', 'addTask', 'stopListener']);
    const { getSortedAndSearchedTasks } = useGetters(['getSortedAndSearchedTasks']);
    const { setSelectedSort, setSearchQuery } = useMutations(['setSelectedSort', 'setSearchQuery']);

    const getTasks = async () => {
      state.value = await fetchTasks()
    }

    const isLoading = computed((): boolean => taskState.isLoading);
    const isError = computed((): boolean => taskState.isError);
    const selectedSort = computed((): string => taskState.selectedSort);
    const searchQuery = computed((): string => taskState.searchQuery);
    const sortOptions = computed((): string[] => taskState.sortOptions);

    getTasks();

    onUnmounted(() => {
      stopListener()
    });

    return {
      selectedSort,
      searchQuery,
      sortOptions,
      isLoading,
      isError,
      setSelectedSort,
      setSearchQuery,
      addTask,
      getSortedAndSearchedTasks
    }
  }

  // mounted() {
  //   this.fetchTasks();
  // },
  //
  // data() {
  //   return {
  //     tasks: tasks.tasks,
  //   }
  // },
  //
  // computed: {
  //   ...mapState({
  //     selectedSort: state => state.task.selectedSort,
  //     searchQuery: state => state.task.searchQuery,
  //     sortOptions: state => state.task.sortOptions,
  //     isLoading: state => state.task.isLoading,
  //     isError: state => state.task.isError,
  //   }),
  //
  //   ...mapGetters({
  //     getSortedAndSearchedTasks: 'task/getSortedAndSearchedTasks'
  //   })
  // },
  //
  // methods: {
  //   ...mapActions({
  //       fetchTasks: 'task/fetchTasks'
  //   }),
  //
  //   ...mapMutations({
  //     setSelectedSort: 'task/setSelectedSort',
  //     setSearchQuery: 'task/setSearchQuery',
  //     addTask: 'task/addTask',
  //   }),
  // }
})
</script>

<style>
.page {
  min-height: 100vh;
  padding: 74px 0;
}

.error {
  color: red;
}
</style>
