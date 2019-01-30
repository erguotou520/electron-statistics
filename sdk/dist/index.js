(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.es = {}));
}(this, function (exports) { 'use strict';

  // 后台接口地址
  let _url = '';
  // 设备唯一标识
  let _deviceId = '';
  // 用户信息
  let _user;
  // 是否开启调试
  let _debug = false;

  function _isObject (obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
  }

  function _isFunction (obj) {
    return Object.prototype.toString.call(obj) === '[object Function]'
  }

  function _isNotNull (obj) {
    return obj !== undefined && obj !== null
  }

  function buildParams (prefix, obj, add) {
    let name;
    if (Array.isArray(obj)) {
      add(prefix, JSON.stringify(obj));
      // Serialize array item.
      // obj.forEach((v, i) => {
      //   // Item is non-scalar (array or object), encode its numeric index.
      //   buildParams(prefix + '[' + (typeof v === 'object' && v != null ? i : '') + ']', v, add)
      // })
    } else if (_isObject(obj)) {
      // Serialize object item.
      for (name in obj) {
        if (_isNotNull(obj[name])) {
          buildParams(prefix + '[' + name + ']', obj[name], add);
        }
      }
    } else {
      // Serialize scalar item.
      add(prefix, obj);
    }
  }

  /**
   * Clone from jQuery.param
   * @param  {object} obj obj to param
   * @return {string}     paramed string
   */
  function param (obj) {
    // Return direct for formdata
    if (obj instanceof window.FormData) {
      return obj
    }
    let prefix;
    const s = [];
    const add = function (key, valueOrFunction) {
      // If value is a function, invoke it and use its return value
      var value = _isFunction(valueOrFunction) ? valueOrFunction() : valueOrFunction;

      s[s.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value == null ? '' : value);
    };

    // If an array was passed in, assume that it is an array of form elements.
    if (Array.isArray(obj)) {
      // Serialize the form elements
      add(JSON.stringify(obj));
      // obj.forEach((value, index) => {
      //   add(index, value)
      // })
    } else {
      // If traditional, encode the "old" way (the way 1.3.2 or older
      // did it), otherwise encode params recursively.
      for (prefix in obj) {
        if (_isNotNull(obj[prefix])) {
          buildParams(prefix, obj[prefix], add);
        }
      }
    }

    // Return the resulting serialization
    return s.join('&')
  }

  /**
   * 初始化
   * @param {String} url 后台接口地址
   */
  function init (url, options) {
    options = options || { deviceId: '', debug: false };
    _url = url;
    _deviceId = options.deviceId;
    _debug = options.debug;
    if (!_deviceId) {
      try {
        const { machineIdSync } = window.require('node-machine-id');
        _deviceId = machineIdSync({ original: true });
      } catch (error) {}
    }
    if (!_deviceId) {
      throw new Error('Please specify the deviceId or install node-machine-id module.')
    }
    trackOnline();
  }

  /**
   * 设置设备id
   * @param {String} id 设备id
   */
  function setDeviceId (id) {
    _deviceId = id;
  }

  /**
   * 设置用户信息
   * @param {String} id 用户id
   * @param {String} name 用户名称
   * @param {Object} info 用户其余信息
   */
  function setUserInfo (id, name, info) {
    _user = {
      id,
      name,
      ...info
    };
  }

  /**
   * 跟踪事件
   * @param {String} event 事件名
   * @param {Object|String} data 事件属性
   */
  function track (event, data, eventName) {
    if (!_url) throw new Error('Please init the sdk first.')
    // eslint-disable-next-line
    const img = new Image();
    let url = new URL(_url);
    url.search = param({
      event,
      eventName,
      data,
      user: _user ? _user.id : undefined,
      device: _deviceId
    });
    img.src = url.href;
    img.onload = () => {
      if (_debug) {
        console.debug('Track success');
      }
    };
    img.onerror = (err) => {
      if (_debug) {
        console.error(`Track error`, err);
      }
    };
  }

  function trackPageView (pageUrl, extra, customName = '页面浏览') {
    track('pageView', { pageUrl, extra }, customName);
  }

  /**
   * 统计在线状态
   * 1分钟统计一次
   */
  function trackOnline () {
    track('_online');
    setTimeout(() => {
      trackOnline();
    }, 60000);
  }

  exports.param = param;
  exports.init = init;
  exports.setDeviceId = setDeviceId;
  exports.setUserInfo = setUserInfo;
  exports.track = track;
  exports.trackPageView = trackPageView;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
