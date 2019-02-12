<template>
  <a-layout-sider collapsible v-model="collapsed">
    <div id="app-logo" class="font-18 flex-ai-jc-center px-2">
      <img :src="`${publicPath}logo.png`" width="36">
      <span id="app-name" class="pl-2">应用统计后台</span>
    </div>
    <a-menu theme="dark" mode="inline"
      :defaultOpenKeys="defaultOpenedMenus"
      :defaultSelectedKeys="[$route.name || $route.path]"
      @click="selectMenu">
      <template v-for="menu in menus">
        <a-sub-menu v-if="menu.children" :key="menu.path">
          <span slot="title">
            <a-icon :type="menu.meta.icon" />
            <span>{{menu.meta.name}}</span>
          </span>
          <a-menu-item v-for="sub in menu.children" :key="sub.name">
            {{sub.meta.name}}
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item v-else :key="menu.name">
          <a-icon :type="menu.meta.icon" />
          <span>{{menu.meta.name}}</span>
        </a-menu-item>
      </template>
    </a-menu>
  </a-layout-sider>
</template>
<script>
import { menus } from '../../router.js'
export default {
  data () {
    const { name, path } = this.$route
    const matchedMenu = menus.find(menu => {
      return path.match(new RegExp(`^\/${menu.path}\/`))
    })
    return {
      collapsed: false,
      publicPath: process.env.BASE_URL,
      menus,
      defaultOpenedMenus: name && matchedMenu ? [matchedMenu.path] : []
    }
  },
  methods: {
    selectMenu (menu) {
      this.$router.push({ name: menu.key })
    }
  }
}
</script>
<style lang="postcss">
#app-logo {
  height: 64px;
  color: #fff;
}
.ant-layout-sider-collapsed #app-name {
  display: none;
}
</style>
