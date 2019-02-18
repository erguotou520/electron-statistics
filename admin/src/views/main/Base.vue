<template>
  <a-layout>
    <app-menu />
    <a-layout>
      <app-header />
      <a-layout-content class="mx-3 my-3 px-3 py-3"
        style="background:#fff;border-radius:4px;overflow-y:auto">
        <transition name="router">
          <router-view/>
        </transition>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import AppHeader from './AppHeader'
import AppMenu from './AppMenu'
export default {
  components: {
    AppHeader,
    AppMenu
  }
}
</script>
<style lang="postcss">
.router-enter-active {
  transition: all .3s ease;
}
.router-enter {
  opacity: 0;
  transform: translateX(100px);
}
</style>
