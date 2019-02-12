const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  // 用户Id
  id: {
    type: String,
    required: true,
    index: true,
    maxlength: 100
  },
  // 用户名
  name: {
    type: String,
    maxlength: 500
  },
  // 性别
  gender: {
    // 1 男 2 女 3其它
    type: Number
  },
  // 出生年
  birthyear: {
    type: Number
  },
  // 其它额外属性
  extra: {
    type: Object
  }
}, { timestamps: true })

module.exports = mongoose.model('user', UserSchema)
