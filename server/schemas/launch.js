const mongoose = require('mongoose')

const LaunchSchema = new mongoose.Schema({
  // 设备id
  deviceId: {
    type: String
  },
  // 启动次数
  count: {
    type: Number
  }
}, { timestamps: true })

module.exports = mongoose.model('launch', LaunchSchema)
