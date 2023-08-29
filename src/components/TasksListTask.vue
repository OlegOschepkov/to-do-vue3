<script setup lang="ts">
import { computed, defineProps, defineEmits, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Task } from '@/types/task';
import BasicSvgIcon from '@/components/UI/BasicSvgIcon.vue';
import DateObjTypes from '@/types/dateObjTypes';
import { createNamespacedHelpers } from 'vuex-composition-helpers';
const { useMutations } = createNamespacedHelpers( 'task'); // specific module name
import BasicButton from '@/components/UI/BasicButton.vue';
import TaskModal from '@/components/TaskModal.vue';

const props = defineProps<{
  task: Task,
  completed?: boolean,
}>();

const router = useRouter();
const { setTaskIdToEdit } = useMutations(['setTaskIdToEdit']);

const prettifyDateToObj = (somedate): DateObjTypes => {
  const date = new Date(somedate);

  return {
    year: date.toLocaleString('ru-RU', { year: 'numeric'}),
    month: date.toLocaleString('ru-RU', { month: 'short'}),
    weekday: date.toLocaleString('ru-RU', { weekday: 'short' }),
    day: date.toLocaleString('ru-RU', { day: 'numeric' }),
    time: date.toLocaleString('ru-RU', {hour: '2-digit', minute: '2-digit' }),
  };
};

const prettifyDateToStr = (somedate): string => new Date(somedate).toLocaleString();

const prettifyCreationDate = (computed((): DateObjTypes => prettifyDateToObj(props.task.date)));
const prettifyCompletionDate = (computed((): string => prettifyDateToStr(props.task.completedAt)));

const isOverdue = (computed((): boolean => Date.now() > new Date(props.task.date).getTime()));

const emit = defineEmits<{
  (event: 'deleteTask', id: string): void;
  (event: 'completeTask', Task): void;
  (event: 'deleteTask', id: string): void;
}>();

const root = ref<HTMLElement | null>(null);

const toggleModal = () => {
  const modal = root.value?.querySelector('.modal');
  modal.classList.toggle('is-active');
}

const deleteTask = (id) => {
  emit('deleteTask', id);
  toggleModal();
}

const completeTask = (task) => {
  emit('completeTask', task);
}

const gotToTaskEditPage = (id: string) => {
  setTaskIdToEdit(id)
  router.push(`/edit-task/${id}`)
};
</script>

<template>
  <li
    class="task-list__element"
    :class="{ 'task-list__element--overdue': isOverdue, 'task-list__element--completed': completed }"
    ref="root"
  >
    <div class="task-list__date">
      <div class="task-list__date-wrapper">
        <p class="task-list__day">{{prettifyCreationDate.day}}</p>
        <p class="task-list__month">{{prettifyCreationDate.month}}</p>
      </div>
      <div class="task-list__date-wrapper">
        <p class="task-list__weekday">{{prettifyCreationDate.weekday}}</p>
        <p class="task-list__time">{{prettifyCreationDate.time}}</p>
      </div>
      <p class="task-list__year">{{prettifyCreationDate.year}}</p>
    </div>
    <div class="task-list__text-wrapper">
      <p class="task-list__title">{{task.title}}</p>
      <p
        class="task-list__title task-list__title--completed"
        v-if="completed"
      >
        Завершено - {{prettifyCompletionDate}}
      </p>
      <p class="task-list__importance">Важность: {{task.importance}}</p>
    </div>
    <div
      class="task-list__btns"
      v-if="completed"
    >
      <BasicButton
        class="btn--green"
        type="button"
        title="Вернуть в работу"
        @click="completeTask(task)"
      >
        <BasicSvgIcon
          name="redo-icon"
          width="32"
          height="32"
        />
      </BasicButton>
    </div>
    <div
      class="task-list__btns"
      v-else>
      <BasicButton
        class="btn--red"
        type="button"
        title="Удалить"
        @click="toggleModal"
      >
        <BasicSvgIcon
          name="delete-icon"
          width="32"
          height="32"
        />
      </BasicButton>
      <BasicButton
        class="btn--yellow"
        type="button"
        title="Редактировать"
        @click="gotToTaskEditPage(task.id)"
      >
        <BasicSvgIcon
          name="edit-icon"
          width="32"
          height="32"
        />
      </BasicButton>
      <BasicButton
        class="btn--green"
        type="button"
        title="Завершить"
        @click="completeTask(task)"
      >
        <BasicSvgIcon
          name="check-icon"
          width="32"
          height="32"
        />
      </BasicButton>
    </div>
    <TaskModal
      @delete="deleteTask(task.id)"
      @close="toggleModal"
    />
<!--    <div class="modal">-->
<!--      <div class="modal__wrapper">-->
<!--        <h4 class="modal__title">-->
<!--          Вы уверены?-->
<!--        </h4>-->
<!--        <div class="modal__btns">-->
<!--          <BasicButton-->
<!--            class="btn&#45;&#45;red"-->
<!--            type="button"-->
<!--            @click="deleteTask(task.id)"-->
<!--          >-->
<!--            Да!-->
<!--          </BasicButton>-->
<!--          <BasicButton-->
<!--            class="btn&#45;&#45;green"-->
<!--            type="button"-->
<!--            @click="toggleModal"-->
<!--          >-->
<!--            Нет-->
<!--          </BasicButton>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
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
    position: relative;

    &--overdue {
      order: -1;
      border-color: $color-cardinal;
      box-shadow: 0 0 6px 2px rgba($color-cardinal, 0.4);
    }

    &--completed {
      background-color: rgba($color-anakiwa, 0.3);
    }
  }

  &__btns {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .btn {
      @include reset-item;
      background-color: transparent;

      &--yellow svg {
        fill: $color-amber;
      }

      &--red svg {
        fill: $color-punch;
      }

      &--green svg {
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

    &--completed {
      color: $color-emerald
    }
  }

  &__importance {
    @include reset-item;
    font-style: italic;
  }
}

.modal {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba($color-cadet-blue, 0.8);
  opacity: 0;
  visibility: hidden;
  transition: opacity $trans-default;
  left: 0;
  top: 0;
  border-radius: 8px;

  &__wrapper {
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 100%;
    gap: 15px;
  }

  &__title {
    @include reset-item;
    text-align: center;
  }

  &__btns {
    display: flex;
    justify-content: center;
    gap: 15px;

    .btn {
      margin: 0;
    }
  }

  &.is-active {
    visibility: visible;
    opacity: 1;
  }
}

</style>
