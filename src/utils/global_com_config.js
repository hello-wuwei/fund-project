/**
 * Created by Administrator on 2017/12/1.
 */
import scrollBar from '../components/globalComponents/scorllbar.vue'
import icon from '../components/globalComponents/iconSvg.vue'
import switchPage from '../components/globalComponents/switchPage.vue'
import labelViewDialog from '../components/commomComponents/labelViewDialog.vue'
import ComBreadcrumb from '../components/globalComponents/ComBreadcrumb.vue'
const resiter = (Vue) => {
  Vue.component('scroll-bar', scrollBar)
  Vue.component('icon', icon)
  Vue.component('switch-page', switchPage)
  Vue.component('label-view-dialog', labelViewDialog)
  Vue.component('com-breadcrumb', ComBreadcrumb)
}
export default resiter
