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
import {useStore} from 'vuex';
import {computed} from 'vue';
import { createNamespacedHelpers } from 'vuex-composition-helpers';
// import {taskModule} from '@/store/taskModule';
const { useGetters, useActions } = createNamespacedHelpers( 'task'); // specific module name

// import { useRoute, useRouter } from 'vue-router';

export default {
  name: "editTask",

  components: {
    taskForm
  },

  setup() {
    const btnTitle = "Изменить";
    const store = useStore();
    const { taskById } = useGetters(['taskById']);
    const { fetchTasks } = useActions(['fetchTasks']);

    fetchTasks();
    // access a mutation
    const editTask = (task) => {
      store.commit('task/editTask', task)
    };

    // access a state in computed function / access a getter in computed function
    const isLoading = computed(() => store.state.task.isLoading);
    // access a state in computed function / access a getter in computed function
    const isError = computed(() => store.state.task.isError);
    // access a mutation

    return {
      isLoading,
      isError,
      btnTitle,
      taskById,
      editTask,
    }
  }

  // created() {
  //   this.fetchTasks();
  // },
  //
  // data() {
  //   return {
  //     btnTitle: "Изменить",
  //   }
  // },
  //
  // computed: {
  //   ...mapState({
  //     isLoading: state => state.task.isLoading,
  //     isError: state => state.task.isError,
  //   }),
  //
  //   ...mapGetters({
  //     taskById: 'task/taskById'
  //   })
  // },
  //
  // methods: {
  //   ...mapActions({
  //     fetchTasks: 'task/fetchTasks'
  //   }),
  //
  //   ...mapMutations({
  //     editTask: 'task/editTask',
  //   }),
  // },
}
</script>

<style scoped>

</style>
