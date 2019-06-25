import Vue from 'vue'
import qs from 'qs'
// 去除字符串中所有空格
const trim = str => {
  return str.replace(/\s|\xA0/g, '')
}

const isEmptyObject = obj => {
  // 判断是否是空对象
  for (var key in obj) {
    return false
  }
  return true
}
// 判断是否是空数组
const isEmptyArr = arr => {
  return JSON.stringify(arr) === '[]'
}

// 获取url中的参数 (有些时候获取的到)
const GetQueryString = name => {
  // var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  // var r = window.location.search.substr(1).match(reg);
  // if (r != null) return unescape(r[2]);
  // return null;
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = (window.location.hash || window.location.search).substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}

//获取url后面的参数 直接从href字段上去匹配
const GetUrlParam = name => {
  let reg = new RegExp('(^|\\?|&)' + name + '=([^&]*)(\\s|&|$)', 'i')
  if (reg.test(window.location.href)) {
    return unescape(RegExp.$2.replace(/\+/g, ' '))
  } else {
    return null
  }
}

// formdata格式转json
const formdataToJson = fdata => {
  var objData = {}
  fdata.forEach((value, key) => (objData[key] = value))
  return JSON.stringify(objData)
}
//检测-ios终端
const isIOS = () => {
  return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}

//检测-android终端
const isAndroid = () => {
  return navigator.userAgent.indexOf('Android') > -1 || u.indexOf('Adr') > -1
}

// 从指定字符位置开始截取到末尾
const strSpecifyToEnd = (obj, font) => {
  var index = obj.lastIndexOf(font)
  var obj = obj.substring(index + 1, obj.length)
  return obj
}
// 从0位置到指定位置
const strStartToEnd = (obj, font) => {
  var index = obj.lastIndexOf(font)
  var obj = obj.substring(0, index)
  return obj
}

// 字符串转dom元素方法
const parseDom = arg => {
  var objE = document.createElement('div')
  objE.innerHTML = arg
  return objE.childNodes
}
// 数组去重es6
const arrUnique = arr => {
  const res = new Map()
  return arr.filter(a => !res.has(a) && res.set(a, 1))
}
/***
 * 交换指定2个元素的位置
 * @param obj {object}
 * @param arr 目标 数组
 * @param start 被交换元素
 * @param end  交换元素
 */

const changeArrPos = obj => {
  let arr = obj.arr
  // 交换第三个和第四个元素
  // x < y
  let x = obj.start,
    y = obj.end
  arr.splice(x - 1, 1, ...arr.splice(y - 1, 1, arr[x - 1]))
  return arr
}

// 设置session方法，对象转字符串处理
const setSession = (key, value) => {
  if (Object.prototype.toString.call(value) === '[object Object]') {
    sessionStorage.setItem(key, qs.stringify(value))
    console.log('0000', value)
  } else {
    sessionStorage.setItem(key, value)
  }
}

/**********************
 * 获取某个元素下标
 * arrays  : 传入的数组
 * obj     : 需要获取下标的元素
 **************/
const contains = (arrays, obj) => {
  var i = arrays.length
  while (i--) {
    if (arrays[i] === obj) {
      return i
    }
  }
  return false
}

// hack fixed vConsole error
const toJSON = () => {
  return false
}
Vue.prototype.$trim = trim
Vue.prototype.$isEmptyObject = isEmptyObject
Vue.prototype.$GetQueryString = GetQueryString
window.$GetQueryString = GetQueryString
Vue.prototype.$GetUrlParam = GetUrlParam
Vue.prototype.$formdataToJson = formdataToJson
Vue.prototype.$isIOS = isIOS
Vue.prototype.$isAndroid = isAndroid
Vue.prototype.$parseDom = parseDom
Vue.prototype.$arrUnique = arrUnique
Vue.prototype.$changeArrPos = changeArrPos
Vue.prototype.$isEmptyArr = isEmptyArr
Vue.prototype.$setSession = setSession
Vue.prototype.toJSON = toJSON
Vue.prototype.$strSpecifyToEnd = strSpecifyToEnd
Vue.prototype.$strStartToEnd = strStartToEnd
Vue.prototype.$contains = contains
