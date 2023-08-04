<template>
  <div class="page">
    <h2 class="title title--h2 error" v-if="isError">
      Произошла ошибка, попробуйте еще раз
    </h2>
    <h2 class="title title--h2" v-if="isLoading">
      Идет загрузка...
    </h2>
    <task-form v-else :initialData="{id: getTaskById.id, date: getTaskById.date, title: getTaskById.title, importance: getTaskById.importance, btnTitle}" @editTask="editTask"/>
  </div>
</template>

<script lang="ts">
import taskForm from '@/components/taskForm.vue';
import {useStore} from 'vuex';
import {computed, defineComponent, ref} from 'vue';
import {createNamespacedHelpers} from 'vuex-composition-helpers';
import Task from '@/types/task';
const { useGetters, useActions, useMutations } = createNamespacedHelpers( 'task'); // specific module name
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'editTask',

  components: {
    taskForm
  },

  setup() {
    const state = ref<Task>(null);
    const route = useRoute();
    const btnTitle = 'Изменить';
    const store = useStore();
    const { getTaskById, getRouteState } = useGetters(['getTaskById', 'getRouteState']);
    const { fetchTasks, editTask } = useActions(['fetchTasks', 'editTask']);
    const { setTaskIdToEdit } = useMutations(['setTaskIdToEdit']);

    const getTasks = async () => {
      state.value = await fetchTasks()
    }

    // access a mutation
    // const editTask1 = (task: Task) => {
    //   console.log(task)
    //   editTask(task)
    //   // TODO тут надо сообщение вывести что ок.
    // };

    setTaskIdToEdit(route.params.taskId);

    // access a state in computed function / access a getter in computed function
    const isLoading = computed((): boolean => store.state.task.isLoading);
    // access a state in computed function / access a getter in computed function
    const isError = computed((): boolean => store.state.task.isError);

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

})
</script>

<style scoped>

</style>
