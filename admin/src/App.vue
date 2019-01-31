<template>
  <div id="app" class="flex-column">
    <router-view/>
  </div>
</template>
<style lang="postcss">
@import './assets/styles/index.css';
#app {
  width: 100vw;
  height: 100vh;
  overflow: auto;
}
</style>
