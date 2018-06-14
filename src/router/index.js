import Vue from 'vue'
import Router from 'vue-router'

// 登录注册
import Login from 'comp/authority/login'
import RevisePassword from 'comp/authority/revisePassword'
import Register from 'comp/authority/register'

import Home from '@/pages/home'
import Index from '@/pages'
import homeIndex from 'comp/homeIndex/index'

// 消息中心
import messageCenter from 'comp/messageCenter/message'

// 系统管理
import manageBackstage from 'comp/systemManage/manageBackstage'
import clientBmanage from 'comp/systemManage/clientBmanage'
import orgManage from 'comp/systemManage/orgManage'
import roleManage from 'comp/systemManage/roleManage'
import systemAccount from 'comp/systemManage/systemAccount'
import operLog from 'comp/systemManage/operLog'
import paramConfig from 'comp/systemManage/paramConfig'
import dataAsync from 'comp/systemManage/dataAsync'
import taskSchedule from 'comp/systemManage/taskSchedule'
import toPublicAcc from 'comp/systemManage/toPublicAcc'
import announcement from 'comp/systemManage/announcement'

// 用户管理
import custodian from 'comp/userManage/custodian'
import manager from 'comp/userManage/manager'
import userRole from 'comp/userManage/userRole'

// 个人中心
import userHome from 'comp/userCenter/userHome'

// 签章管理
import managerSeal from 'comp/sealManage/managerSeal'
import custodianSeal from 'comp/sealManage/custodianSeal'
import custodianSealCorp from 'comp/sealManage/custodianSealCorp'
import managerSealCorp from 'comp/sealManage/managerSealCorp'
import contractSeal from 'comp/sealManage/contractSeal'

// UKEY管理
import custodianUkey from 'comp/uKeyManage/custodianUkey'

// 产品管理
import productManage from 'comp/productManage/productManage'
import suppAgreement from 'comp/productManage/suppAgreement'
import textLabel from 'comp/productManage/textLabel'
import versionManage from 'comp/productManage/versionManage'
import labelTemplet from 'comp/productManage/labelTemplet'

// 通用文档管理
import riskTestQuestion from 'comp/univerDocManage/riskTestQuestion'
import noticeBook from 'comp/univerDocManage/noticeBook'
import powBook from 'comp/univerDocManage/powBook'
import existevidence from 'comp/univerDocManage/existEvidence'

// 证据报告管理
import evidReport from 'comp/evidReportManage/evidReport'

// 404页面
import NotFoundComponent from 'comp/authority/notfoundPage'

import badManager from '@/bad_comp/account'

import managerlist from 'comp/managerClient/managers'

import SysRoleManage from './childrenRouter/sys_role_manage'    // 角色管理
import SysBackManage from './childrenRouter/sys_back_manage'    // 后台管理
import SysPortbManage from './childrenRouter/sys_portb_manage'  // B端管理
import SysAccountManage from './childrenRouter/sys_account_manage'  // 员工管理
import SysOperaLog from './childrenRouter/sys_opera_log'  // 操作日志
import SysParamConfig from './childrenRouter/sys_param_config'  // 参数配置
import SysSqlAsync from './childrenRouter/sys_sql_async'  // 参数配置
import SysTaskSchedule from './childrenRouter/sys_task_schedule'  // 任务调度
import SysPubaccountManage from './childrenRouter/sys_pubaccount_manage'  // 对公账户管理
import SysAnnouncement from './childrenRouter/sys_announcement'  // 公告发布

// 用户管理
import UserTrust from './childrenRouter/user_trust'  // 托管人
import UserManager from './childrenRouter/user_manager'  // 管理人
import UserRole from './childrenRouter/user_role'  // 角色管理

// 印章管理
import SealManager from './childrenRouter/seal_manager'  // 管理人公章管理
import SealTrust from './childrenRouter/seal_trust'  // 托管人公章管理
import SealManagerCorp from './childrenRouter/seal_manager_corp'  // 管理人法人章管理
import SealTrustCorp from './childrenRouter/seal_trust_corp'  // 托管人法人章管理
import SealManagerContract from './childrenRouter/seal_manager_contract'  // 管理人合同章管理

// 产品创设
import ProdCreate from './childrenRouter/prod_create'  // 产品创设
import ProdSuppagree from './childrenRouter/prod_suppagree'  // 补充协议
import ProdLabel from './childrenRouter/prod_label'  // 文本标签
import ProdVersionManage from './childrenRouter/prod_version_manage'  // 版本管理
import ProdTempletLabel from './childrenRouter/prod_templet_label'  // 模板标签

