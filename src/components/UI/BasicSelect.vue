<script setup lang="ts">
import Multiselect from '@vueform/multiselect';
import { defineEmits, defineProps } from 'vue';
import { SortOption } from '@/types/sortOptions';

const props = defineProps<{
  modelValue: string | number | undefined,
  options: SortOption[]
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void;
}>();

const onSelect = (value: string) => {
  emit('update:modelValue', value)
};
</script>

<template>
  <div class="select-element">
    <Multiselect
      :value="props.modelValue"
      placeholder="Без сортировки"
      :options="props.options"
      @change="onSelect"
    />
  </div>
</template>

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
