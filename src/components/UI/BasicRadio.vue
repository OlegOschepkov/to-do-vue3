<script setup lang="ts">
import { defineProps } from 'vue';
import { useField } from 'vee-validate';

const props = defineProps<{
  radiovalue: number,
  id: string,
  name: string,
  label: string,
  checked?: boolean,
}>();

const { value, handleChange } = useField(props.name, {
  initialValue: props.radiovalue,
  valueProp: props.radiovalue
});
</script>

<template>
  <div class="radio-element">
    <input
      v-bind="$attrs"
      :id="id"
      v-model="value"
      type="radio"
      :value="radiovalue"
      :checked="radiovalue === Number(value) || checked"
      @change="handleChange(radiovalue)"
    >
    <label
      v-if="label"
      :for="id"
    >
      {{ label }}
    </label>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables.scss';

.radio-element {
  margin-top: 5px;

  label {
    position: relative;
    font-size: 16px;
    line-height: 150%;
    padding: 1px 10px 1px 30px;
    cursor: pointer;

    &:after {
      content: '';
      display: block;
      position: absolute;
      left: 3px;
      top: 3px;
      height: 15px;
      width: 15px;
      border-radius: 3px;
      border: 2px solid $color-heather;
      background-color: $color-default-white;
      transition: all $trans-default;
      z-index: 1;
    }

    &:hover:after,
    &:active:after,
    &:focus:after {
      border-color: $color-dodger;
    }

    &:before {
      content: '';
      display: block;
      position: absolute;
      left: 6px;
      top: 6px;
      height: 9px;
      width: 9px;
      border-radius: 3px;
      background-color: $color-dodger;
      transition: all $trans-default;
      z-index: 2;
      opacity: 0;
    }
  }

  input {
    display: none;

    &:checked ~ label:before {
      opacity: 1;
    }
  }
}
</style>
