<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { Task } from '@/types/task';
import BasicSvgIcon from '@/components/UI/BasicSvgIcon.vue';
import DateObjTypes from '@/types/dateObjTypes';
import { createNamespacedHelpers } from 'vuex-composition-helpers';
const { useMutations } = createNamespacedHelpers( 'task'); // specific module name
import BasicButton from '@/components/UI/BasicButton.vue';

const props = defineProps<{
  task: Task
}>();

const router = useRouter();
const { setTaskIdToEdit } = useMutations(['setTaskIdToEdit']);

const prettifyDate = (computed((): DateObjTypes => {
  const date = new Date(props.task.date as Date);

  return {
    year: date.toLocaleString('ru-RU', { year: 'numeric'}),
    month: date.toLocaleString('ru-RU', { month: 'short'}),
    weekday: date.toLocaleString('ru-RU', { weekday: 'short' }),
    day: date.toLocaleString('ru-RU', { day: 'numeric' }),
    time: date.toLocaleString('ru-RU', {hour: '2-digit', minute: '2-digit' }),
  };
}));

const isOverdue = (computed((): boolean => {
  return Date.now() > new Date(props.task.date).getTime()
}));

const gotToTaskEditPage = (id: string) => {
  setTaskIdToEdit(id)
  router.push(`/edit-task/${id}`)
};
</script>

<template>
  <li class="task-list__element" :class="{ 'task-list__element--overdue': isOverdue }">
    <div class="task-list__date">
      <div class="task-list__date-wrapper">
        <p class="task-list__day">{{prettifyDate.day}}</p>
        <p class="task-list__month">{{prettifyDate.month}}</p>
      </div>
      <div class="task-list__date-wrapper">
        <p class="task-list__weekday">{{prettifyDate.weekday}}</p>
        <p class="task-list__time">{{prettifyDate.time}}</p>
      </div>
      <p class="task-list__year">{{prettifyDate.year}}</p>
    </div>
    <div class="task-list__text-wrapper">
      <p class="task-list__title">{{task.title}}</p>
      <p class="task-list__title">{{ task.completed ? 'true' : 'false'}}</p>
      <p class="task-list__importance">Важность: {{task.importance}}</p>
    </div>
    <div class="task-list__btns">
      <BasicButton @click="$emit('deleteTask', task.id)" title="Удалить" class="btn--delete">
        <BasicSvgIcon name="delete-icon" width="48" height="48"/>
      </BasicButton>
      <BasicButton type="button" @click="gotToTaskEditPage(task.id)" title="Редактировать" class="btn--edit">
        <BasicSvgIcon name="edit-icon" width="48" height="48"/>
      </BasicButton>
      <BasicButton type="button" @click="$emit('completeTask', task.id)" title="Завершить" class="btn--complete">
        <BasicSvgIcon name="check-icon" width="48" height="48"/>
      </BasicButton>
    </div>
  </li>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables.scss';
@import '@/assets/scss/mixins.scss';

.task-list {
  &__element {
    padding: 15px;
    border-radius: 8px;
    border: 2px solid $color-heather;
    display: flex;
    flex-wrap: nowrap;
    background-color: $color-default-white;
    gap: 20px;

    &.task-list__element--overdue {
      order: -1;
      border-color: $color-cardinal;
      box-shadow: 0 0 6px 2px rgba($color-cardinal, 0.4);
    }
  }

  &__btns {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .btn {
      @include reset-item;
      background-color: transparent;

      &--edit svg {
        fill: $color-amber;
      }

      &--delete svg {
        fill: $color-punch;
      }

      &--complete svg {
        fill: $color-emerald;
      }
    }
  }

  &__date {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-right: 10px;
    min-width: 120px;
    border-right: 1px solid $color-san-marino;
  }

  &__date-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }

  &__year,
  &__month,
  &__weekday,
  &__time,
  &__day {
    @include reset-item;
    color: $color-matterhorn;
    text-align: center;

    .task-list__element--overdue & {
      color: $color-cardinal;
    }
  }

  &__day {
    font-weight: 600;
    font-size: 36px;
    line-height: 150%;
  }

  &__year {
    font-weight: 600;
    font-size: 24px;
    line-height: 150%;
  }

  &__text-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__title {
    @include reset-item;
  }

  &__importance {
    @include reset-item;
    font-style: italic;
  }
}

</style>
