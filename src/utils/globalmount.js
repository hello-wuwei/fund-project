/**
 * Created by Administrator on 2017/11/8.
 */
// import scrollBar from '../components/globalComponents/scorllbar.vue'
import comResiter from './global_com_config'                     // 挂载全局组件配置
import filterResiter from './global_filter_config'               // 挂载全局过滤器配置
import funResiter from './global_fun_config'                      // 挂载全局方法配置
import validateResiter from './global_validate_config'            // 挂载全局表单验证规则方法配置
import directiveResiter from './global_directive_config'            // 挂载全局表单验证规则方法配置
const glomount = {
  install: function (Vue, options) {
    funResiter(Vue)
    filterResiter(Vue)
    comResiter(Vue)
    validateResiter(Vue)
    directiveResiter(Vue)
  }
}
export default glomount
