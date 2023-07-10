<template>
  <component :is="dynamicComponent" class="svg-icon"/>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: "svg-icon",

  props: {
    name: {
      type: String,
      required: true,
    },
  },

  computed: {
    dynamicComponent() {
      const name = this.name;

      return defineAsyncComponent(() => import(`@/assets/svg/${name}.vue`));
    },
  },
};
</script>
