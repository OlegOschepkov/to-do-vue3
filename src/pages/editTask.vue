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

<script lang="ts">
import taskForm from '@/components/taskForm.vue';
import {useStore} from 'vuex';
import {computed, defineComponent, ref} from 'vue';
import {createNamespacedHelpers} from 'vuex-composition-helpers';
import task from '@/types/task';
const { useGetters, useActions } = createNamespacedHelpers( 'task'); // specific module name

export default defineComponent({
  name: "editTask",

  components: {
    taskForm
  },

  setup() {
    const state = ref<task>(null);
    const btnTitle = "Изменить";
    const store = useStore();
    const { getTaskById, getRouteState } = useGetters(['getTaskById', 'getRouteState']);
    const { fetchTasks } = useActions(['fetchTasks']);

    const getTasks = async () => {
      state.value = await fetchTasks()
    }

    // access a mutation
    const editTask = (task: task) => {
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

})
</script>

<style scoped>

</style>
