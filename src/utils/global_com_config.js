/**
 * Created by Administrator on 2017/12/1.
 */
import scrollBar from '../components/globalComponents/scorllbar.vue'
import icon from '../components/globalComponents/iconSvg.vue'
const resiter = (Vue) => {
  Vue.component('scroll-bar', scrollBar)
  Vue.component('icon', icon)
}
export default resiter
