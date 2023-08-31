<script setup lang="ts">
import DynamicForm from "@/components/DynamicForm.vue";
import * as yup from 'yup';
import NewUser from '@/types/newUser';
import { createNamespacedHelpers } from 'vuex-composition-helpers';
const { useActions } = createNamespacedHelpers( 'task'); // specific module name

const formSchema = {
  fields: [
    {
      label: 'Введите Email',
      name: 'email',
      id: 'email',
      as: 'input',
      type: 'email',
    },
    {
      label: 'Введите пароль',
      name: 'password',
      id: 'password',
      as: 'input',
      type: 'password',
    },
  ],
  btnTitle: 'Войти'
};

const validationSchema = yup.object().shape({
  email: yup.string().email('Неподходящий email').required('Обязательное поле'),
  password: yup.string().min(6, 'Введите от 6 до 50 символов').max(50, 'Введите от 6 до 50 символов').required('Обязательное поле'),
});

const { logIn } = useActions(['logIn']);
</script>

<template>
  <div class="container container--animation">
    <h1 class="title">Регистрация</h1>
    <DynamicForm
      @submitHandler="logIn"
      :validation-schema="validationSchema"
      :schema="formSchema.fields"
      :btn-title="formSchema.btnTitle"/>
  </div>
</template>

<style lang="scss">
</style>
