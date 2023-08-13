<script setup lang="ts">
import { defineProps, defineAsyncComponent } from 'vue';
import { computed } from 'vue';

const props = defineProps<{ // Так нет нужды описывать сами пропсы. Можно заменить интерфейсом. defineProps - Compiler Macro
  name: string
}>()

const dynamicComponent = computed((): [ReturnType<typeof defineAsyncComponent>] => defineAsyncComponent(() => import(`@/assets/svg/${props.name}.vue`)));
</script>

<template>
  <component :is="dynamicComponent" class="svg-icon"/>
</template>
