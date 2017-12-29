/**
 * Created by Administrator on 2017/12/23.
 */
function _getLoginInfo() {
  // window.onload = function () {
  let script = document.createElement('script')
  script.src = 'http://freegeoip.net/json/?callback=loginInfo'
  document.getElementsByTagName('head')[0].appendChild(script)
}
export default _getLoginInfo
