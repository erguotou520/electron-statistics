// 后台接口地址
let _url = ''
// 设备唯一标识
let _deviceId = ''
// 用户信息
let _user
// 是否开启调试
let _debug = false

/**
 * 初始化
 * @param {String} url 后台接口地址
 */
export async function init (url, options) {
  options = options || { deviceId: '', debug: false }
  _url = url
  _deviceId = options.deviceId
  _debug = options.debug
  if (options.user && options.user.id) {
    _user = options.user
  }
  if (!_deviceId) {
    try {
      const { machineId } = window.require('node-machine-id')
      _deviceId = await machineId({ original: true })
    } catch (error) {}
  }
  if (!_deviceId) {
    throw new Error('Please specify the deviceId or install node-machine-id module.')
  }
  trackOnline(true)
}

/**
 * 设置设备id
 * @param {String} id 设备id
 */
export function setDeviceId (id) {
  _deviceId = id
}

/**
 * 设置用户信息
 * @param {String} id 用户id
 * @param {String} name 用户名称
 * @param {Object} info 用户其余信息
 */
export function setUserInfo (id, name, info) {
  _user = {
    id,
    name,
    ...info
  }
  track('_setUser', _user)
}

/**
 * 跟踪事件
 * @param {String} event 事件名
 * @param {Object|String} data 事件属性
 */
export function track (event, data, eventName) {
  if (!_url) throw new Error('Please init the sdk first.')
  // eslint-disable-next-line
  const img = new Image()
  let url = new URL(_url)
  // url.search = param({
  //   event,
  //   eventName,
  //   data,
  //   user: _user ? _user.id : undefined,
  //   device: _deviceId
  // })
  const params = new URLSearchParams({
    event,
    device: _deviceId
  })
  if (_user) {
    params.append('user', _user.id)
  }
  if (data) {
    params.append('data', JSON.stringify(data))
  }
  if (eventName) {
    params.append('eventName', eventName)
  }
  url.search = params.toString()
  img.src = url.href
  img.onload = () => {
    if (_debug) {
      console.debug('Track success')
    }
  }
  img.onerror = (err) => {
    if (_debug) {
      console.error(`Track error`, err)
    }
  }
}

/**
 * 页面浏览事件
 * @param {String} pageUrl 页面地址
 * @param {Any} extra 额外数据
 * @param {String} customName 显示的事件名
 */
export function trackPageView (pageUrl, extra, eventName = '页面浏览') {
  track('pageView', { pageUrl, extra }, eventName)
}

/**
 * 统计在线状态
 * 1分钟统计一次
 */
function trackOnline (isFirst = false) {
  const data = isFirst ? { startup: 1 } : {}
  if (_user && isFirst) {
    data.user = _user
  }
  track('_online', data)
  setTimeout(() => {
    trackOnline()
  }, 60000)
}
