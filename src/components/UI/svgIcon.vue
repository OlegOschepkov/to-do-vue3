<template>
  <component :is="dynamicComponent" class="svg-icon"/>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';
import { computed } from 'vue';

export default defineComponent({
  name: "svg-icon",

  props: {
    name: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const dynamicComponent = computed((): [ReturnType<typeof defineAsyncComponent>] => defineAsyncComponent(() => import(`@/assets/svg/${props.name}.vue`)));

    return {
      dynamicComponent
    }
  }

  // computed: {
  //   dynamicComponent() {
  //     const name = this.name;
  //
  //     return defineAsyncComponent(() => import(`@/assets/svg/${name}.vue`));
  //   },
  // },
});
</script>
