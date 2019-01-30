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

const Device = mongoose.model('device', DeviceSchema)

module.exports = Device
