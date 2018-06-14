/**
 * Created by Administrator on 2017/12/18.
 */
import util from '../utils/utils'
import { Authorization, msgPushUrl } from '../api/config'
export const getConnectUrl = () => { return msgPushUrl + '/ms-websocket' + '?' + util.toQueryString(Authorization()) }
export const getPath = () => { return '/topic/remind/TTD_FUND_MANAGE_' + util.getStorageUserInfo().userId + '_' + util.getStorageUserInfo().au }
