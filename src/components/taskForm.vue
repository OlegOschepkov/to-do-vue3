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
    <my-button type="submit" @click="addTask">{{ this.btnTitle }}</my-button>
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
        btnTitle: '',
      })
    },
  },

  data () {
    return {
      id: this.initialData.id ? this.initialData.id : '',
      date: this.initialData.date ? this.initialData.date : '',
      title: this.initialData.title ? this.initialData.title : '',
      btnTitle: this.initialData.btnTitle ? this.initialData.btnTitle : 'Создать',
    }
  },

  methods: {
    addTask() {
      if (!this.initialData.id) {
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
        let task = {
          id: this.id,
          date: this.date,
          title: this.title
        }
        this.$emit('editTask', task);

        this.id = '';
        this.date = '';
        this.title = '';
      }
    },
  }
}
</script>

<style scoped>

</style>
