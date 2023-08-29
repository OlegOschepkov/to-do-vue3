<script setup lang="ts">
import BasicButton from '@/components/UI/BasicButton.vue';
</script>

<template>
  <div class="modal">
    <div class="modal__wrapper">
      <h4 class="modal__title">
        Вы уверены?
      </h4>
      <div class="modal__btns">
        <BasicButton
          class="btn--red"
          type="button"
          @click="$emit('delete')"
        >
          Да!
        </BasicButton>
        <BasicButton
          class="btn--green"
          type="button"
          @click="$emit('close')"
        >
          Нет
        </BasicButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables.scss';
@import '@/assets/scss/mixins.scss';

.modal {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba($color-cadet-blue, 0.8);
  opacity: 0;
  visibility: hidden;
  transition: opacity $trans-default;
  left: 0;
  top: 0;
  border-radius: 8px;

  &__wrapper {
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 100%;
    gap: 15px;
  }

  &__title {
    @include reset-item;
    text-align: center;
  }

  &__btns {
    display: flex;
    justify-content: center;
    gap: 15px;

    .btn {
      margin: 0;
    }
  }

  &.is-active {
    visibility: visible;
    opacity: 1;
  }
}

</style>
