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
      <p class="task-list__title">{{ task.id}}</p>
      <p class="task-list__importance">{{task.importance}}</p>
    </div>
    <div class="task-list__btns">
      <my-checkbox
        :id="checkboxDescription.id"
        :checked=false
        :label="checkboxDescription.label"
      />
      <button class="btn" type="button" @click="$emit('deleteTask', task.id)">Удалить</button>
      <button class="btn" type="button" @click="gotToTaskEditPage(task.id)">Редактировать</button>
    </div>
  </li>
</template>

<script lang="ts">
import {computed, defineComponent, PropType} from 'vue';
import myCheckbox from '@/components/UI/basicCheckbox.vue';
import { useRouter } from 'vue-router'
import Task from '@/types/task';
import DateObjTypes from '@/types/dateObjTypes';
import {createNamespacedHelpers} from 'vuex-composition-helpers';
const { useMutations } = createNamespacedHelpers( 'task'); // specific module name
import { v4 as uuidv4 } from "uuid";

export default defineComponent({
  name: 'basicTask',

  components: {
    myCheckbox
  },

  props: {
    task: {
      type: Object as PropType<Task>,
      required: true
    }
  },

  setup(props) {
    const router = useRouter();
    const { setTaskIdToEdit } = useMutations(['setTaskIdToEdit']);

    const checkboxDescription = {
      label: 'готово',
      id: uuidv4(),
      name: 'checkbox'
    }

    const prettifyDate = (computed((): DateObjTypes => {
      const date = new Date(props.task.date as Date);

      return {
        year: date.toLocaleString('ru-RU', { year: 'numeric'}),
        month: date.toLocaleString('ru-RU', { month: 'short'}),
        weekday: date.toLocaleString('ru-RU', { weekday: 'short' }),
        day: date.toLocaleString('ru-RU', { day: 'numeric' }),
        time: date.toLocaleString('ru-RU', {hour: '2-digit', minute: '2-digit' }),
      };
    }))

    const isOverdue = (computed((): boolean => {
      return Date.now() > new Date(props.task.date).getTime()
    }))

    const gotToTaskEditPage = (id: string) => {
      setTaskIdToEdit(id)
      router.push(`/edit-task/${id}`)
    }

    return {
      checkboxDescription,
      prettifyDate,
      isOverdue,
      gotToTaskEditPage
    }
  }

  // computed: {
  //   prettifyDate() {
  //     // const options = {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'};
  //     const dateObj = {};
  //     const date = new Date(this.task.date);
  //     dateObj.year = date.toLocaleString('ru-RU', { year: 'numeric'});
  //     dateObj.month = date.toLocaleString('ru-RU', { month: 'short'});
  //     dateObj.weekday = date.toLocaleString('ru-RU', { weekday: 'short' });
  //     dateObj.day = date.toLocaleString('ru-RU', { day: 'numeric' });
  //     dateObj.time = date.toLocaleString('ru-RU', {hour: '2-digit', minute: '2-digit' });
  //     return dateObj;
  //   },
  //
  //   isOverdue() {
  //     const today = Date.now();
  //     return today > new Date(this.task.date)
  //   }
  // },
  //
  // methods: {
  //   setTaskIdToEdit(id) {
  //     this.$store.commit('task/setTaskIdToEdit', {id, setState: true});
  //     this.$router.push(`/edit-task/${id}`)
  //   }
  // }
})
</script>

<style scoped lang="scss">
@import '@/assets/scss/variables.scss';
@import '@/assets/scss/mixins.scss';

.task-list {
  &__element {
    padding: 15px;
    border-radius: 8px;
    border: 1px solid $color-san-marino;
    display: flex;
    flex-wrap: nowrap;
    background-color: $color-cadet-blue;
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

    .btn {
      margin: 0;
      width: 100%;

      &:not(:first-of-type) {
        margin-top: 15px;
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
  }

  &__importance {
    font-style: italic;
  }
}

</style>
