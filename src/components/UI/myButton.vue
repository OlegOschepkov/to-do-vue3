<template>
    <button class="btn">
      <slot>

      </slot>
    </button>
</template>

<script>
export default {
  name: 'my-button'
}
</script>

<style lang="scss">
@import '@/assets/scss/variables.scss';

.btn {
  margin: 15px 0;
  align-self: flex-end;
  padding: 15px;
  border: none;
  cursor: pointer;
  color: white;
  background-color: teal;
  opacity: 1;
  transition: all 0.3s;
  text-decoration: none;
}

.btn:hover {
  opacity: 0.7
}

</style>
