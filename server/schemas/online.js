const mongoose = require('mongoose')

const OnlineSchema = new mongoose.Schema({
  // 设备id
  deviceId: {
    type: String
  },
  // 用户id
  userId: {
    type: String
  },
  // 时间段
  time: {
    type: Number
  },
  // 这段时间的在线时长，单位秒
  duration: {
    type: Number
  },
  // ip
  ip: {
    type: String
  },
  // 上一次更新时间
  lastUpdateTime: {
    type: Date
  }
})

module.exports = mongoose.model('online', OnlineSchema)
