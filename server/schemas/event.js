const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
  // 设备id
  deviceId: {
    type: String
  },
  // 用户id
  userId: {
    type: String
  },
  // 事件名
  event: {
    type: String
  },
  // 事件别名
  eventName: {
    type: String
  },
  // 事件属性
  eventData: {
    type: [Object, String]
  },
  // 一天内事件总数
  eventCount: {
    type: Number
  }
}, { timestamps: true })

module.exports = mongoose.model('event', EventSchema)
