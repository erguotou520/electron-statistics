<template>
  <a-layout>
    <app-menu />
    <a-layout>
      <app-header />
      <a-layout-content class="px-2 py-2" style="overflow-y:auto">
        <router-view/>
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

</style>
