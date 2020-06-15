import axios from 'axios'
/* 静态配置常数 */
let config = {
  baseURL: `//.zhihuijiankang.com/open/`
}
if (location.href.indexOf('h5.d.zhihuijiankang') !== -1 || location.href.indexOf('localhost') !== -1) {
  config = {
    baseURL: `//.d.zhihuijiankang.com/open`,
  }
}
/* 日期格式化 */
let dateFormat = (date, format) => {
  format = format || 'yyyy-MM-dd hh:mm:ss'
  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return format
}


/* 截取链接参数 */
let urlGet = () => {
  var args = {}
  var query = location.search.substring(1)
  var pairs = query.split('&')
  for (var i = 0; i < pairs.length; i++) {
    var pos = pairs[i].indexOf('=')
    if (pos === -1) continue
    var argname = pairs[i].substring(0, pos)
    var value = pairs[i].substring(pos + 1)
    value = decodeURIComponent(value)
    args[argname] = value
  }
  return args
}

let showToast = (text) => {
  var div = document.createElement('div')
  div.setAttribute('class', 'container-toast')
  var span = document.createElement('span')
  span.innerHTML = text
  div.appendChild(span)
  document.body.appendChild(div)
  div.style.opacity = 1
  setTimeout(function () {
    document.body.removeChild(div)
  }, 1500)
}

let showLoading = function (text) {
  document.getElementById('loading').style.display = 'block'
  document.getElementById('loading').style.opacity = 1;
  document.getElementById('loading_text').innerHTML = text;
}

let hideLoading = function () {
  document.getElementById('loading').style.display = 'none'
}


let showAlertBox = function (content, showCancel, sureText, cancelText, cb) {
  document.getElementById('alert-box').style.display = 'block'
  document.getElementById('alert-content').innerHTML = content
  document.getElementById('alert-sure').innerHTML = sureText || '确定'
  document.getElementById('alert-cancel').innerHTML = cancelText || '取消'
  if(!showCancel){
    document.getElementById('alert-cancel').style.display = 'none';
  }
  document.getElementById('alert-sure').onclick = function () {
    if (cb) {
      cb()
    }
    hideAlertBox()
  }
}

let hideAlertBox = function () {
  document.getElementById('alert-box').style.display = 'none'
}

axios.defaults.baseURL = config.baseURL // 设置接口域名

let requestAPI = async (url, param, method = 'GET') => {
  showLoading()
  param.timestamp = dateFormat(new Date())

  try {
    let datas = await axios({
      url: url,
      params: param,
      method: method
    })
    hideLoading()
    if (datas.data.code == 0) {//eslint-disable-line
      return datas.data
    } else {
      alert(datas.data.message)
    }
  } catch (err) {
    hideLoading()
    alert('请求错误！')
  }
}
export {
  requestAPI,
  urlGet,
  showToast,
  showLoading,
  hideLoading,
  showAlertBox,
  config
}
