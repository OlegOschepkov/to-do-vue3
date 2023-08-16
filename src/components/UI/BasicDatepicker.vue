<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { defineProps } from 'vue';
import { useField } from 'vee-validate';

const props = defineProps({
  modelValue: {
    type: Date,
    default: new Date(Date.now()),
  },
  id: {
    type: String,
  },
  label: {
    type: String,
  },
  name: {
    type: String,
  }
});

const { value, errorMessage, handleChange } = useField(props.name, {
  initialValue: props.modelValue,
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
    <VueDatePicker :model-value="value" @update:model-value="updateDate" :name="name" :id="id"></VueDatePicker>
    <span
      class="error"
      id="`${id}-error`"
      aria-live="assertive"
      role="alert"
    >
        {{ errorMessage }}
      </span>
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/variables.scss';

select {
  margin-left: 15px;
}

.dp__input {
  border-radius: 8px;
  border: 2px solid $color-heather;
  transition: border-color $trans-default;

  &:hover {
    border-color: $color-juniper;
  }
}
</style>
