/**
 * Created by Administrator on 2018/2/24.
 */
import pdfView from './components/pdfView.vue'
import labelMake from './components/labelMake.vue'
const pdfLabel = {
  install: function (Vue, options) {
    Vue.component('pdf-view', pdfView)
    Vue.component('label-make', labelMake)
  }
}
export default pdfLabel
