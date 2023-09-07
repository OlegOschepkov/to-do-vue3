<script setup lang="ts">
import DynamicForm from "@/components/DynamicForm.vue";
import * as yup from 'yup';
import { createNamespacedHelpers } from 'vuex-composition-helpers';
import { useRouter } from 'vue-router';
const { useActions, useGetters } = createNamespacedHelpers('authModule');

const router = useRouter();

const { getUser } = useGetters(['getUser']);

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
    <h1 class="title">
      Регистрация
    </h1>
    <div
      v-if="getUser.data?.uid"
    >
      Вы уже зарегистрированы, чтобы создать нового пользователя выйдите из профиля
    </div>
    <DynamicForm
      v-else
      :validation-schema="validationSchema"
      :schema="formSchema.fields"
      :btn-title="formSchema.btnTitle"
      @submitHandler="logIn"
    />
  </div>
</template>

<style lang="scss">
</style>
