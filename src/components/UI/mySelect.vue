<template>
  <div class="select-element">
    <Multiselect
        :value="modelValue"
        @change="selectedOption"
        placeholder="Select one"
        :options="options">
    </Multiselect>
  </div>
</template>


<script>
import Multiselect from '@vueform/multiselect';

export default {
  name: 'my-select',

  components: {
    Multiselect
  },

  props: {
    modelValue: {
      type: [String, Number]
    },
    options: {
      type: Array,
      default: () => {},
      required: true
    }
  },

  methods: {
    selectedOption(value) {
      this.$emit('update:modelValue', value)
    }
  }
}
</script>

<style scoped lang="scss">
@import "@vueform/multiselect/themes/default.css";
@import '@/assets/scss/variables.scss';

.select-element {
  margin-top: 15px;
}

.multiselect {
  border-radius: 8px;
  border: 2px solid $color-heather;
  transition: border-color $trans-default;

  &:hover {
    border-color: $color-juniper;
  }
}

.multiselect.is-active {
  box-shadow: none;
  border-color: $color-juniper;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}


.multiselect-options,
.multiselect-dropdown {
  border-color: $color-juniper;
  border-top: none;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
}
</style>
