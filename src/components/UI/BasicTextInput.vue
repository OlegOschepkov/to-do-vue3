<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';
import { useField } from 'vee-validate';

const props = defineProps<{
  placeholder?: string,
  id: string,
  name: string,
  label: string
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: String): void;
}>();

const { value, errorMessage } = useField(() => props.name);

const onChange = () => {
  emit('update:modelValue', value.value as String);
};
</script>

<template>
  <div
    class="input-element"
    :class="value ? 'not-empty' : ''"
  >
    <label :for="id">
      <input
        type="text"
        v-model="value"
        :id="id"
        :name="name"
        @input="onChange"
        :placeholder="placeholder"
        :aria-describedby="errorMessage ? `${id}-error` : null"
        :aria-invalid="errorMessage ? true : null"
      />
      <span
        v-if="label"
        class="input-element__label"
      >
        {{ label }}
      </span>
      <span
        class="error"
        :id="`${id}-error`"
        aria-live="assertive"
        role="alert"
      >
        {{ errorMessage }}
      </span>
    </label>
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/variables.scss';

.input-element {
  position: relative;
  margin-top: 15px;

  &.not-empty input {
    border-color: $color-dodger;

    & + .input-element__label {
      transform: translate(-10px, -20px) scale(.8);
      background-color: $color-dodger;
      color: $color-default-white;
    }
  }

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
    color: $color-nero;

    .not-empty &,
    &:hover,
    &:active,
    &:focus {
      border-color: $color-dodger;

      & + .input-element__label {
        transform: translate(-10px, -20px) scale(.8);
        background-color: $color-dodger;
        color: $color-default-white;
      }
    }

    &:focus-visible {
      outline: none;
      border-color: $color-dodger;
    }
  }
}
</style>
