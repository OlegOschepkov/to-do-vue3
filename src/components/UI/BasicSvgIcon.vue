<script setup lang="ts">
import { defineProps, defineAsyncComponent } from 'vue';
import { computed } from 'vue';

const props = defineProps<{
  name: string
}>();

const dynamicComponent = computed((): [ReturnType<typeof defineAsyncComponent>] => defineAsyncComponent(() => import(`@/assets/svg/${props.name}.vue`)));
</script>

<template>
  <component
    :is="dynamicComponent"
    class="svg-icon"
  />
</template>
