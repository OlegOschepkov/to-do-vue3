<template>
  <task-form :initialData="taskById" @editTask="editTask"/>
</template>

<script>
import taskForm from '@/components/taskForm';
import {mapActions, mapGetters, mapMutations} from 'vuex';

export default {
  name: "editTask",

  components: {
    taskForm
  },

  created() {
    this.fetchTasks();
  },

  computed: {
    ...mapGetters({
      taskById: 'task/taskById'
    })
  },

  methods: {
    ...mapActions({
      fetchTasks: 'task/fetchTasks'
    }),

    ...mapMutations({
      editTask: 'task/editTask',
    }),
  },
}
</script>

<style scoped>

</style>
