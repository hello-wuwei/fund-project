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

// 用户管理
import custodian from 'comp/userManage/custodian'
import manager from 'comp/userManage/manager'
import organizationInvestor from 'comp/userManage/organizationInvestor'
import personInvestor from 'comp/userManage/personInvestor'
import userRole from 'comp/userManage/userRole'

// 个人中心
import userHome from 'comp/userCenter/userHome'
import userInfo from 'comp/userCenter/userComps/userRight'
import avator from 'comp/userCenter/userComps/avator'
import changePsd from 'comp/userCenter/userComps/changePsd'
import changeMobile from 'comp/userCenter/userComps/changeMobile'

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

// 证据报告管理
import evidReport from 'comp/evidReportManage/evidReport'

// 404页面
import NotFoundComponent from 'comp/authority/notfoundPage'

import badManager from '@/bad_comp/account'

import managerlist from 'comp/managerClient/managers'

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
      name: '后台管理',
      path: '/',
      component: manageBackstage
    }, {
      name: '后台管理/首页',
      path: 'manageBackstage',
      component: manageBackstage
    }, {
      name: 'B端管理',
      path: 'clientBmanage',
      component: clientBmanage
    }, {
      name: '组织管理',
      path: 'orgManage',
      component: orgManage
    }, {
      name: '角色管理',
      path: 'roleManage',
      component: roleManage
    }, {
      name: '员工管理',
      path: 'systemAccount',
      component: systemAccount
    }, {
      name: '操作日志',
      path: 'operLog',
      component: operLog
    }, {
      name: '参数配置',
      path: 'paramConfig',
      component: paramConfig
    }, {
      name: 'SQL同步',
      path: 'dataAsync',
      component: dataAsync
    }, {
      name: '任务调度',
      path: 'taskSchedule',
      component: taskSchedule
    }, {
      name: '对公账户列表',
      path: 'toPublicAcc',
      component: toPublicAcc
    },

    // 用户管理
    {
      name: '首页',
      path: 'index',
      component: homeIndex
    },

    // 消息中心
    {
      name: '消息中心',
      path: 'message',
      component: messageCenter
    },

    // 用户管理
    {
      name: '托管方',
      path: 'custodian',
      component: custodian
    }, {
      name: '管理人',
      path: 'manager',
      component: manager
    }, {
      name: '用户角色',
      path: 'userRole',
      component: userRole
    }, {
      name: '机构投资者',
      path: 'organizationInvestor',
      component: organizationInvestor
    }, {
      name: '自然人投资者',
      path: 'personInvestor',
      component: personInvestor
    },

    // 印章管理
    {
      name: '管理人印章管理',
      path: 'managerSeal',
      component: managerSeal
    }, {
      name: '托管人印章管理',
      path: 'custodianSeal',
      component: custodianSeal
    }, {
      name: '托管人法人章管理',
      path: 'custodianSealCorp',
      component: custodianSealCorp
    }, {
      name: '管理人法人章管理',
      path: 'managerSealCorp',
      component: managerSealCorp
    }, {
      name: '管理人业务或合同章管理',
      path: 'contractSeal',
      component: contractSeal
    },

    {
      name: '托管人UKEY管理',
      path: 'ukeyManage',
      component: custodianUkey
    },

      // bad component
    {
      name: '管理人管理',
      path: 'managers',
      component: badManager
    },
    // bad component
    {
      name: '管理人列表',
      path: 'managerlist',
      component: managerlist
    },

      // 产品管理
    {
      name: '产品创设',
      path: 'product',
      component: productManage
    }, {
      name: '协议补充',
      path: 'supagree',
      component: suppAgreement
    }, {
      name: '文本标签',
      path: 'textlabel',
      component: textLabel
    }, {
      name: '版本管理',
      path: 'version',
      component: versionManage
    }, {
      name: '标签模板管理',
      path: 'labeltemplet',
      component: labelTemplet
    },

      // 通用文档管理
    {
      name: '风险测评问卷',
      path: 'question',
      component: riskTestQuestion
    }, {
      name: '生效告知书',
      path: 'noticebook',
      component: noticeBook
    }, {
      name: '套印授权函',
      path: 'powbook',
      component: powBook
    },

      // 证据报告管理
    {
      name: '单号查询',
      path: 'evidsearch',
      component: evidReport
    },

      // 个人中心
    {
      path: 'userHome',
      component: userHome,
      children: [{
        name: '个人中心/个人信息',
        path: '/',
        component: userInfo
      }, {
        name: '个人中心/个人信息首页',
        path: 'userInfo',
        component: userInfo
      }, {
        name: '个人中心/修改头像',
        path: 'avator',
        component: avator
      }, {
        name: '个人中心/修改密码',
        path: 'changePsd',
        component: changePsd
      }, {
        name: '个人中心/修改手机',
        path: 'changeMobile',
        component: changeMobile
      }]
    }]
  }
]
export default new Router({
  mode: 'history',
  routes: routes
})