// UKEY管理
import UkeyTrustManage from './childrenRouter/ukey_trust_manage'  // UKEY管理

// 通用文档管理
import ComdocQuestion from './childrenRouter/comdoc_question'  // 风险测评问卷
import ComdocNoticebook from './childrenRouter/comdoc_noticebook'  // 生效告知书
import ComdocPowbook from './childrenRouter/comdoc_powbook'  // 套印授权函
import ComdocExistevidence from './childrenRouter/comdoc_existevidence'  // 存证模板管理

import PersonalCenter from './childrenRouter/personal_center'  // 个人中心

import MsgCenter from './childrenRouter/msg_center'  // 消息中心

import EvidreportEvidmanage from './childrenRouter/evidreport_evidmanage'  // 证据管理

Vue.use(Router)
const routes = [
  {
    path: '*',
    component: NotFoundComponent },
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: Index
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/revise_password',
    component: RevisePassword
  },
  {
    path: '/home',
    component: Home,
    children: [{
      path: '/',
      component: manageBackstage,
      children: SysBackManage
    }, {
      path: 'manageBackstage',
      component: manageBackstage,
      children: SysBackManage
    }, {
      path: 'clientBmanage',
      component: clientBmanage,
      children: SysPortbManage
    }, {
      path: 'orgManage',
      component: orgManage
    }, {
      path: 'roleManage',
      component: roleManage,
      children: SysRoleManage
    }, {
      path: 'systemAccount',
      component: systemAccount,
      children: SysAccountManage
    }, {
      path: 'operLog',
      component: operLog,
      children: SysOperaLog
    }, {
      path: 'paramConfig',
      component: paramConfig,
      children: SysParamConfig
    }, {
      path: 'dataAsync',
      component: dataAsync,
      children: SysSqlAsync
    }, {
      path: 'taskSchedule',
      component: taskSchedule,
      children: SysTaskSchedule
    }, {
      path: 'toPublicAcc',
      component: toPublicAcc,
      children: SysPubaccountManage
    }, {
      path: 'announcement',
      component: announcement,
      children: SysAnnouncement
    },

    // 用户管理
    {
      path: 'index',
      component: homeIndex,
      meta: {moudlename: '首页'}
    },

    // 消息中心
    {
      path: 'message',
      component: messageCenter,
      children: MsgCenter
    },

    // 用户管理
    {
      path: 'custodian',
      component: custodian,
      children: UserTrust
    }, {
      path: 'manager',
      component: manager,
      children: UserManager
    }, {
      path: 'userRole',
      component: userRole,
      children: UserRole
    },

    // 印章管理
    {
      path: 'managerSeal',
      component: managerSeal,
      children: SealManager
    }, {
      path: 'custodianSeal',
      component: custodianSeal,
      children: SealTrust
    }, {
      path: 'custodianSealCorp',
      component: custodianSealCorp,
      children: SealTrustCorp
    }, {
      path: 'managerSealCorp',
      component: managerSealCorp,
      children: SealManagerCorp
    }, {
      path: 'contractSeal',
      component: contractSeal,
      children: SealManagerContract
    },

    {
      path: 'ukeyManage',
      component: custodianUkey,
      children: UkeyTrustManage
    },

      // bad component
    {
      path: 'managers',
      component: badManager
    },
    // bad component
    {
      path: 'managerlist',
      component: managerlist
    },

      // 产品管理
    {
      path: 'product',
      component: productManage,
      children: ProdCreate
    }, {
      path: 'supagree',
      component: suppAgreement,
      children: ProdSuppagree
    }, {
      path: 'textlabel',
      component: textLabel,
      children: ProdLabel
    }, {
      path: 'version',
      component: versionManage,
      children: ProdVersionManage
    }, {
      path: 'labeltemplet',
      component: labelTemplet,
      children: ProdTempletLabel
    },

      // 通用文档管理
    {
      path: 'question',
      component: riskTestQuestion,
      children: ComdocQuestion
    }, {
      path: 'noticebook',
      component: noticeBook,
      children: ComdocNoticebook
    }, {
      path: 'powbook',
      component: powBook,
      children: ComdocPowbook
    }, {
      path: 'existevidence',
      component: existevidence,
      children: ComdocExistevidence
    },

      // 证据报告管理
    {
      path: 'evidsearch',
      component: evidReport,
      children: EvidreportEvidmanage
    },

      // 个人中心
    {
      path: 'userHome',
      component: userHome,
      children: PersonalCenter
    }]
  }
]
export default new Router({
  mode: 'history',
  routes: routes
})
