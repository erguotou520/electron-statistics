const mongoose = require('mongoose')

const DeviceSchema = new mongoose.Schema({
  // 设备id
  deviceId: {
    type: String
  },
  // 操作系统
  os: {
    type: String
  },
  // 操作系统版本号
  osRelease: {
    type: String
  },
  // app version
  appVersion: {
    type: String
  }
}, { timestamps: true })

module.exports = mongoose.model('device', DeviceSchema)
