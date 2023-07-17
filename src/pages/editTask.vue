<template>
  <div class="page">
    <h2 class="title title--h2 error" v-if="isError">
      Произошла ошибка, попробуйте еще раз
    </h2>
    <h2 class="title title--h2" v-if="isLoading">
      Идет загрузка...
    </h2>
    <task-form v-else :initialData="{id: taskById.id, date: taskById.date, title: taskById.title, btnTitle}" @editTask="editTask"/>
  </div>
</template>

<script>
import taskForm from '@/components/taskForm';
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex';

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
    ...mapState({
      isLoading: state => state.task.isLoading,
      isError: state => state.task.isError,
    }),

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
