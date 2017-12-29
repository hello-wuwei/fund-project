/**
 * 关于接口请求的一些配置项
 * @type {[type]}
 */
import crypto from 'utils/crypto.js'

/**
 * 接口基本参数
 * @param       {[type]} data [description]
 * @constructor
 */
export const baseUrl = 'http://192.168.0.252:8011'
// export const baseUrl = 'http://139.224.138.105:13811'

export function Authorization(timestamp) {
  let token = crypto.encryptMD5(timestamp).substring(11, 17).toUpperCase()
  let data = {
    version: 1,
    timestamp: timestamp,
    os: 1,
    access_token: token
  }
  return data
}

/**
 * 接口请求成功常量
 * @type {[type]}
 */
export const ERR_OK = 0

/**
 * 超时时间
 * */
export const TIME_OUT = 10000
/**
 * 接口请求地址
 * @type {String}
 */

export const REQUEST_URL = process.env.NODE_ENV === 'production' ? 'http://192.168.1.99:8068' : 'http://192.168.0.251:9801'
