/**
 * Created by Administrator on 2017/12/1.
 */
const resiter = (Vue) => {
  Vue.filter('date', function (date) {
    if (date) {
      date = new Date(date)
      let Y = date.getFullYear()
      let M = date.getMonth() + 1
      M = M < 10 ? '0' + M : M
      let D = date.getDate()
      D = D < 10 ? ('0' + D) : D
      let h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      let m = date.getMinutes()
      m = m < 10 ? ('0' + m) : m
      let s = date.getSeconds()
      s = s < 10 ? ('0' + s) : s
      return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s
    } else {
      return '--'
    }
  })
  Vue.filter('fomatUsed', function (state) {
    if (state) {
      return {
        '1': '启用',
        '0': '停用'
      }[state]
    } else {
      return '--'
    }
  })
  Vue.filter('mobHidden', function (mobile) {
    return mobile.substr(0, 3) + '****' + mobile.substring(7, mobile.length)
  })
}
export default resiter
