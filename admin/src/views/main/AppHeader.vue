<template>
  <a-layout-header id="app-header" class="flex-jc-end">
    <a-dropdown :trigger="['click']">
      <a href="#">
        <a-icon type="user"/>
        {{user.name}} <a-icon type="down" />
      </a>
      <a-menu slot="overlay">
        <a-menu-item key="0">
          <a href @click.prevent="pwdVisible=true">修改密码</a>
        </a-menu-item>
        <a-menu-item key="1">
          <a href @click.prevent="_logout">退出登录</a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
    <m-update-pwd v-model="pwdVisible"/>
  </a-layout-header>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import MUpdatePwd from './MUpdatePwd'
export default {
  data () {
    return {
      pwdVisible: false
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  components: {
    MUpdatePwd
  },
  methods: {
    ...mapActions(['logout']),
    _logout () {
      this.logout()
      this.$router.replace({ name: 'login' })
    }
  }
}
</script>
<style lang="postcss">
/* #app-header .ant-dropdown-trigger {
  color: #fff;
} */
#app-header {
  background-color: #fff;
  padding: 0 16px;
}
</style>
