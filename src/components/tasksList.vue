<template>
  <h1 class="title">Список задач</h1>
  <ul class="tasks-list">
    <transition-group name="task-list">
      <my-task
          v-for="task in tasks"
          :task="task"
          :key="task.id"
          @deleteTask="deleteTask"
      />
    </transition-group>
  </ul>
</template>

<script lang="ts">
import myTask from '@/components/myTask.vue';
import {PropType} from 'vue';
import task from '@/types/task';
import {createNamespacedHelpers} from 'vuex-composition-helpers';
const { useActions } = createNamespacedHelpers( 'task'); // specific module name

export default {
  name: "tasks-list",

  components: {
    myTask
  },

  props: {
    tasks: {
      type: Array as PropType<task[]>,
      required: true
    }
  },

  setup() {
    const { deleteTask } = useActions(['deleteTask']);

    return {
      deleteTask
    }
  }

  // methods: {
  //   ...mapMutations({
  //     deleteTask: 'task/deleteTask'
  //   }),
  // }
}
</script>

<style lang="scss">
@import '@/assets/scss/mixins.scss';
@import '@/assets/scss/variables.scss';


.tasks-list {
  @include reset-list;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 10px 20px;
  margin: 0 0 40px;
  border: 1px solid $color-san-marino;
  border-radius: 8px;
}
.task-list {
  display: inline-block;
  margin-right: 10px;
}
.task-list-enter-active,
.task-list-leave-active {
  transition: all 0.3s ease;
}
.task-list-enter-from,
.task-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.task-list-move {
  transition: transform 0.3s ease;
}
</style>
