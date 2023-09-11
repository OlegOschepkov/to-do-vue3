<script setup lang="ts">
import {useAuthErrors} from '@/hooks/useAuthErrors';
import {createNamespacedHelpers} from 'vuex-composition-helpers';
const { useGetters } = createNamespacedHelpers('authModule');

const { getError } = useGetters(['getError']);
const errorMessage = useAuthErrors();
</script>

<template>
  <div
    v-if="getError.isError"
    class="error"
  >
    Произошла ошибка: {{ errorMessage }}
  </div>
</template>

<style scoped lang="scss">

</style>
