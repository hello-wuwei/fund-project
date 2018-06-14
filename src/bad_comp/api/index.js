/**
 * 所有使用的接口配置在这里
 * */
const baseUrl = 'http://139.224.138.105:13811/'
// const baseUrl = 'http://192.168.0.252:8011/'

const prefix = baseUrl + 'ttd-fund-user/'
const prefix2 = baseUrl + 'ttd-fund-product/'
const prefix3 = baseUrl + 'ttd-fund-order/'
const prefix4 = baseUrl + 'ttd-log/'
const msg = baseUrl + 'message-service/'

export default {
  token: 'WQJ24JSDJ',  //  作为放入Storage的key ， 随机字符
  token2: 'SFSFS23RF',
  tabs: 'SFSS2344D',  //  作为放入Storage的key ， 随机字符
  tabs2: 'SFWGL23JJ2',
  tabActive: 'SFJS234D',  //  作为放入Storage的key ， 随机字符
  tabActive2: 'KLKI23FHSHF',
  defaultPass: 'smqy123', // 子账号的重置密码
  localTimestamp: 'KDFJKGY6H2WJ', // 本地维护一个时间戳，当调用请求是跟新，超时就退出系统

  // uploadKey: '1008',
  // uploadKey: 'LTAIrPcIm2GdY9sP ',  // accessKeyId
  // uploadSecret: 'k1DfqschMpT2LFR8ssYXGU4zCzbnYC', // accessKeySecret

  uploadUrl: baseUrl + 'zuul/file-service/oos/uploadFile',
  socket: 'http://139.224.138.105:13108/ms-websocket/',
  msg: msg,
  getMessage: msg + 'ms/list',
  messageRead: msg + 'ms/read',
  // 获取图片验证码
  getCodeImg: prefix + 'kaptcha/getKaptchaImage',
  checkCodeImg: prefix + 'kaptcha/varifyKaptcha',
  // author/materialList
  materialList: prefix + 'author/materialList',
  // 鉴权部分
  login: prefix + 'userInfo/login',
  getCode: prefix + 'organizationStructure/sendValidationSms',
  manageRegister: prefix + 'userInfo/managerRegister',
  findPassword: prefix + 'userInfo/findPasswrod',
  authentication: prefix + 'userAuthorMaterial/edit',
  authenticationList: prefix + '/userAuthorMaterial/list',
  // 添加对公账户认证信息
  accountAuthor: prefix + 'manageAccountAuthor/author',

  // userCenter
  updateAvatar: prefix + 'userInfo/updateAvatar',
  modifyPassword: prefix + 'userInfo/updatePassword',
  updateMobile: prefix + 'userInfo/updateMobile',
  updateUserName: prefix + 'userInfo/updateUserName',

  // 获得导航菜单
  getMenus: prefix + '/sysSources/sourcesTree',

  // 组织管理
  orga: {
    list: prefix + 'organizationStructure/list',
    update: prefix + '/organizationStructure/update',
    add: prefix + '/organizationStructure/add',
    remove: prefix + '/organizationStructure/delete'
  },
  // 角色管理
  role: {
    list: prefix + '/role/list',
    remove: prefix + 'role/deleteRole',
    update: prefix + 'role/edit',
    enable: prefix + '/role/stopOrEnabledRole',
    setRole: prefix + '/userRole/setUserRole',
    roleInfo: prefix + 'role/roleDetail',
    permission: prefix + 'roleSource/roleSourcesTree',
    detail: prefix + 'role/roleDetail',
    updateRole: prefix + 'roleSource/editRoleSources'
  },
  // 账号管理
  account: {
    add: prefix + '/userInfo/addChildAccount',
    update: prefix + 'userInfo/updateChildInfo',
    list: prefix + 'userInfo/childList',
    roleList: prefix + 'role/subUserRolelist',
    enable: prefix + 'userInfo/updateChildState',
    remove: prefix + 'userInfo/deleteChild',
    setAppRole: prefix + '/userRole/setUserAppRole',
    resetPassword: prefix + 'userInfo/resetChildPassword'
  },
  // 托管方
  trustee: {
    list: prefix + '/relation/depositlist',
    relevant: prefix + '/relation/depositManagerRelation'
  },
  // 参数管理
  options: {
    list: prefix + '/parm/list',
    update: prefix + 'parm/updateParm',
    state: prefix + 'parm/updateParmState'
  },
  /* 用户管理 */
  // 基金管理人 管理
  manager: {
    list: prefix + '/relation/manageList'
  },
  // 投资者管理
  investor: {
    list: prefix + 'relation/manageInvenstemList',
    // 接口作废，改用投资者APP里的接口 许调用2个接口（基本信息，认证信息上）
    // getPersonalInfo: prefix + '/relation/manageGetInvenstemdetails',
    getPersonalInfo: prefix + '/personalInvenstem/getBaseInfo',
    getOrgInfo: prefix + 'orgInvenstem/getBaseInfo',
    getAuditInfo: prefix + 'userAuthorMaterial/invenstemAuthorMaterialList',
    auditConversion: prefix + '/relation/manageUpdateTypeConversionState',
    auditState: prefix + 'relation/manageUpdateInfoChangeState'
  },
  // 订单管理
  order: {
    list: prefix3 + 'order/list',
    productOrder: prefix2 + 'productInfo/order/list',
    productOrderDetail: prefix3 + 'contract/list',
    detail: prefix3 + 'order/detail',
    audit: prefix3 + 'order/subscribe/verify',
    auditAdd: prefix3 + '/order/add/verify',
    auditRemit: prefix3 + 'order/maerial/verify',
    confirm: prefix3 + '/order/cancel/get',
    cancel: prefix3 + 'order/admin/cancel'
  },
  product: {
    trustee: {
      list: prefix2 + '/productInfo/list',
      update: prefix2 + 'productInfo/save',
      detail: prefix2 + 'productInfo/view'
    },
    wait: {
      list: prefix2 + '/productIssued/wait/sale/list',
      update: prefix2 + 'productIssued/complete/issued'
    },
    sell: {
      list: prefix2 + '/productIssued/saling/list',
      detail: prefix2 + '/productIssued/view'
    }
  },
  record: {
    detail: prefix3 + 'video/list'
  },
  // 组织机构列表梳理
  orglist: prefix + '/orgTable/list',
  // 查询经办人的省份证，（查看双录需要）
  getIdCard: prefix + 'userInfo/getInvenstorIdCard',

  // 印章密码
  digitPasswrod: {
    get: prefix + 'seal/getSealPasswordById',
    set: prefix + '/seal/setSealPassword'
  },
  getExcelUser: prefix + 'export/userInfoToExcel',
  logs: prefix4 + 'log/list',
  userInfo: prefix + 'userInfo/refreshUser'
}
