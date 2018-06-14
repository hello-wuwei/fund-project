/**
 * Created by Administrator on 2017/12/1.
 */
import {validateIdCard} from './id_card'
const resiter = (Vue) => {
  Vue.prototype.validateMobile = (rule, value, callback) => {
    let mobile = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/
    if (value === '') {
      callback(new Error('请输入手机号！'))
    } else if (!mobile.test(value)) {
      callback(new Error('手机号码格式不正确！'))
    } else {
      callback()
    }
  }
  Vue.prototype.validatePassword = (rule, value, callback) => {
    let psd = /^(?![a-zA-Z]+$)^(?![0-9]+$)^(?![^a-zA-Z0-9]+$)[\x1f-~]{6,15}/
    if (value === '') {
      callback(new Error('请输入密码！'))
    } else if (!psd.test(value) || value.length < 6 || value.length > 15) {
      callback(new Error('密码必须为6到15位的数字、字母以及特殊字符任意两种的组合'))
    } else {
      callback()
    }
  }
  Vue.prototype.validateCheckPsd = (orginPassword) => {
    return (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码！'))
      } else if (value !== orginPassword) {
        callback(new Error('两次输入密码不一致！'))
      } else {
        callback()
      }
    }
  }
  // 名称验证--- validateName: '验证字段名称'
  // len: '验证内容的最大长度'
  // require: '是否必填，true为必填，false为非必填，默认为必填'
  // isHasCode: '是否只能为汉字，true为可包含其他字符，false为只能是汉字，默认只能为汉字'
  Vue.prototype.validateName = (validateName, len, require = true, isHasCode = false) => {
    let han = /^[\u4e00-\u9fa5]+$/
    return (rule, value, callback) => {
      if (require === false) {
        if (value === '') {
          callback()
        }
      }
      if (value === '') {
        callback(new Error('请输入' + validateName + '！'))
      } else if (!isHasCode && !han.test(value)) {
        callback(new Error(validateName + '必须为汉字！'))
      } else if (value.length > len) {
        callback(new Error(validateName + '不能超过' + len + '个字！'))
      } else {
        callback()
      }
    }
  }
  // 资源排序验证
  Vue.prototype.validateSortVal = (rule, value, callback) => {
    if (value === '') {
      callback()
    } else if (typeof value !== 'number' || value <= 0 || value > 999) {
      callback(new Error('排序必须为不小于1的三位数值！'))
    } else {
      callback()
    }
  }
  // 资源编码验证
  Vue.prototype.validateSourceCode = (rule, value, callback) => {
    // let code = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/
    let code = /^(?!_)(?!.*?_$)[A-Z_]{0,50}$/
    if (value === '') {
      callback(new Error('请输入资源编码！'))
    } else if (!code.test(value)) {
      callback(new Error('资源编码必须为长度不超过50个字符的大写字母或与下划线的组合'))
    } else {
      callback()
    }
  }
  // 资源路径验证
  Vue.prototype.validateSourcePath = (rule, value, callback) => {
    let code = /^[A-Za-z_//]{0,200}$/
    if (value === '') {
      callback()
    } else if (!code.test(value)) {
      callback(new Error('资源路径必须为长度不超过200个字符的字母或与正斜杠的组合'))
    } else {
      callback()
    }
  }
  // 数字或字符串长度验证
  Vue.prototype.validateLength = (name, min, max) => {
    return (rule, value, callback) => {
      if (value.toString().length < min || value.toString().length > max) {
        if (min === max) {
          callback(new Error(name + '的长度必须为' + min + '位！'))
        } else {
          callback(new Error(name + '的长度必须为' + min + '位到' + max + '位之间！'))
        }
      } else {
        callback()
      }
    }
  }
  // 身份证号码验证
  Vue.prototype.validateIdCard = (rule, value, callback) => {
    // let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    if (value === '') {
      callback(new Error('请输入身份证号码！'))
    } else if (!validateIdCard(value)) {
      callback(new Error('您输入的身份证号码不合法！'))
    } else {
      callback()
    }
  }

  Vue.prototype.validateIdOrgCard = (rule, value, callback) => {
    // let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    if (value === '') {
      callback()
    } else if (!validateIdCard(value)) {
      callback(new Error('您输入的身份证号码不合法！'))
    } else {
      callback()
    }
  }
}
export default resiter
