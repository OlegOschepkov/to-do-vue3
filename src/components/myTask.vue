<template>
  <li class="task-list__element" :class="{ isOverdue }">
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
    <p class="task-list__title">{{task.title}}</p>
    <div class="task-list__btns">
      <button class="btn" type="button" @click="$emit('deleteTask', task.id)">Удалить</button>
      <button class="btn" type="button" @click="setTaskIdToEdit(task.id)">Редактировать</button>
    </div>
  </li>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router'
import store from '@/store';

export default {
  name: 'my-task',

  props: {
    task: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const router = useRouter();

    const prettifyDate = (computed(() => {
      const dateObj = {};
      const date = new Date(props.task.date);
      dateObj.year = date.toLocaleString('ru-RU', { year: 'numeric'});
      dateObj.month = date.toLocaleString('ru-RU', { month: 'short'});
      dateObj.weekday = date.toLocaleString('ru-RU', { weekday: 'short' });
      dateObj.day = date.toLocaleString('ru-RU', { day: 'numeric' });
      dateObj.time = date.toLocaleString('ru-RU', {hour: '2-digit', minute: '2-digit' });
      return dateObj;
    }))

    const isOverdue = (computed(() => {
      const today = Date.now();
      return today > new Date(props.task.date)
    }))

    const setTaskIdToEdit = (id) => {
      store.commit('task/setTaskIdToEdit', {id, setState: true});
      router.push(`/edit-task/${id}`)
    }

    return {
      prettifyDate,
      isOverdue,
      setTaskIdToEdit
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
}
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

    &.isOverdue {
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

    .isOverdue & {
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

  &__title {
    width: 100%;
  }
}

</style>
