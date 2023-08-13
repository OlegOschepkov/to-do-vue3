<script setup lang="ts">
import navBar from '@/components/UI/navBar';
</script>

<template>
  <div id="app">
    <div class="page-container">
      <navBar/>
      <div class="container container--animation">
        <router-view v-slot="{ Component }">
          <transition name="route" mode="out-in" appear>
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/variables.scss';

#app {
  min-height: 100vh;
  //width: 100vw;
  background-color: $color-white-lilac;
}
.route-enter-from {
  opacity: 0;
  transform: translateX(100vw)
}
.route-enter-active,
.route-leave-active {
  transition: all .2s ease-out
}
.route-leave-to {
  opacity: 0;
  transform: translateX(-100vw)
}

.container--animation {
  overflow: hidden;
}

.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.error {
  color: $color-cardinal;
}
</style>
