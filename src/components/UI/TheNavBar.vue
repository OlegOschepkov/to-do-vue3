<script setup lang="ts">
import BasicSvgIcon from '@/components/UI/BasicSvgIcon.vue';
import { HeaderLinks, defaultHeaderLinks } from '@/types/headerLinks';

const headerLinks: HeaderLinks[] = defaultHeaderLinks;

let floatingText: HTMLElement;

const mouseOver = (e: Event) => {
  const target = e.target as HTMLElement;
  floatingText = target.querySelector('[data-float-text]') as HTMLElement;
  floatingText.style.maxWidth = floatingText.scrollWidth + 'px';
};

const mouseLeave = () => {
  floatingText.style.maxWidth = '';
};
</script>

<template>
  <div class="navbar">
    <div class="navbar__wrapper container">
      <BasicSvgIcon
        name="logo-icon"
        width="64"
        height="64"
      />
      <router-link
        v-for="link in headerLinks"
        :key="link.key"
        :to="link.url"
        class="navbar__link"
        :class="{ 'navbar__link--profile' : link.url === '/profile' }"
        data-float-parent
        @mouseover.self="mouseOver"
        @mouseleave="mouseLeave"
      >
        <BasicSvgIcon
          :name="link.icon"
          width="64"
          height="64"
        />
        <span
          class="navbar__text-wrapper"
          data-float-text
        >
          <span class="navbar__text">
            {{ link.text }}
          </span>
        </span>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/variables.scss';

@keyframes spark {
  0% {
    box-shadow: 0 0 0 $color-sapling, 0 0 0 $color-sapling, 0 0 0 $color-sapling;
  }
  50% {
    box-shadow: 0 0 10px $color-sapling, 0 0 40px $color-sapling, 0 0 80px $color-sapling;
  }
  100% {
    box-shadow: 0 0 0 $color-sapling, 0 0 0 $color-sapling, 0 0 0 $color-sapling;
  }
}

.navbar {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 100;
  padding: 10px;
  background-color: $color-dodger;

  &__wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
  }

  &__text-wrapper {
    position: absolute;
    overflow: hidden;
    top: 0;
    left: 40px;
    opacity: 1;
    max-width: 0;
    height: 100%;
    display: flex;
    border-top-right-radius: 42px;
    border-bottom-right-radius: 42px;
    transition: opacity $trans-default, width $trans-default, max-width $trans-default;
    z-index: 1;
  }

  &__text {
    display: inline-flex;
    align-items: center;
    height: 100%;
    font-size: 24px;
    line-height: 150%;
    font-weight: 700;
    color: $color-nero;
    white-space: nowrap;
    padding: 10px 10px 10px 44px;
    border-top-right-radius: 42px;
    border-bottom-right-radius: 42px;
    background-color: $color-anakiwa;

  }

  &__link {
    background-color: $color-anakiwa;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    position: relative;
    border-radius: 50%;

    &--profile {
      margin-left: auto;
    }

    &.router-link-active {
      background-color: $color-white-lilac;
      pointer-events: none;

      .navbar__text,
      .navbar__text-wrapper {
        background-color: $color-white-lilac;
      }
    }

    :focus {
      outline: none;
    }

    .svg-icon {
      fill: $color-nero;
      pointer-events: none;
      z-index: 3;
      position: relative;
    }

    &:hover {
      .navbar__text-wrapper {
        width: 1000px;
        opacity: 1;
      }
    }
  }

  @for $i from 0 through 100 {
    .navbar__link:nth-of-type(#{$i}) {
      z-index: (100 - $i);
    }
  }
}
</style>
