/**
 * Created by Administrator on 2017/11/3.
 */
let munelist = [{
  name: '系统管理',
  icon: 'el-icon-menu',
  path: '1',
  children: [{
    name: '资源管理',
    icon: 'el-icon-menu',
    path: '1-1',
    children: [{
      name: '后台管理',
      icon: 'el-icon-menu',
      path: '/home/manageBackstage'
    }, {
      name: 'B端管理',
      icon: 'el-icon-menu',
      path: '/home/clientBmanage'
    }]
  }, {
    name: '组织管理',
    icon: 'el-icon-menu',
    path: '/home/orgManage',
    children: []
  }, {
    name: '角色管理',
    icon: 'el-icon-menu',
    path: '/home/roleManage',
    children: []
  }, {
    name: '系统账号',
    icon: 'el-icon-menu',
    path: '/home/systemAccount',
    children: []
  }, {
    name: '操作日志',
    icon: 'el-icon-menu',
    path: '/home/operLog',
    children: []
  }, {
    name: '参数配置',
    icon: 'el-icon-menu',
    path: '/home/paramConfig',
    children: []
  }]

}, {
  name: '用户管理',
  icon: 'el-icon-menu',
  path: '2',
  children: [{
    name: '托管方',
    icon: 'el-icon-menu',
    path: '/home/custodian',
    children: []
  }, {
    name: '管理人',
    icon: 'el-icon-menu',
    path: '/home/manager',
    children: []
  }, {
    name: '用户角色',
    icon: 'el-icon-menu',
    path: '/home/userRole',
    children: []
  }, {
    name: '投资者',
    icon: 'el-icon-menu',
    path: '2-3',
    children: [{
      name: '机构投资者',
      icon: 'el-icon-menu',
      path: '/home/organizationInvestor'
    }, {
      name: '自然人投资者',
      icon: 'el-icon-menu',
      path: '/home/personInvestor'
    }]
  }]
}]

export default munelist
