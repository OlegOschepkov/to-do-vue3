<template>
  <form
    @submit.prevent
  >
    <fieldset>
      <legend>{{groupLabel}}</legend>
      <basicDatepicker
        :id="datepicker.id"
        :label="datepicker.label"
        v-model="formData.date"
      />
      <basicTextInput
        :name="input.name"
        :id="input.id"
        :label="input.label"
        v-model="formData.title"/>
    </fieldset>
    <fieldset>
      <legend>{{ radio.groupLabel }}</legend>
      <basicRadio
        v-for="el in radio.group"
        :id="el.id"
        :value="el.value"
        :label="el.label"
        :name="el.name"
        :key="el.id"
        v-model="formData.importance"/>
    </fieldset>
    <basicButton type="submit" @click="addTask">{{ btnTitle }}</basicButton>
  </form>
</template>

<script lang="ts">
import basicTextInput from '@/components/UI/basicTextInput.vue';
import basicRadio from '@/components/UI/basicRadio.vue';
import basicDatepicker from '@/components/UI/basicDatepicker.vue';
import basicButton from '@/components/UI/basicButton.vue';
import {defineComponent, PropType, reactive, toRefs} from 'vue';
import EditTask from '@/types/editTask';
import Task from '@/types/task';
import { v4 as uuidv4 } from "uuid";

export default defineComponent({
  name: 'task-form',

  components: {
    basicTextInput,
    basicRadio,
    basicButton,
    basicDatepicker
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
      importance: props.initialData && props.initialData.importance ? props.initialData.importance : '',
    });

    const formDescription = {
      groupLabel: 'ВВедите время и описание',
      datepicker: {
        label: 'Дата:',
        id: uuidv4(),
      },
      input: {
        label: 'Описание:',
        id: uuidv4(),
        name: 'taskName',
      },
      radio: {
        groupLabel: 'Важность',
        group: [
          {
            label: 'Высокая',
            id: uuidv4(),
            name: 'importance',
            value: '2'
          },
          {
            label: 'Средняя',
            id: uuidv4(),
            name: 'importance',
            value: '1'
          },
          {
            label: 'Низкая',
            id: uuidv4(),
            name: 'importance',
            value:  '0'
          },
        ]
      }
    }

    const btnTitle = props.initialData && props.initialData.btnTitle ? props.initialData.btnTitle : 'Создать';

    const addTask = () => {
      if (!props.initialData) {
        if (formData.date && formData.title.length > 0) {
          let newTask: Task = {
            id: 'temporal-will-be-rewritten-by-firebase',
            date: formData.date,
            title: formData.title,
            importance: formData.importance
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
          title: formData.title,
          importance: formData.importance
        }

        emit('editTask', editingTask);
      }
    }

    return {
      ...toRefs(formDescription),
      btnTitle,
      formData,
      addTask
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
