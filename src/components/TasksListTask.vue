<script setup lang="ts">
import { computed, defineProps, defineEmits, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Task } from '@/types/task';
import BasicSvgIcon from '@/components/UI/BasicSvgIcon.vue';
import DateObjTypes from '@/types/dateObjTypes';
import { createNamespacedHelpers } from 'vuex-composition-helpers';
const taskModule = createNamespacedHelpers('taskModule');
const authModule = createNamespacedHelpers('authModule');
import BasicButton from '@/components/UI/BasicButton.vue';
import TaskModal from '@/components/TaskModal.vue';
import ModalDescription from '@/types/modalDescription';

const props = defineProps<{
  task: Task,
  isError: boolean,
  completed?: boolean,
}>();

const router = useRouter();
const { setTaskIdToEdit, setRightsError } = taskModule.useMutations(['setTaskIdToEdit', 'setRightsError']);
const { getUser } = authModule.useGetters(['getUser']);

const prettifyDateToObj = (someDate): DateObjTypes => {
  const date = new Date(someDate);

  return {
    year: date.toLocaleString('ru-RU', { year: 'numeric'}),
    month: date.toLocaleString('ru-RU', { month: 'short'}),
    weekday: date.toLocaleString('ru-RU', { weekday: 'short' }),
    day: date.toLocaleString('ru-RU', { day: 'numeric' }),
    time: date.toLocaleString('ru-RU', {hour: '2-digit', minute: '2-digit' }),
  };
};

const prettifyDateToStr = (someDate: Date): string => new Date(someDate).toLocaleString();

const prettifyCreationDate = (computed((): DateObjTypes => prettifyDateToObj(props.task.date)));
const prettifyCompletionDate = (computed((): string => prettifyDateToStr(props.task.completedAt)));
const isOverdue = (computed((): boolean => Date.now() > new Date(props.task.date).getTime()));
const isHasRights = (computed((): boolean => getUser.value.data.uid === props.task.author));

const modalsProperties: ModalDescription = {
  delete: {
    title: 'Вы уверены что хотите удалить задачу?',
    id: 'deleteModal',
  },
  closeRightsError: {
    title: 'У Вас нет доступа для этой операции',
    id: 'closeRightsErrorModal',
  },
  closeError: {
    title: 'Произошла ошибка, попробуйте еще раз',
    id: 'closeErrorModal',
  },
};

const emit = defineEmits<{
  (event: 'deleteTask', id: string): void;
  (event: 'completeTask', Task): void;
  (event: 'deleteTask', id: string): void;
}>();

const root = ref<HTMLElement | null>(null);

const toggleModal = (id: string) => {
  const modal = root.value?.querySelector(`#${id}`) as HTMLElement;
  modal.classList.toggle('is-active');
}

const toggleModalAndResetRightsError = () => {
  toggleModal(modalsProperties.closeRightsError.id);
}

const deleteTask = (id) => {
  if (isHasRights.value) {
    emit('deleteTask', id);
  } else {
    toggleModalAndResetRightsError();
  }
}

const completeTask = (task) => {
  if (isHasRights.value) {
    emit('completeTask', task);
  } else {
    toggleModalAndResetRightsError();
  }
}

const gotToTaskEditPage = (id: string) => {
  if (isHasRights.value) {
    setTaskIdToEdit(id);
    router.push(`/edit-task/${id}`)
  } else {
    toggleModalAndResetRightsError();
  }
};
</script>

<template>
  <li
    ref="root"
    class="task-list__element"
    :class="{ 'task-list__element--overdue': isOverdue, 'task-list__element--completed': completed }"
  >
    <div class="task-list__date">
      <div class="task-list__date-wrapper">
        <p class="task-list__day">
          {{ prettifyCreationDate.day }}
        </p>
        <p class="task-list__month">
          {{ prettifyCreationDate.month }}
        </p>
      </div>
      <div class="task-list__date-wrapper">
        <p class="task-list__weekday">
          {{ prettifyCreationDate.weekday }}
        </p>
        <p class="task-list__time">
          {{ prettifyCreationDate.time }}
        </p>
      </div>
      <p class="task-list__year">
        {{ prettifyCreationDate.year }}
      </p>
    </div>
    <div class="task-list__text-wrapper">
      <p class="task-list__title">
        {{ task.title }}
      </p>
      <p
        v-if="completed"
        class="task-list__title task-list__title--completed"
      >
        Завершено - {{ prettifyCompletionDate }}
      </p>
      <p class="task-list__importance">
        Важность: {{ task.importance }}
      </p>
    </div>
    <div
      v-if="task.access"
      class="task-list__access"
    >
      Групповое
    </div>
    <div
      v-if="completed"
      class="task-list__btns"
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
      v-else
      class="task-list__btns"
    >
      <BasicButton
        class="btn--red"
        type="button"
        title="Удалить"
        @click="toggleModal(modalsProperties.delete.id)"
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
      :id="modalsProperties.delete.id"
      :title="modalsProperties.delete.title"
    >
      <BasicButton
        class="btn--red"
        type="button"
        @click="deleteTask(task.id)"
      >
        Да!
      </BasicButton>
      <BasicButton
        class="btn--green"
        type="button"
        @click="toggleModal(modalsProperties.delete.id)"
      >
        Нет
      </BasicButton>
    </TaskModal>
    <TaskModal
      :id="modalsProperties.closeRightsError.id"
      :title="modalsProperties.closeRightsError.title"
    >
      <BasicButton
        class="btn--red"
        type="button"
        @click="toggleModalAndResetRightsError"
      >
        Понятно
      </BasicButton>
    </TaskModal>
    <TaskModal
      :id="modalsProperties.closeError.id"
      :title="modalsProperties.closeError.title"
    >
      <BasicButton
        class="btn--red"
        type="button"
        @click="toggleModal"
      >
        Понятно
      </BasicButton>
    </TaskModal>
  </li>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables.scss';
@import '@/assets/scss/mixins.scss';

.task-list {
  &__element {
    border-radius: 8px;
    border: 2px solid $color-heather;
    display: flex;
    flex-wrap: nowrap;
    background-color: $color-default-white;
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
    justify-content: center;
    gap: 10px;
    padding: 15px 15px 15px 7px;

    .btn {
      @include reset-item;
      background-color: transparent;

      svg {
        pointer-events: none;
      }

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
    min-width: 120px;
    border-right: 1px solid $color-san-marino;
    padding: 15px;
  }

  &__date-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
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
    padding: 15px 7px 15px 15px;
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

  &__access {
    display: inline;
    writing-mode: vertical-rl;
    text-orientation: upright;
    text-align: center;
    background-color: $color-emerald;
    position: relative;
    top: 0;
    color: $color-default-white;
    font-weight: bold;
    padding: 15px 0;
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
