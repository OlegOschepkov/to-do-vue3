<template>
  <div class="page">
    <task-form :initialData="{id: taskById.id, date: taskById.date, title: taskById.title, btnTitle}" @editTask="editTask"/>
  </div>
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

  data() {
    return {
      btnTitle: "Изменить",
    }
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
