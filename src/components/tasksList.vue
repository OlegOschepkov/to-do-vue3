<script setup lang="ts">
import basicTask from '@/components/basicTask.vue';
import { defineProps } from 'vue';
import Task from '@/types/task';
import { createNamespacedHelpers } from 'vuex-composition-helpers';
const { useActions } = createNamespacedHelpers( 'task'); // specific module name

const props = defineProps<{
  tasks: Task[]
}>()

const { deleteTask } = useActions(['deleteTask']);
</script>

<template>
  <h1 class="title">Список задач</h1>
  <ul class="tasks-list">
    <transition-group name="task-list">
      <basicTask
        v-for="task in tasks"
        :task="task"
        :key="task.id"
        @deleteTask="deleteTask"
      />
    </transition-group>
  </ul>
</template>

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
