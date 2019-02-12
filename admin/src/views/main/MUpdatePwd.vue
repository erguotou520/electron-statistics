<template>
  <a-modal title="修改密码"
    ok-text="确定" cancel-text="取消"
    :visible="value" @input="v => $emit('input', v)"
    @ok="updatePwd"
    @cancel="$emit('input',false)">
    <a-form :form="form" ref="form" @submit="updatePwd">
      <a-form-item>
        <a-input
          autoFocus
          type="password"
          placeholder="请输入旧密码"
          v-decorator="[
            'oldPassword',
            { rules: [{ required: true, message: '请输入旧密码!' }] }
          ]"
        />
      </a-form-item>
      <a-form-item>
        <a-input
          type="password"
          placeholder="请输入新密码"
          v-decorator="[
            'newPassword',
            { rules: [
              { required: true, message: '请输入新密码!' },
              { min: 6, message: '密码最少6位数!' }
            ] }
          ]"
        />
      </a-form-item>
      <a-form-item>
        <a-input
          type="password"
          placeholder="请再次输入新密码"
          v-decorator="[
            'confirmPassword',
            { rules: [
              { required: true, message: '请再次输入新密码!' },
              { validator: compareToFirstPassword }
            ] }
          ]"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props: {
    value: Boolean
  },
  beforeCreate () {
    this.form = this.$form.createForm(this);
  },
  methods: {
    ...mapActions(['logout']),
    compareToFirstPassword  (rule, value, callback) {
      if (value && value !== this.form.getFieldValue('newPassword')) {
        callback('两次密码不一致')
      } else {
        callback()
      }
    },
    updatePwd (e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const { error } = await this.$http.put('/updatePwd', values)
          if (!error) {
            this.logout()
            this.$router.replace({ name: 'login' })
            this.$message.info('请使用新密码重新登录')
          }
        }
      })
    }
  }
}
</script>
