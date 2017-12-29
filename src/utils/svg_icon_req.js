/**
 * Created by Administrator on 2017/12/6.
 */
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('../assets/icon', false, /\.svg$/)
requireAll(req)
