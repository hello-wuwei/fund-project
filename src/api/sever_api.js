/**   所有使用的接口配置在这里 */
import {post} from './http'
import util from '../utils/utils'
import {baseUrl} from './config'
// let baseUrl = 'http://139.224.138.105:13811'
let proBaseURL = baseUrl + '/ttd-fund-product'
let labelBaseURL = baseUrl + '/ttd-fund-pdf'
let msgBaseURL = baseUrl + '/message-service'
let logBaseUrl = baseUrl + '/ttd-log'

let bakBaseUrl = baseUrl + '/ttd-fund-user'
export default {
  fileUploadUrl () { return baseUrl + '/zuul/file-service/oos/uploadFile' },               // 个人中心 - 上传文件服务器地址

  uploadAvator (data) { return post('/sys/user/update/avatar', data) },               // 个人中心 - 上传文件

  updateBindMobile (data) { return post('/sys/user/update/mobile', data) },               // 个人中心 - 修改绑定手机号码

  updatePsd (data) { return post('/sys/user/update/pwd', data) },               // 个人中心 - 修改绑定手机号码

  loginIn (data) { return post('/sysUser/login', data) },               // 登录

  getCode (data) { return post('/sysUser/obtain/smscode', data) },               // 获取验证码

  findPassword (data) { return post('/sysUser/findPwd', data) },               // 找回密码

  getRolelist (data) { return post('/sysRole/list', data) },           // 系统管理 - 获取角色列表

  newRole (data) { return post('/sysRole/save', data) },           // 系统管理 - 新增角色

  getSystemRoleIdTree (data) { return post('/sysRole/sources/tree', data) },           // 系统管理 - 获取指定角色资源树

  systemRoleAuthorize (data) { return post('/sysRole/save/roleResources', data) },           // 系统管理 - 对指定角色授权

  getCustodianlist (data) { return post('/trust/user/list', data) },           // 用户管理 - 获取托管人列表

  newCustodian (data) { return post('/trust/user/save', data) },           // 用户管理 - 新增托管人

  newOrgInfo (data) { return post('/trust/user/add/trust/info', data) },           // 用户管理 - 新增托管机构信息

  showOrgUserInfo (data) { return post('/trust/user/view', data) },           // 用户管理 - 获取机构用户详情

  getManagerlist (data) { return post('/manager/user/list', data) },           // 用户管理 - 获取管理人列表

  getUserRoleList (data) { return post('/sysRole/list', data) },           // 用户管理/系统管理 - 获取角色列表

  newUserRole (data) { return post('/sysRole/save', data) },           // 用户管理 - 新增用户角色

  getRole_user (data) { return post('/trust/user/list/role', data) },           // 用户管理 - 获取用户已拥有的角色列表

  roleAuthorize (data) { return post('/trust/user/add/role', data) },           // 用户管理 - 托管人角色授权

  custodianStopUsed (data) { return post('/trust/user/used', data) },           // 用户管理 - 托管人启用停用

  showRoleInfo (data) { return post('/sysRole/view', data) },           // 用户管理 - 用户角色详情

  showManagerInfo (data) { return post('/manager/user/view', data) },           // 用户管理 - 管理人详情

  showAccountAppionInfo (data) { return post('/manager/user/view/account', data) },           // 用户管理 - 管理人账户认证信息

  accountCheck (data) { return post('/manager/user/account', data) },           // 用户管理 - 账户审核

  roleAuthorizeManager (data) { return post('/manager/user/add/role', data) },           // 用户管理 - 管理人角色授权

  managerStopUsed (data) { return post('/manager/user/used', data) },           // 用户管理 - 管理人启用停用changeRoleUsed

  changeRoleUsed (data) { return post('/sysRole/used', data) },           // 用户管理 - 用户角色启用停用变更

  deleteUserRole (data) { return post('/sysRole/del', data) },           // 用户管理 - 用户角色 - 删除

  getPersonInver (data) { return post('/personal/user/list', data) },           // 用户管理 - 获取投资人列表

  personInverState (data) { return post('/personal/user/used', data) },           // 用户管理 - 投资人启用停用状态变更

  getOrgInver (data) { return post('/mechanism/user/list', data) },           // 用户管理 - 获取投资者机构列表

  orgInverState (data) { return post('/mechanism/user/used', data) },           // 用户管理 - 机构投资者启用停用状态变更

  getOrgCheckView (data) { return post('/mechanism/user/view', data) },           // 用户管理 - 机构投资者详情

  getOrgCheckSubmit (data) { return post('/mechanism/user/verify', data) },           // 用户管理 - 机构投资者详情

  getResouceTree (data) { return post('/sys/sources/tree', data) },           // 系统管理 - 管理后台 - 资源树

  addResouce (data) { return post('/sys/sources/save', data) },           // 系统管理 - 管理后台 - 添加资源

  editResouceView (data) { return post('/sys/sources/view', data) },           // 系统管理 - 管理后台 - 编辑资源

  stopUseBack (data) { return post('/sys/sources/used', data) },           // 系统管理 - 管理后台 - 停用

  deleteBackSource (data) { return post('/sys/sources/del', data) },           // 系统管理 - 管理后台 - 删除

  stopUseBclient (data) { return post('/sys/sources/used', data) },           // 系统管理 - B端管理 - 停用

  managerCheckOut (data) { return post('/manager/user/verify', data) },           // 用户管理 - 管理人审查

  orgManageTree (data) { return post('/deptInfo/tree', data) },           // 系统管理 - 组织管理列表

  newOrganization (data) { return post('/deptInfo/save', data) },           // 系统管理 - 新增组织

  getSystemAccountList (data) { return post('/sys/user/list', data) },           // 系统管理 - 新增组织

  getOrgView (data) { return post('/deptInfo/view', data) },           // 系统管理 -  组织部门详情

  deleteOrg (data) { return post('/deptInfo/del', data) },           // 系统管理 -  组织部门删除

  newSystemAccount (data) { return post('/sys/user/save', data) },           // 系统管理 -  系统账号 - 新增

  getAccountInfo (data) { return post('/sys/user/view', data) },           // 系统管理 -  系统账号 - 详情

  accountStateChange (data) { return post('/sys/user/used', data) },           // 系统管理 -  系统账号 - 账号停用启用

  deleteAccount (data) { return post('/sys/user/remove', data) },           // 系统管理 -  系统账号 - 删除账号

  resetAccountPsd (data) { return post('/sys/user/repwd', data) },           // 系统管理 -  系统账号 -  重置密码

  getRole_system (data) { return post('/sys/user/list/role', data) },           // 系统管理 -  系统账号 -  用户角色列表

  roleAuthorizeSystem (data) { return post('/sys/user/add/role', data) },           // 系统管理 -  系统账号 -  用户角色列表

  getOperLogList (data) { return post('/log/list', data, logBaseUrl) },           // 系统管理 -  操作日志 - 列表

  getParamList (data) { return post('/sysParameter/list', data) },           // 系统管理 -  参数配置 - 列表

  getParamInfo (data) { return post('/sysParameter/view', data) },           // 系统管理 -  参数配置 - 详细信息

  saveParamInfo (data) { return post('/sysParameter/save', data) },           // 系统管理 -  参数配置 - 保存参数

  getManagerSealList (data) { return post('/userStamp/list/manager', data) },           // 印章管理 -  管理人印章 - 列表

  getCustodianSealList (data) { return post('/userStamp/list/trustuser', data) },           // 印章管理 -  托管人印章 - 列表

  uploadSeal (data) { return post('/userStamp/update', data) },           // 印章管理 -  管理人印章 - 上传/修改

  getSealInfo (data) { return post('/userStamp/view', data) },           // 印章管理 -  管理人印章 - 上传/修改

  getProductList (data) { return post('/productManage/list', data, proBaseURL) },           // 产品管理 -  列表

  getProInfo (data) { return post('/productManage/view', data, proBaseURL) },           // 产品管理 -  详细信息

  uploadContract (data) { return post('/productManage/upload', data, proBaseURL) },           // 产品管理 - 上传合同

  submitLabel (data) { return post('/label/create', data, labelBaseURL) },           // 产品管理 - 提交打标签

  getLabelList (data) { return post('/labelLibrary/list', data, labelBaseURL) },           // 产品管理 - 提交打标签

  getAllLabelList (data) { return post('/labelLibrary/simple/list', data, labelBaseURL) },           // 产品管理 - 提交打标签g

  addTextLabel (data) { return post('/labelLibrary/save', data, labelBaseURL) },           // 产品管理 - 标签 - 新增

  changeUsedState (data) { return post('/labelLibrary/used', data, labelBaseURL) },           // 产品管理 - 标签 - 停用/启用

  getContractLabel (data) { return post('/label/list', data, labelBaseURL) },           // 产品管理 - 标签 - 停用/启用

  getMessageList (data) { return post('/ms/list', data, msgBaseURL) },                  //  消息中心 - 消息列表

  markMsgRead (data) { return post('/ms/read', data, msgBaseURL) },                  //  消息中心 - 消息列表

  getMessageNum (data) { return post('/ms/' + util.getStorage('TTD_MANAGE_USERINFO').userId + '/0', data, msgBaseURL) },                   //  未读消息条数

  getManagerBak (data) { return post('/userInfo/childList', data, bakBaseUrl) },

  addChildAccount (data) { return post('/userInfo/addChildAccount', data, bakBaseUrl) },

  updateChildAccount (data) { return post('/userInfo/updateChildInfo', data, bakBaseUrl) },

  getOrgListBak (data) { return post('/organizationStructure/list', data, bakBaseUrl) },

  deleteAccountBak (data) { return post('/userInfo/deleteChild', data, bakBaseUrl) },

  changeUsedBak (data) { return post('/userInfo/updateChildState', data, bakBaseUrl) },

  revisePsdBak (data) { return post('/userInfo/resetChildPassword', data, bakBaseUrl) }
}
