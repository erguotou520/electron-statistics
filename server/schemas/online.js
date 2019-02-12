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
  // 时间段开始时间，一天可能会有多个ip记录
  time: {
    type: Date
  },
  // 这段时间的在线时长，单位秒
  duration: {
    type: Number
  },
  // ip
  ip: {
    type: String
  },
  // ip对应的省份
  province: {
    type: String
  },
  // ip对应的城市
  city: {
    type: String
  },
  // 上一次更新时间
  lastUpdateTime: {
    type: Date
  }
})

module.exports = mongoose.model('online', OnlineSchema)
