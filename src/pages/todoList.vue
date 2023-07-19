<template>
  <div class="page">
    <my-input
        id="search"
        label="поиск"
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
    />
    <my-select
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
      <h2 class="title title--h2" v-if="sortedAndSearchedTasks.length === 0">
        Создайте задачу или измените условия фильтрации
      </h2>

      <div class="tasks-container" v-else>
        <tasks-list
          :tasks="sortedAndSearchedTasks"
        />
      </div>
    </div>
    <task-form @addTask="addTask"/>
  </div>
</template>

<script>
/* eslint-disable */
import tasksList from '@/components/tasksList';
import taskForm from '@/components/taskForm';
import mySelect from '@/components/UI/mySelect';
import tasks from "@/seeders/tasks.json";
import {mapActions, mapMutations, mapGetters, mapState, useStore} from 'vuex';
import {computed, reactive, ref} from 'vue';
import { createNamespacedHelpers } from 'vuex-composition-helpers';
// import {taskModule} from '@/store/taskModule';
const { useGetters, useActions, useMutations } = createNamespacedHelpers( 'task'); // specific module name

export default {
  name: "todo-list",

  components: {
    tasksList,
    mySelect,
    taskForm
  },

  setup() {
    const state = ref({ tasks: {} })
    const store = useStore();
    const taskState = store.state.task;
    const { fetchTasks } = useActions(['fetchTasks']);
    const { sortedAndSearchedTasks } = useGetters(['sortedAndSearchedTasks']);
    const { setSelectedSort, setSearchQuery, addTask } = useMutations(['setSelectedSort', 'setSearchQuery', 'addTask']);

    const getTasks = async () => {
      state.value.tasks = await fetchTasks()
    }

    const isLoading = computed(() => taskState.isLoading);
    const isError = computed(() => taskState.isError);
    const selectedSort = computed(() => taskState.selectedSort);
    const searchQuery = computed(() => taskState.searchQuery);
    const sortOptions = computed(() => taskState.sortOptions);

    getTasks()

    return {
      selectedSort,
      searchQuery,
      sortOptions,
      isLoading,
      isError,
      setSelectedSort,
      setSearchQuery,
      addTask,
      sortedAndSearchedTasks
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
  //     sortedAndSearchedTasks: 'task/sortedAndSearchedTasks'
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
}
</script>

<style>
.page {
  min-height: 100vh;
  padding: 74px 0;
}

.error {
  color: $color-cardinal;
}
</style>
