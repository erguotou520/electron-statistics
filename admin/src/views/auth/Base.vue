<template>
  <div class="v-auth flex-column-ai-center">
    <div class="flex-ai-center mb-5">
      <img :src="`${publicPath}logo.png`" width="36">
      <div class="ml-2 font-28">应用统计后台</div>
    </div>
    <div class="auth-content">
      <router-view />
    </div>
    <div class="copyright mt-auto">Copyright &copy; 2019 南京墨者科技</div>
  </div>
</template>
<script>
export default {
  props: {},
  data () {
    return {
      publicPath: process.env.BASE_URL
    }
  },
  computed: {},
  methods: {},
  mounted () {}
}
</script>
<style lang="postcss">
.v-auth {
  height: 100%;
  padding-top: 20%;
  padding-bottom: 24px;
  background: var(--darkBg);
  color: #fff;
  & .auth-content {
    width: 80%;
    max-width: 360px;
  }
}
</style>
