<template>
  <a-form :form="form" ref="form" @submit="login">
    <a-form-item>
      <a-input
        autofocus
        placeholder="请输入用户名"
        v-decorator="[
          'username',
          { rules: [{ required: true, message: '请输入用户名!' }] }
        ]"
      >
        <a-icon slot="prefix" type='user' style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        type="password"
        placeholder="请输入密码"
        v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入密码!' }] }
        ]"
      >
        <a-icon slot="prefix" type='lock' style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit" block>登录</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  data () {
    return {}
  },
  methods: {
    ...mapActions(['setUser']),
    login (e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const { error, data } = await this.$http.post('/login', values)
          if (!error) {
            this.setUser(data)
            this.$router.replace({ name: 'overview' })
          }
        }
      })
    }
  }
}
</script>
<style lang="postcss">

</style>
