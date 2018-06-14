/**
 * Created by Administrator on 2018/1/5.
 */
// const ENV_LIST = [
//   {
//     envName: 'development',
//     baseUrl: 'http://192.168.0.252:8011',
//     msgPushUrl: 'http://192.168.0.251:10086'
//   },
//   {
//     envName: 'test',
//     baseUrl: 'http://192.168.0.252:8011',
//     msgPushUrl: 'http://192.168.0.251:10086'
//   },
//   {
//     envName: 'production',
//     baseUrl: 'http://139.224.138.105:13811',
//     msgPushUrl: 'http://139.224.138.105:13108'
//   }
// ]
const HOST_ENV = process.env.NODE_ENV
const type = process.env.type
let HOST_CONF
if (HOST_ENV === 'development') {
  HOST_CONF = {
    envName: 'development',
    baseUrl: 'http://192.168.0.252:8011',
    msgPushUrl: 'http://192.168.0.251:10086'
    // baseUrl: 'http://192.168.88.201:8011',
    // msgPushUrl: 'http://192.168.88.201:10086'
    // baseUrl: 'http://125.69.150.167:8011',
    // msgPushUrl: 'http://125.69.150.167:10086'
  }
}
if (HOST_ENV === 'production') {
  if (type === 'test') {
    HOST_CONF = {
      envName: 'test',
      baseUrl: 'http://192.168.0.252:8011',
      msgPushUrl: 'http://192.168.0.251:10086'
      // baseUrl: 'http://125.69.150.167:17811',
      // msgPushUrl: 'http://125.69.150.167:17816'
      // baseUrl: 'http://192.168.88.201:8011',
      // msgPushUrl: 'http://192.168.88.201:10086'
    }
  } else {
    HOST_CONF = {
      envName: 'production',
      baseUrl: 'http://139.224.138.105:13811',
      msgPushUrl: 'http://139.224.138.105:13108'
    }
  }
}
// for (let i = 0; i < ENV_LIST.length; i++) {
//   if (ENV_LIST[i].envName === HOST_ENV) {
//     if (ENV_LIST[i].envName === process.env.type) {
//       HOST_CONF = ENV_LIST[i]
//       return
//     }
//     HOST_CONF = ENV_LIST[i]
//   }
// }
export default HOST_CONF
