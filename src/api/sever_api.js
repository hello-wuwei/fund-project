/**   所有使用的接口配置在这里 */
import {post} from './http'
import util from '../utils/utils'
import {baseUrl} from './config'
// let baseUrl = 'http://139.224.138.105:13811'
let proBaseURL = baseUrl + '/ttd-fund-product'
let labelBaseURL = baseUrl + '/ttd-fund-pdf'
let msgBaseURL = baseUrl + '/message-service'
let logBaseUrl = baseUrl + '/ttd-log'
let pdfBaseUrl = baseUrl + '/zuul/file-service'
let dataBaseUrl = baseUrl + '/ttd-data-manage'
let uKeyBaseUrl = baseUrl + '/ess-fund/cert'
let questionnaireUrl = baseUrl + '/ttd-fund-question'
let exitBaseUrl = baseUrl + '/keep-trace'

let userBaseUrl = baseUrl + '/ttd-fund-user'
export default {
  fileUploadUrl () { return baseUrl + '/zuul/file-service/oos/uploadFile' },               // 个人中心 - 上传文件服务器地址

  uploadAvator (data) { return post('/sys/user/update/avatar', data) },               // 个人中心 - 上传文件

  updateBindMobile (data) { return post('/sys/user/update/mobile', data) },               // 个人中心 - 修改绑定手机号码

  updatePsd (data) { return post('/sys/user/update/pwd', data) },               // 个人中心 - 修改绑定手机号码

  loginIn (data) { return post('/sysUser/login', data) },               // 登录

  getCode (data) { return post('/sysUser/obtain/smscode', data) },               // 获取验证码

  findPassword (data) { return post('/sysUser/findPwd', data) },               // 找回密码

  getUserRootInfo (data) { return post('/sys/user/select/user/authinfo', data) },               // 登录

  getRolelist (data) { return post('/sysRole/list', data) },           // 系统管理 - 获取角色列表

  newRole (data) { return post('/sysRole/save', data) },           // 系统管理 - 新增角色

  getSystemRoleIdTree (data) { return post('/sysRole/sources/tree', data) },           // 系统管理 - 获取指定角色资源树

  systemRoleAuthorize (data) { return post('/sysRole/save/roleResources', data) },           // 系统管理 - 对指定角色授权

  getCustodianlist (data) { return post('/trust/user/list', data, userBaseUrl) },           // 用户管理 - 获取托管人列表

  newCustodian (data) { return post('/trust/user/save', data, userBaseUrl) },           // 用户管理 - 新增托管人

  newOrgInfo (data) { return post('/trust/user/add/trust/info', data, userBaseUrl) },           // 用户管理 - 新增托管机构信息

  showOrgUserInfo (data) { return post('/trust/user/view', data, userBaseUrl) },           // 用户管理 - 获取机构用户详情

  getManagerlist (data) { return post('/manager/user/list', data, userBaseUrl) },           // 用户管理 - 获取管理人列表

  getUserRoleList (data) { return post('/sysRole/list', data) },           // 用户管理/系统管理 - 获取角色列表

  newUserRole (data) { return post('/sysRole/save', data) },           // 用户管理 - 新增用户角色

  getRole_user (data) { return post('/trust/user/list/role', data) },           // 用户管理 - 获取用户已拥有的角色列表

  roleAuthorize (data) { return post('/trust/user/add/role', data) },           // 用户管理 - 托管人角色授权

  custodianStopUsed (data) { return post('/trust/user/used', data, userBaseUrl) },           // 用户管理 - 托管人启用停用

  custodianResetPsd (data) { return post('/trust/user/resetPassword', data, userBaseUrl) },           // 用户管理 - 托管人密码重置

  showRoleInfo (data) { return post('/sysRole/view', data) },           // 用户管理 - 用户角色详情

  showManagerInfo (data) { return post('/manager/user/view', data, userBaseUrl) },           // 用户管理 - 管理人详情

  showAccountAppionInfo (data) { return post('/manager/user/view/account', data, userBaseUrl) },           // 用户管理 - 管理人账户认证信息

  accountCheck (data) { return post('/manager/user/account', data, userBaseUrl) },           // 用户管理 - 账户审核

  managerCheckOut (data) { return post('/manager/user/verify', data, userBaseUrl) },           // 用户管理 - 管理人机构审查

  roleAuthorizeManager (data) { return post('/manager/user/add/role', data) },           // 用户管理 - 管理人角色授权

  managerStopUsed (data) { return post('/manager/user/used', data, userBaseUrl) },           // 用户管理 - 管理人启用停用changeRoleUsed

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

  orgManageTree (data) { return post('/deptInfo/tree', data) },           // 系统管理 - 组织管理列表

  newOrganization (data) { return post('/deptInfo/save', data) },           // 系统管理 - 新增组织

  getSystemAccountList (data) { return post('/sys/user/list', data) },           // 系统管理 - 系统账号 - 列表

  userUnlock (data) { return post('/system/unlock/user', data) },           // 系统管理 - 系统账号 - 解锁

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

  getTaskScheduleList (data) { return post('/taskSchedule/list', data) },           // 系统管理 -  任务调度 - 列表

  newTask (data) { return post('/taskSchedule/save', data) },           // 系统管理 -  任务调度 - 列表

  getPublicAccList (data) { return post('/manageAccountAuthor/allManageAccountAuthor', data, userBaseUrl) },           // 系统管理 -  对公账户 - 列表

  saveManagerAccInfo (data) { return post('/manageAccountAuthor/editManageAccountAuthor', data, userBaseUrl) },           // 系统管理 -  对公账户 - 新增/修改账户信息

  getToPublicAccDetail (data) { return post('/manageAccountAuthor/selectManageAccountAuthorByName', data, userBaseUrl) },           // 系统管理 -  对公账户 - 详情

  getManagerSearchList (data) { return post('/orgTable/list2', data, userBaseUrl) },           // 系统管理 -  对公账户 - 模糊搜索列表

  getTaskDetail (data) { return post('/taskSchedule/view', data) },           // 系统管理 -  任务调度 - 详情

  deleteTask (data) { return post('/taskSchedule/del', data) },           // 系统管理 -  任务调度 - 删除

  getManagerSealList (data) { return post('/seal/managerSealList', data, userBaseUrl) },           // 印章管理 -  管理人印章 - 列表

  getCustodianSealList (data) { return post('/seal/depositSealList', data, userBaseUrl) },           // 印章管理 -  托管人印章 - 列表

  uploadSeal (data) { return post('/seal/updateSealImage', data, userBaseUrl) },           // 印章管理 -  管理人印章 - 上传/修改

  getSealInfo (data) { return post('/seal/getSealInfo', data, userBaseUrl) },           // 印章管理 -  管理人印章 - 详情

  getUkeyList (data) { return post('/ukeyInfo/list', data) },           // 印章管理 -  UKEY管理 - 列表

  getUkeyInfo (data) { return post('/ukeyInfo/view', data) },           // 印章管理 -  UKEY管理 - 详情

  queryUkeyInfo (data) { return post('/query/cf', data, uKeyBaseUrl) },           // 印章管理 -  UKEY管理 - 查询UKEY信息

  addUkeyInfo (data) { return post('/ukeyInfo/save', data) },           // 印章管理 -  UKEY管理 - 新增UKEY管理

  getProductList (data) { return post('/productManage/list', data, proBaseURL) },           // 产品管理 -  列表

  getProInfo (data) { return post('/productManage/view', data, proBaseURL) },           // 产品管理 -  详细信息

  getProRiskInfo (data) { return post('/productManage/view/revealbook', data, proBaseURL) },       // 产品管理 - 产品风险揭示书详情

  uploadRiskBook (data) { return post('/productManage/upload/revealbook', data, proBaseURL) },       // 产品管理 - 上传风险揭示书

  submitProduction (data) { return post('/productManage/upload/revealbook/info', data, proBaseURL) },      // 产品管理 - 提交投资者声明

  uploadContract (data) { return post('/productManage/upload', data, proBaseURL) },           // 产品管理 - 上传合同

  contractDoneSubmit (data) { return post('/productManage/contract/handle', data, proBaseURL) },           // 产品管理 - 合同处理提交

  submitLabel (data) { return post('/label/create', data, labelBaseURL) },           // 产品管理 - 提交打标签

  getLabelList (data) { return post('/labelLibrary/list', data, labelBaseURL) },           // 产品管理 -  获取标签列表

  getAllLabelList (data) { return post('/labelLibrary/simple/list', data, labelBaseURL) },           // 产品管理 - 提交打标签

  getGroupLabelList (data) { return post('/labelLibrary/group/list', data, labelBaseURL) },           // 产品管理 - 获取分组文本标签

  submitProManager (data) { return post('/productManage/submit/manager', data, proBaseURL) },           // 产品管理 - 提交管理人

  getViewLabel (data) { return post('/productManage/simulate/sign/pdf', data, proBaseURL) },           // 产品管理 - 预览合成标签文件

  addTextLabel (data) { return post('/labelLibrary/save', data, labelBaseURL) },           // 产品管理 - 标签 - 新增

  changeUsedState (data) { return post('/labelLibrary/used', data, labelBaseURL) },           // 产品管理 - 标签 - 停用/启用

  getContractLabel (data) { return post('/label/list', data, labelBaseURL) },           // 产品管理 - 标签 - 停用/启用

  getMessageList (data) { return post('/ms/list', data, msgBaseURL) },                  //  消息中心 - 消息列表

  markMsgRead (data) { return post('/ms/read', data, msgBaseURL) },                  //  消息中心 - 消息列表

  getMessageNum (data) { return post('/ms/' + util.getStorage('TTD_MANAGE_USERINFO').userId + '/0', data, msgBaseURL) },                   //  未读消息条数

  getManagerBak (data) { return post('/userInfo/childList', data, userBaseUrl) },

  addChildAccount (data) { return post('/userInfo/addChildAccount', data, userBaseUrl) },

  updateChildAccount (data) { return post('/userInfo/updateChildInfo', data, userBaseUrl) },

  getOrgListBak (data) { return post('/organizationStructure/list', data, userBaseUrl) },

  deleteAccountBak (data) { return post('/userInfo/deleteChild', data, userBaseUrl) },

  changeUsedBak (data) { return post('/userInfo/updateChildState', data, userBaseUrl) },

  revisePsdBak (data) { return post('/userInfo/resetChildPassword', data, userBaseUrl) },

  getFileByPage (data) { return post('/oos/transformToImg', data, pdfBaseUrl) },                       //  分页请求合同

  newSql (data) { return post('/synsql/save/sql', data, dataBaseUrl) },                                // SQL同步 - 新增SQL语句

  getNoAsyncList (data) { return post('/synsql/no/syn', data, dataBaseUrl) },                                // SQL同步 -  未同步列表

  getHasAsyncList (data) { return post('/synsql/syn', data, dataBaseUrl) },                                    // SQL同步 - 已同步列表

  batchAsync (data) { return post('/synsql/syn/sql', data, dataBaseUrl) },                                // 同步SQL - 同步

  deleteSql (data) { return post('/synsql/delete/sql', data, dataBaseUrl) },                               // 同步SQL - 删除

  clearCache (data) { return post('/system/refresh/cache', data) },                               // 同步SQL - 删除

  getAgreeList (data) { return post('/suppleManage/list', data, proBaseURL) },                               // 产品管理 - 补充协议列表

  getAgreeInfo (data) { return post('/suppleContract/view', data, proBaseURL) },                               // 产品管理 - 补充协议详情

  uploadAgreeCont (data) { return post('/suppleManage/upload/supplecontract', data, proBaseURL) },            // 产品管理 -  上传补充协议

  getNewContInfo (data) { return post('/suppleManage/view', data, proBaseURL) },                               // 产品管理 - 新合同信息

  uploadNewCont (data) { return post('/suppleManage/upload/newcontract', data, proBaseURL) },                               // 产品管理 - 上传新合同

  riskBookDetail (data) { return post('/suppleManage/view/revealbook', data, proBaseURL) },                               // 产品管理 - 风险揭示书详情

  submitManager (data) { return post('/suppleManage/submit/manager', data, proBaseURL) },                               // 产品管理 - 提交管理人确认

  setRiskLevel (data) { return post('/suppleManage/update/risklevel', data, proBaseURL) },                               // 产品管理 - 新合同设置风险等级

  setProRiskLevel (data) { return post('/productManage/update/risklevel', data, proBaseURL) },                               // 产品管理 - 产品创设设置风险等级

  getVersionList (data) { return post('/versionManage/manage/list', data, proBaseURL) },                               // 产品管理 - 版本管理列表

  getVersionInfo (data) { return post('/versionManage/view/contract/version', data, proBaseURL) },                               // 产品管理 - 版本管理列表详情

  getCurVersionInfo (data) { return post('/versionManage/view/version/detail', data, proBaseURL) },                               // 产品管理 - 版本记录详情

  getLabelTempletList (data) { return post('/labelTemplate/templateList', data, labelBaseURL) },                               // 产品管理 - 标签模板列表

  addTemplet (data) { return post('/labelTemplate/editLableTemplate', data, labelBaseURL) },                               // 产品管理 - 标签模板新增

  getTempletInfo (data) { return post('/labelTemplate/view', data, labelBaseURL) },                               // 产品管理 - 标签模板详情

  uploadTemplateUrl (data) { return post('/labelTemplate/upload/template', data, labelBaseURL) },                               // 产品管理 - 上传模板文件

  getAnnouncementList (data) { return post('/bulletin/manage/list', data, msgBaseURL) },                               // 系统管理 - 公告列表

  newAnnouncement (data) { return post('/bulletin/send/bulletin', data, msgBaseURL) },                               // 系统管理 - 公告 - 新增

  getAnnouncementDetail (data) { return post('/ms/' + data.id, data, msgBaseURL) },                               // 系统管理 - 公告 - 详情

  // 通用文档管理
  getNoticeOrPowList (data) { return post('/universalDocuments/list', data) },                               // 生效告知书列表和套印授权函

  uploadPowFile (data) { return post('/universalDocuments/upload/file', data) },                              // 上传套印授权函文件

  getQuestionnaireList (data) { return post('/question/list', data, questionnaireUrl) },                               // 问卷列表

  getExistEvidenceList (data) { return post('/keepTraceTemplate/list', data, exitBaseUrl) },                               // 存证模板管理

  getEvidTempltList (data) { return post('/code/list', data, exitBaseUrl) },                               // 存证模板管理 - 模糊搜索列表

  newExistEvidence (data) { return post('/keepTraceTemplate/save', data, exitBaseUrl) },                               // 存证模板 - 新增

  getExistEvidenceDetail (data) { return post('/keepTraceTemplate/view', data, exitBaseUrl) },                               // 存证模板 - 详情

  // 存证报告管理
  getEvidReportList (data) { return post('/keepTrace/getApplyList', data, exitBaseUrl) },                               // 存证模板 - 列表

  getEvidReportDetail (data) { return post('/keepTrace/getApplyInfo', data, exitBaseUrl) },                               // 存证模板 - 详情列表

  getPrintDetail (data) { return post('/keepTrace/getTracePdf', data, exitBaseUrl) }                               // 存证模板 - 详情
}
