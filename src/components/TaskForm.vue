<script setup lang="ts">
import BasicTextInput from '@/components/UI/BasicTextInput.vue';
import BasicRadio from '@/components/UI/BasicRadio.vue';
import BasicDatepicker from '@/components/UI/BasicDatepicker.vue';
import BasicButton from '@/components/UI/BasicButton.vue';
import { defineEmits, defineProps, reactive } from 'vue';
import EditTask from '@/types/editTask';
import Task from '@/types/task';
import { v4 as uuidv4 } from "uuid";
import { useForm, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

const props = defineProps<{
  initialData?: EditTask
}>();

const emit = defineEmits<{
  (event: 'addTask', newTask: Task): void;
  (event: 'editTask', editingTask: Task): void;
}>();

const formData = reactive<EditTask>({
  id: props.initialData && props.initialData.id ? props.initialData.id : null,
  date: props.initialData && props.initialData.date ? props.initialData.date : new Date(Date.now()),
  title: props.initialData && props.initialData.title ? props.initialData.title : null,
  importance: props.initialData && props.initialData.importance ? props.initialData.importance : null,
  btnTitle: props.initialData && props.initialData.btnTitle ? props.initialData.btnTitle : 'Создать'
});

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    title: yup.string().min(3, 'Слишком короткое название').max(255, 'Слишком длинное название').required('Обязательное поле'),
    importance: yup.number().nonNullable().required('Обязательное поле'),
    date: yup.date().min(new Date(Date.now() + 3600),"Задачу надо создавать заранее!").required('Обязательное поле'),
  }),
  initialValues: formData,
});

const formDescription = {
  groupLabel: 'Введите время и описание',
  datepicker: {
    label: 'Дата:',
    id: uuidv4(),
    name: 'date',
  },
  input: {
    label: 'Описание:',
    id: uuidv4(),
    name: 'title',
  },
  radio: {
    groupLabel: 'Важность',
    group: [
      {
        label: 'Высокая',
        id: uuidv4(),
        name: 'importance',
        value: 3
      },
      {
        label: 'Средняя',
        id: uuidv4(),
        name: 'importance',
        value: 2
      },
      {
        label: 'Низкая',
        id: uuidv4(),
        name: 'importance',
        value: 1
      },
    ]
  }
};

const { groupLabel, datepicker, input, radio } = formDescription;

const onSubmit = handleSubmit((values, { resetForm }) => {
  addTask(values);
  resetForm();
});

const addTask = (values) => {
  if (!props.initialData) {
    let newTask: Task = {
      id: 'temporal-will-be-rewritten-by-firebase',
      date: values.date,
      title: values.title,
      importance: values.importance
    }

    emit('addTask', newTask);
  } else {
    let editingTask: Task = {
      id: formData.id,
      date: values.date,
      title: values.title,
      importance: values.importance
    }

    emit('editTask', editingTask);
  }
};
</script>

<template>
  <form
    @submit="onSubmit"
  >
    <fieldset>
      <legend>{{groupLabel}}</legend>
      <BasicDatepicker
        :id="datepicker.id"
        :label="datepicker.label"
        :name="datepicker.name"
      />
      <BasicTextInput
        :name="input.name"
        :id="input.id"
        :label="input.label"/>
    </fieldset>
    <fieldset>
      <legend>{{ radio.groupLabel }}</legend>
      <BasicRadio
        v-for="el in radio.group"
        :id="el.id"
        :radiovalue="el.value"
        :label="el.label"
        :name="el.name"
        :key="el.id"
      />
      <ErrorMessage class="error" :name="radio.group[0].name" />
    </fieldset>
    <BasicButton type="submit">{{ formData.btnTitle }}</BasicButton>
  </form>
</template>

<style scoped>

</style>
