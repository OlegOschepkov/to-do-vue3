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
  (event: 'update:modelValue', value: string): void;
}>();

const { value, errorMessage } = useField(() => props.name);

const onInput = () => {
  emit('update:modelValue', value.value as string);
};
</script>

<template>
  <div
    class="input-element"
    :class="value ? 'not-empty' : ''"
  >
    <label :for="id">
      <textarea
        :id="id"
        v-model="value"
        type="text"
        :name="name"
        :placeholder="placeholder"
        :aria-describedby="errorMessage ? `${id}-error` : null"
        :aria-invalid="errorMessage ? true : null"
        @input="onInput"
      />
      <span
        v-if="label"
        class="input-element__label"
      >
        {{ label }}
      </span>
      <span
        :id="`${id}-error`"
        class="error"
        aria-live="assertive"
        role="alert"
      >
        {{ errorMessage }}
      </span>
    </label>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables.scss';

.input-element {
  position: relative;
  margin-top: 15px;

  &.not-empty textarea {
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

  textarea {
    margin: 0;
    padding: 10px;
    border-radius: 8px;
    border: 2px solid $color-heather;
    width: 100%;
    transition: border-color 0.3s;
    color: $color-nero;

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
