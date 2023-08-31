<script setup lang="ts">
import { useRouter } from "vue-router";
import { createNamespacedHelpers } from 'vuex-composition-helpers';
import BasicButton from '@/components/UI/BasicButton.vue';
const { useActions, useGetters } = createNamespacedHelpers( 'task'); // specific module name

const router = useRouter();

const { logOut } = useActions(['logOut']);
const { getUser } = useGetters(['getUser']);

</script>

<template>
  <div class="container container--animation">
    <div v-if="getUser.data.uid">
      <h1 class="title">Добро пожаловать, {{getUser.data.displayName}}</h1>
      <div class="card-body">
        <p class="success" role="alert">
          Вы успешно вошли!
        </p>
        <BasicButton  @click.prevent="logOut">Выйти</BasicButton>
      </div>

    </div>
    <p v-else class="error" role="alert">
      Пожалуйста войдите
    </p>
  </div>
</template>

<style scoped lang="scss">

</style>
