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
    <h2 class="title title--h2" v-if="sortedAndSearchedTasks.length === 0">
      Создайте задачу или измените условия фильтрации
    </h2>

    <div class="tasks-container" v-else>
      <tasks-list
          :tasks="sortedAndSearchedTasks"
      />
    </div>
    <task-form @addTask="addTask"/>
  </div>
</template>

<script>
import tasksList from '@/components/tasksList';
import taskForm from '@/components/taskForm';
import mySelect from '@/components/UI/mySelect';
import tasks from "@/seeders/tasks.json";
import {mapActions, mapMutations, mapGetters, mapState} from 'vuex';

export default {
  name: "todo-list",

  components: {
    tasksList,
    mySelect,
    taskForm
  },

  mounted() {
    this.fetchTasks();
  },

  data() {
    return {
      tasks: tasks.tasks
    }
  },

  computed: {
    ...mapState({
      selectedSort: state => state.task.selectedSort,
      searchQuery: state => state.task.searchQuery,
      sortOptions: state => state.task.sortOptions
    }),

    ...mapGetters({
      sortedAndSearchedTasks: 'task/sortedAndSearchedTasks'
    })
  },

  methods: {
    ...mapActions({
        fetchTasks: 'task/fetchTasks'
    }),

    ...mapMutations({
      setSelectedSort: 'task/setSelectedSort',
      setSearchQuery: 'task/setSearchQuery',
      addTask: 'task/addTask',
    }),
  }
}
</script>

<style>
.page {
  min-height: 100vh;
  padding: 74px 0;
}
</style>
