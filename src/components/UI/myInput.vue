<template>
  <div class="input-element">
    <label
        :for="id"
    >
      <input
          :id="id"
          :value="modelValue"
          @input="updateInput"
          placeholder=""
          type="text">

      <span class="input-element__label">{{ label }}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'my-input',

  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    }
  },

  methods: {
    updateInput(e) {
      this.$emit('update:modelValue', e.target.value);
    }
  }
}
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
