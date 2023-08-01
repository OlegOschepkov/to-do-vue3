<template>
  <form @submit.prevent>
    <my-datepicker
        id="taskDate"
        label="Дата:"
        v-model="formData.date"
    />
    <my-input
        id="taskName"
        label="Описание:"
        v-model="formData.title"
        placeholder="Введите описание"/>
    <my-button type="submit" @click="addTask">{{ btnTitle }}</my-button>
  </form>
</template>

<script lang="ts">
import myInput from '@/components/UI/myInput.vue';
import myDatepicker from '@/components/UI/myDatepicker.vue';
import myButton from '@/components/UI/myButton.vue';
import {defineComponent, PropType, reactive} from 'vue';
import EditTask from '@/types/editTask';
import Task from '@/types/task';

export default defineComponent({
  name: 'task-form',

  components: {
    myInput,
    myButton,
    myDatepicker
  },

  props: {
    initialData: {
      type: Object as PropType<EditTask>
    },
  },

  setup(props, {emit}) {
    const formData = reactive<EditTask>({
      id: props.initialData && props.initialData.id ? props.initialData.id : null,
      date: props.initialData && props.initialData.date ? props.initialData.date : new Date(Date.now()),
      title: props.initialData && props.initialData.title ? props.initialData.title : '',
    });

    const btnTitle = props.initialData && props.initialData.btnTitle ? props.initialData.btnTitle : 'Создать';

    const addTask = () => {
      if (!props.initialData) {
        if (formData.date && formData.title.length > 0) {
          let newTask: Task = {
            id: Date.now(),
            date: formData.date,
            title: formData.title
          }

          emit('addTask', newTask);

          formData.id = null;
          formData.date = new Date(Date.now());
          formData.title = '';
        }
      } else {
        let editingTask: Task = {
          id: formData.id,
          date: formData.date,
          title: formData.title
        }

        emit('editTask', editingTask);
      }
    }

    return {
      btnTitle,
      formData,
      addTask
      // ...toRefs(task) получить доступ к отдельным свойствам
    }

    // data () {
    //   return {
    //     id: this.initialData.id ? this.initialData.id : '',
    //     date: this.initialData.date ? this.initialData.date : '',
    //     title: this.initialData.title ? this.initialData.title : '',
    //     btnTitle: this.initialData.btnTitle ? this.initialData.btnTitle : 'Создать',
    //   }
    // },
    //
    // methods: {
    //   addTask() {
    //     if (!this.initialData.id) {
    //       if (this.date && this.title.length > 0) {
    //         let task = {
    //           id: Date.now(),
    //           date: this.date,
    //           title: this.title
    //         }
    //
    //         this.$emit('addTask', task);
    //
    //         this.id = '';
    //         this.date = '';
    //         this.title = '';
    //       }
    //     } else {
    //       let task = {
    //         id: this.id,
    //         date: this.date,
    //         title: this.title
    //       }
    //       this.$emit('editTask', task);
    //
    //       this.id = '';
    //       this.date = '';
    //       this.title = '';
    //     }
    //   },
  }
})

</script>

<style scoped>

</style>
