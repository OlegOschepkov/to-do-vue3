<template>
  <div class="page">
    <h2 class="title title--h2 error" v-if="isError">
      Произошла ошибка, попробуйте еще раз
    </h2>
    <h2 class="title title--h2" v-if="isLoading">
      Идет загрузка...
    </h2>
    <task-form v-else :initialData="{id: getTaskById.id, date: getTaskById.date, title: getTaskById.title, btnTitle}" @editTask="editTask"/>
  </div>
</template>

<script>
import taskForm from '@/components/taskForm';
import {useStore} from 'vuex';
import {computed, ref} from 'vue';
import {createNamespacedHelpers} from 'vuex-composition-helpers';
const { useGetters, useActions } = createNamespacedHelpers( 'task'); // specific module name

export default {
  name: "editTask",

  components: {
    taskForm
  },

  setup() {
    const state = ref({ tasks: {} });
    const btnTitle = "Изменить";
    const store = useStore();
    const { getTaskById, getRouteState } = useGetters(['getTaskById', 'getRouteState']);
    const { fetchTasks } = useActions(['fetchTasks']);

    const getTasks = async () => {
      state.value.tasks = await fetchTasks()
    }

    // access a mutation
    const editTask = (task) => {
      store.commit('task/editTask', task);
      // тут надо сообщение вывести что ок.
    };

    // access a state in computed function / access a getter in computed function
    const isLoading = computed(() => store.state.task.isLoading);
    // access a state in computed function / access a getter in computed function
    const isError = computed(() => store.state.task.isError);

    if (!getRouteState.value) {
      getTasks();
    }

    return {
      isLoading,
      isError,
      btnTitle,
      getTaskById,
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
  //     getTaskById: 'task/getTaskById'
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
