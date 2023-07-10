<template>
  <form @submit.prevent>
    <my-datepicker
        id="taskDate"
        label="Дата:"
        v-model="date"
    />
    <my-input
        id="taskName"
        label="Описание:"
        v-model="title"
        placeholder="Введите описание"/>
    <my-button type="submit" @click="addTask">Создать</my-button>
  </form>
</template>

<script>
import myInput from '@/components/UI/myInput';
import myDatepicker from '@/components/UI/myDatepicker';
import myButton from '@/components/UI/myButton';

export default {
  name: 'task-form',

  components: {
    myInput,
    myButton,
    myDatepicker
  },

  props: {
    initialData: {
      type: Object,
      required: false,
      default: () => ({
        id: '',
        date: '',
        title: '',
      })
    },
  },

  data () {
    return {
      id: this.initialData.length ? this.initialData[0].id : '',
      date: this.initialData.length ? this.initialData[0].date : '',
      title: this.initialData.length ? this.initialData[0].title : '',
    }
  },

  methods: {
    addTask() {
      if (!this.initialData.length) {
        if (this.date && this.title.length > 0) {
          let task = {
            id: Date.now(),
            date: this.date,
            title: this.title
          }

          this.$emit('addTask', task);

          this.id = '';
          this.date = '';
          this.title = '';
        }
      } else {
        if (this.date && this.title.length > 0) {
          let task = {
            id: this.id,
            date: this.date,
            title: this.title
          }
          this.$emit('editTask', task);
        }
      }
    },
  }
}
</script>

<style scoped>

</style>
