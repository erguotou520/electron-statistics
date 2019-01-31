const mongoose = require('mongoose')

const DeviceSchema = new mongoose.Schema({
  // 设备Id
  id: {
    type: String,
    required: true,
    index: true,
    maxlength: 100
  }
}, { timestamps: true })

module.exports = mongoose.model('device', DeviceSchema)
