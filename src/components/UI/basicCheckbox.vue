<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  modelValue: boolean,
  id: string,
  label: string
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', checked: boolean): void;
}>()
</script>

<template>
  <div class="checkbox-element">
    <input
      type="checkbox"
      v-bind="$attrs"
      :id="id"
      :checked="modelValue"
      @change="emit('update:modelValue', $event.target.checked)"
    >
    <label v-if="label"
           :for="id"
    >
      {{ label }}
    </label>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables.scss';

.input-element {
  position: relative;
  margin-top: 15px;

  &__label {
    position: absolute;
    left: 9px;
    top: 8px;
    transform: scale(1);
    font-size: 16px;
    line-height: 150%;
    padding: 1px 10px;
    border-radius: 8px;
    background-color: $color-default-white;
    transition: all $trans-default;
  }

  input {
    margin: 0;
    padding: 10px;
    border-radius: 8px;
    border: 2px solid $color-heather;
    width: 100%;
    transition: border-color 0.3s;

    &:hover,
    &:active,
    &:not(:placeholder-shown),
    &:focus {
      border-color: $color-juniper;

      & + .input-element__label {
        transform: translate(-10px, -20px) scale(.8);
        background-color: $color-juniper;
      }
    }

    &:focus-visible {
      outline: none;
      border-color: $color-juniper;
    }
  }
}
</style>
