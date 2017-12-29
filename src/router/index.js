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

// 产品管理
import productManage from 'comp/productManage/productManage'

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
      name: '系统账号',
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
      name: '产品管理',
      path: 'product',
      component: productManage
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
