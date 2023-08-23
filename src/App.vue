<script setup lang="ts">
import TheNavBar from '@/components/UI/TheNavBar.vue';
</script>

<template>
  <div id="app">
    <div class="page-container">
      <TheNavBar/>
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
  background-color: $color-snow;
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

.page {
  min-height: calc(100vh - 104px);
  padding: 180px 0;
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
