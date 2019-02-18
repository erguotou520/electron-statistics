const dayjs = require('dayjs')
const omit = require('lodash.omit')
const IP2Region = require('ip2region')
const Device = require('../schemas/device')
const Online = require('../schemas/online')
const Launch = require('../schemas/launch')
const User = require('../schemas/user')
const Event = require('../schemas/event')

const ipQuery = new IP2Region()

const querySchema = {
  type: 'object',
  properties: {
    event: {
      type: 'string',
      description: '事件'
    },
    eventName: {
      type: 'string',
      description: '事件名'
    },
    data: {
      type: 'string',
      description: '事件属性'
    },
    user: {
      type: 'string',
      description: '用户标识码'
    },
    device: {
      type: 'string',
      description: '设备标识码'
    }
  }
}

async function _saveUser (user) {
  if (user.id) {
    const _user = await User.findOne({ id: user.id })
    if (!_user) {
      await User.create({
        id: user.id,
        name: user.name,
        gender: user.gender,
        birthyear: user.birthyear,
        extra: omit(user, ['id', 'name', 'gender', 'birthyear'])
      })
    }
  }
}

async function _saveDevice (deviceId, device) {
  if (deviceId && device) {
    const _device = await Device.findOne({ deviceId })
    if (!_device) {
      await Device.create({
        deviceId,
        ...device
      })
    }
  }
}

async function _saveLaunch (deviceId) {
  if (deviceId) {
    const _launch = await Launch.findOne({
      deviceId,
      createdAt: {
        $lt: dayjs().endOf('day').toDate(),
        $gte: dayjs().startOf('day').toDate()
      }
    })
    if (!_launch) {
      await Launch.create({
        deviceId,
        count: 1
      })
    } else {
      _launch.count++
      await _launch.save()
    }
  }
}

async function handlerSetUser (data) {
  await _saveUser(data)
}

async function handlerOnline (data) {
  const now = new Date()
  let validUpdateTime = new Date(now)
  validUpdateTime.setSeconds(validUpdateTime.getSeconds() - 90)
  const todayStart = dayjs().startOf('day').toDate()
  validUpdateTime = validUpdateTime > todayStart ? validUpdateTime : todayStart
  let _online = await Online.findOne({
    deviceId: data.device,
    userId: data.user,
    ip: data.ip,
    lastUpdateTime: {
      // 90秒以内的才算
      $gt: validUpdateTime
    }
  })
  if (_online) {
    _online.duration = Math.round((now - _online.time) / 1000)
    _online.lastUpdateTime = now
    await _online.save()
  } else {
    _online = await Online.create({
      deviceId: data.device,
      userId: data.user,
      time: now,
      duration: 0,
      ip: data.ip,
      lastUpdateTime: now
    })
    setTimeout(() => {
      const geo = ipQuery.search(data.ip)
      if (geo) {
        _online.province = geo.province
        _online.city = geo.city
        _online.save()
      }
    }, 1)
  }
  // 初次设置时携带用户信息
  if (data.data && data.data.startup) {
    await _saveLaunch(data.device)
    if (data.data.user) {
      await _saveUser(data.data.user)
    }
    if (data.data.device) {
      await _saveDevice(data.device, data.data.device)
    }
  }
}

async function handlerCustomEvent (data) {
  const _event = await Event.findOne({
    deviceId: data.device,
    userId: data.user,
    event: data.event
  })
  if (_event) {
    _event.eventCount++
    await _event.save()
  } else {
    await Event.create({
      deviceId: data.device,
      userId: data.user,
      event: data.event,
      eventName: data.eventName,
      eventData: data.data,
      eventCount: 1
    })
  }
}

module.exports = (fastify) => {
  fastify.get('/web.gif', {
    schema: {
      description: '统计记录',
      querystring: querySchema
      // response: {
      //   200: {
      //     description: '返回码'
      //   }
      // }
    }
  }, async (request, reply) => {
    if (request.query.data) {
      try {
        request.query.data = JSON.parse(request.query.data)
      } catch (error) {}
    }
    const { event } = request.query
    const { ip } = request.req
    // const ip = '112.80.103.116'
    const data = { ...request.query, ip }
    switch (event) {
      case '_setUser':
        handlerSetUser(data)
        break
      case '_online':
        handlerOnline(data)
        break
      default:
        handlerCustomEvent(data)
    }
    reply.send()
  })
}
