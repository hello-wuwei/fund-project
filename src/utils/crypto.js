import CryptoJs from 'crypto-js'
let localKey = CryptoJs.enc.Utf8.parse('2a4ac92b8217a77a')
let localIv = CryptoJs.enc.Utf8.parse('44bf0314c4e1b101')

/**
 * 获取时间戳
 * @returns {string}
 * @private
 */

function _utf8 (KeyStr) {
  return CryptoJs.enc.Utf8.parse(KeyStr)
}

function _getTimeStamp () {
  let time = new Date().getTime().toString()
  return time
}
/**
 * base64转码
 * @param content
 * @private
 */
function _encryptBase64 (content) {
  let str = CryptoJs.enc.Utf8.parse(content)
  let base64 = CryptoJs.enc.Base64.stringify(str)
  return base64
}
/**
 * base64解码
 * @param content
 * @returns {string}
 * @private
 */
function _decryptBase64 (content) {
  var words = CryptoJs.enc.Base64.parse(content)
  var parseStr = words.toString(CryptoJs.enc.Utf8)
  return parseStr
}

function _encryptMD5 (content) {
  return CryptoJs.MD5(content).toString()
}

/**
 * 本地AES加密
 * @param content 需要加密的内容
 * @returns {string}
 * @private
 */
function _storgeEnctyptAES (content) {
  let encryptResult = CryptoJs.AES.encrypt(content, localKey, {
    iv: localIv,
    mode: CryptoJs.mode.CBC,
    padding: CryptoJs.pad.Pkcs7
  }).toString()
  return encryptResult
}

function _localEnctyptAES (content, localKey, localIv) {
  let encryptResult = CryptoJs.AES.encrypt(content, localKey, {
    iv: localIv,
    mode: CryptoJs.mode.CBC,
    padding: CryptoJs.pad.Pkcs7
  }).toString()
  return encryptResult
}
/**
 * 本地AES解密
 * @param content 需要解密的内容
 * @returns {string}
 * @private
 */
function _localDectyptAES (content) {
  let bytes = CryptoJs.AES.decrypt(content.toString(), localKey, {
    iv: localIv,
    mode: CryptoJs.mode.CBC,
    padding: CryptoJs.pad.Pkcs7
  })
  return bytes.toString(CryptoJs.enc.Utf8)
}
function _enctyptSHA256 (timestamp) {
  return CryptoJs.SHA256(timestamp).toString().substring(0, 16)
}
export default {
  encryptBase64: function (content) {
    return _encryptBase64(content)
  },
  decryptBase64: function (content) {
    return _decryptBase64(content)
  },
  encryptMD5: function (content) {
    return _encryptMD5(content)
  },
  getTimeStamp: function () {
    return _getTimeStamp()
  },
  enctyptAES: function (content, localKey, localIv) {
    return _localEnctyptAES(content, localKey, localIv)
  },
  dectyptAES: function (content) {
    return _localDectyptAES(content)
  },
  enctyptSHA256: function (timestamp) {
    return _enctyptSHA256(timestamp)
  },
  utf8: function (KeyStr) {
    return _utf8(KeyStr)
  },
  storgeEnctyptAES: function (content) {
    return _storgeEnctyptAES(content)
  }

}
