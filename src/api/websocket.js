/**
 * Created by Administrator on 2017/12/18.
 */
import util from '../utils/utils'
import { Authorization } from '../api/config'
export const connectUrl = 'http://139.224.138.105:13108/ms-websocket' + '?' + util.toQueryString(Authorization())
export const path = '/topic/remind/TTD_FUND_MANAGE_' + (util.getStorage('TTD_MANAGE_USERINFO') ? util.getStorage('TTD_MANAGE_USERINFO').userId : '')
