/**
 * Created by Administrator on 2017/12/1.
 */
const resiter = (Vue) => {
  Vue.prototype.formatDate = (date) => {
    if (date) {
      date = new Date(date)
      let Y = date.getFullYear()
      let M = date.getMonth() + 1
      M = M < 10 ? '0' + M : M
      let D = date.getDate()
      D = D < 10 ? ('0' + D) : D
      return Y + '-' + M + '-' + D
    } else {
      return ''
    }
  }
}
export default resiter
