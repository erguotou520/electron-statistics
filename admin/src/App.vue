<template>
  <a-locale-provider :locale="locale">
    <div id="app" class="flex-column">
      <router-view/>
    </div>
  </a-locale-provider>
</template>
<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
export default {
  data () {
    return {
      locale: zhCN
    }
  }
}
</script>
<style lang="postcss">
@import './assets/styles/index.css';
#app {
  width: 100vw;
  height: 100vh;
  overflow: auto;
}
</style>
