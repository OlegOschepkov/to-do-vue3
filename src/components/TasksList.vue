<script setup lang="ts">
import BasicTask from '@/components/BasicTask.vue';
import LoadingIndicator from '@/components/UI/LoadingIndicator.vue';
import { defineProps } from 'vue';
import Task from '@/types/task';
import { createNamespacedHelpers } from 'vuex-composition-helpers';
const { useActions } = createNamespacedHelpers( 'task'); // specific module name

const props = defineProps<{
  tasks: Task[],
  isLoading: boolean
}>();

const { deleteTask } = useActions(['deleteTask']);
</script>

<template>
  <h1 class="title">Список задач</h1>
  <ul class="tasks-list">
    <transition-group name="task-list">
      <BasicTask
        v-for="task in tasks"
        :task="task"
        :key="task.id"
        @deleteTask="deleteTask"
      />
      <LoadingIndicator v-if="isLoading"/>
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
  position: relative;

  .lds-ellipsis {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    &__background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba($color-default-white, 0.5);
      filter: blur(5px);
    }
  }
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
