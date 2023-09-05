<script setup lang="ts">
import BasicTextarea from '@/components/UI/BasicTextarea.vue';
import BasicRadio from '@/components/UI/BasicRadio.vue';
import BasicCheckbox from '@/components/UI/BasicCheckbox.vue';
import BasicDatepicker from '@/components/UI/BasicDatepicker.vue';
import BasicButton from '@/components/UI/BasicButton.vue';
import { defineEmits, defineProps, reactive } from 'vue';
import EditTask from '@/types/editTask';
import { Task, taskDefaults } from '@/types/task';
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
  access: props.initialData && props.initialData.access ? props.initialData.access : null,
  btnTitle: props.initialData && props.initialData.btnTitle ? props.initialData.btnTitle : 'Создать',
  ...taskDefaults
});

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    title: yup.string().min(3, 'Слишком короткое название').max(255, 'Слишком длинное название').required('Обязательное поле'),
    importance: yup.number().nonNullable().required('Обязательное поле'),
    date: yup.date().min(new Date(Date.now() + 3600),"Задачу надо не позднее чем за час!").required('Обязательное поле'),
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
  checkbox: {
    groupLabel: 'Персональная (по умолчанию) или групповая задача',
    group: {
        label: 'Групповая',
        id: uuidv4(),
        name: 'access',
        value: 'all',
        checked: false
      }
  },
  radio: {
    groupLabel: 'Важность',
    group: [
      {
        label: 'Высокая',
        id: uuidv4(),
        name: 'importance',
        value: 3,
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

const { groupLabel, datepicker, input, radio, checkbox } = formDescription;

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
      importance: values.importance,
      access: values.access,
      ...taskDefaults
    }

    emit('addTask', newTask);
  } else {
    let editingTask: Task = {
      id: formData.id,
      date: values.date,
      title: values.title,
      importance: values.importance,
      access: values.access,
      ...taskDefaults
    }

    emit('editTask', editingTask);
  }
};
</script>

<template>
  <form
    class="form"
    @submit="onSubmit"
  >
    <h3 class="title title--h3">Создание задачи</h3>
    <fieldset>
      <legend>{{groupLabel}}</legend>
      <BasicDatepicker
        :id="datepicker.id"
        :label="datepicker.label"
        :name="datepicker.name"
      />
      <BasicTextarea
        :name="input.name"
        :id="input.id"
        :label="input.label"/>
    </fieldset>
    <fieldset>
      <legend>{{ checkbox.groupLabel }}</legend>
      <BasicCheckbox
        :id="checkbox.group.id"
        :checkboxvalue="checkbox.group.value"
        :checked="checkbox.group.checked"
        :label="checkbox.group.label"
        :name="checkbox.group.name"
        :key="checkbox.group.id"
      />
      <ErrorMessage
        class="error"
        :name="radio.group[0].name"
      />
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
      <ErrorMessage
        class="error"
        :name="radio.group[0].name"
      />
    </fieldset>
    <BasicButton type="submit">
      {{ formData.btnTitle }}
    </BasicButton>
  </form>
</template>

<style lang="scss">
@import '@/assets/scss/mixins.scss';
@import '@/assets/scss/variables.scss';

.form {
  box-shadow: 1px 5px 8px 0 rgba($color-matterhorn, 0.4);
  border-radius: 8px;
  padding: 20px 10px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;

  fieldset {
    border-radius: 8px;
  }

  legend {
    padding: 5px;
    background-color: $color-snow;
  }

  [type="submit"] {
    align-self: flex-start;
  }
}
</style>
