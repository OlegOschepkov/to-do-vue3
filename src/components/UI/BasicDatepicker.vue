<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { defineProps } from 'vue';
import { useField } from 'vee-validate';

const props = defineProps<{
  modelValue?: Date,
  id: string,
  name: string,
  label: string,
}>();

const { value, errorMessage, handleChange } = useField(props.name, {
  initialValue: props.modelValue ? props.modelValue : new Date(Date.now()),
  valueProp: props.modelValue
});

const updateDate = (e: Date) => {
  handleChange(e, true)
};
</script>

<template>
  <div class="datepicker-element">
    <p>
      {{ label }}
    </p>
    <VueDatePicker
      :id="id"
      :model-value="value"
      :name="name"
      @update:model-value="updateDate"
    />
    <span
      id="`${id}-error`"
      class="error"
      aria-live="assertive"
      role="alert"
    >
      {{ errorMessage }}
    </span>
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/variables.scss';
@import '@/assets/scss/mixins.scss';

.datepicker-element {
  .dp__input {
    border-radius: 8px;
    border: 2px solid $color-heather;
    transition: border-color $trans-default;

    &:hover {
      border-color: $color-dodger;
    }
  }

  p {
    @include reset-item;
  }
}
</style>
