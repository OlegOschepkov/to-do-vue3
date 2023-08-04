<template>
  <div class="input-element">
    <label v-if="label"
      :for="id"
    >
      <input
        type="text"
        v-bind="$attrs"
        :id="id"
        :name="name"
        :value="modelValue"
        @input="updateInput"
        :placeholder="placeholder"
        :aria-describedby="error ? `${id}-error` : null"
        :aria-invalid="error ? true : null"
      />

      <span
        v-if="label"
        class="input-element__label"
      >
        {{ label }}
      </span>
      <span
        class="error"
        v-if="error"
        :id="`${id}-error`"
        aria-live="assertive"
      >
        {{ error }}
      </span>
    </label>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'basicTextInput',

  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    placeholder: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    error: {
      type: String,
      default: ''
    }
  },

  setup(_, {emit}) {
    const updateInput = (e: Event) => {
      const el = e.target as HTMLInputElement;
      emit('update:modelValue', el.value as String);
    }

    return {
      updateInput
    }
  }

  // methods: {
  //   updateInput(e) {
  //     this.$emit('update:modelValue', e.target.value);
  //   }
  // }
})
</script>

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
