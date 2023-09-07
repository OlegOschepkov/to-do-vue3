<script setup lang="ts">
import TasksListTask from '@/components/TasksListTask.vue';
import LoadingIndicator from '@/components/UI/LoadingIndicator.vue';
import { defineProps } from 'vue';
import { Task } from '@/types/task';
import { createNamespacedHelpers } from 'vuex-composition-helpers';
const { useActions } = createNamespacedHelpers('taskModule');

const props = defineProps<{
  tasks: Task[],
  isLoading: boolean,
  isError: boolean,
  completed?: boolean
}>();

const { deleteTask, completeTask, returnTask } = useActions(['deleteTask', 'completeTask', 'returnTask']);
</script>

<template>
  <div class="tasks-list">
    <h2
      v-if="!completed"
      class="title title--h2"
    >
      Текущие задачи
    </h2>
    <h2
      v-else
      class="title title--h2"
    >
      Завершенные задачи
    </h2>
    <h2
      v-if="tasks.length === 0 && isLoading === false"
      class="title title--h2"
    >
      Создайте задачу или измените условия фильтрации
    </h2>

    <ul class="tasks-list__list">
      <transition-group
        name="task-list"
      >
        <TasksListTask
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          :completed="completed"
          :is-error="isError"
          @deleteTask="deleteTask"
          @completeTask="completeTask"
        />
        <LoadingIndicator
          v-if="isLoading"
        />
      </transition-group>
    </ul>
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/mixins.scss';
@import '@/assets/scss/variables.scss';

.tasks-list {
  padding: 20px 10px 20px;
  margin: 0 0 40px;
  box-shadow: 1px 5px 8px 0 rgba($color-matterhorn, 0.4);
  border-radius: 8px;

  .title--h2 {
    margin-top: 0;
    margin-bottom: 25px;
  }
}

.tasks-list__list {
  @include reset-list;
  display: flex;
  flex-direction: column;
  gap: 20px;
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

// animation
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
