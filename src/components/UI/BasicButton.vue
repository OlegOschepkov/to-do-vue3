<script setup lang="ts">

</script>

<template>
  <button class="btn">
    <slot>
    </slot>
  </button>
</template>

<style lang="scss">
@import '@/assets/scss/variables.scss';

.btn {
  margin: 15px 0;
  align-self: flex-end;
  padding: 15px;
  border: none;
  cursor: pointer;
  color: $color-default-white;
  background-color: $color-azure;
  opacity: 1;
  transition: all 0.3s;
  text-decoration: none;
  border-radius: 8px;

  &:hover {
    opacity: 0.7
  }

  &--yellow {
    background-color: $color-amber;
  }

  &--red {
    background-color: $color-punch;
  }

  &--green {
    background-color: $color-emerald;
  }
}
</style>
