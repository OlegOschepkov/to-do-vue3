<script setup lang="ts">
import DynamicForm from "@/components/DynamicForm.vue";
import * as yup from 'yup';
import { createNamespacedHelpers } from 'vuex-composition-helpers';
import FormSchema from '@/types/formSchema';
const { useGetters, useActions } = createNamespacedHelpers('authModule');

const { getUser } = useGetters(['getUser']);

const formSchema: FormSchema = {
  fields: [
    {
      label: 'Введите имя',
      name: 'name',
      id: 'name',
      as: 'input',
      type: 'text',
    },
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
    {
      label: 'Повторите пароль',
      name: 'passwordConfirm',
      id: 'passwordConfirm',
      as: 'input',
      type: 'password',
    },
  ],
  btnTitle: 'Зарегистрироваться'
};

const validationSchema = yup.object().shape({
  name: yup.string().min(2, 'Введите от 2 до 255 символов').max(255, 'Введите от 2 до 255 символов').required('Обязательное поле'),
  email: yup.string().email('Неподходящий email').required('Обязательное поле'),
  password: yup.string().min(6, 'Введите от 6 до 50 символов').max(50, 'Введите от 6 до 50 символов').required('Обязательное поле'),
  passwordConfirm: yup.string().min(6, 'Введите от 6 до 50 символов').max(50, 'Введите от 6 до 50 символов').oneOf([yup.ref('password')], 'Пароли должны совпадать').required('Обязательное поле'),
});

const { registerNewUser } = useActions(['registerNewUser']);
</script>

<template>
  <div class="container container--animation">
    <h1 class="title">
      Регистрация
    </h1>
    <div
      v-if="getUser.data?.uid"
    >
      Вы уже зарегистрированы, чтобы создать нового пользователя выйдите из текущего профиля
    </div>
    <DynamicForm
      v-else
      :validation-schema="validationSchema"
      :schema="formSchema.fields"
      :btn-title="formSchema.btnTitle"
      @submitHandler="registerNewUser"
    />
  </div>
</template>

<style lang="scss">
</style>
