<template lang="html">
  <transition name="el-zoom-in-center">
    <div class="sidebar-menu-con" :style="{width: width}">
      <el-menu
        v-if="menuList.length"
        :default-active="activePath"
        background-color="#243A5B"
        text-color="#6589BC"
        active-text-color="#ffffff"
        @select = "handleSelect"
        :unique-opened="true"
        router
        :collapse="isCollapse">
          <menu-render v-for="item,index in menuList" :children="item" :rootIndex="index.toString()" :key="index"></menu-render>
      </el-menu>
      <div v-else style="color:#fff; text-align: center;line-height: 60px">账号未授权</div>
    </div>
  </transition>
</template>
<script>
  import {mapState} from 'vuex'
  import MenuRender from './menuRender'
//  import MenuList from '../../data_config/mune_list'

  export default {
    components: {
      MenuRender
    },
    data () {
      return {
        menuList: [],
        width: '220px',
        defaultActive: ''
      }
    },
    created () {
      let userInfo = this.util.getStorageUserInfo()
//      console.log('菜单：', this.util.getStorage('TTD_MANAGE_USERINFO'))
      this.menuList = Object.keys(userInfo).length ? userInfo.authMap.menuList : []
    },
    watch: {
      isCollapse (val) {
        this.width = val ? '64px' : '220px'
      }
    },
    computed: {
      ...mapState([
        'isCollapse',
        'userInfo'
      ]),
      activePath () {
        let pathArry = this.$route.path.split('/')
        return '/' + pathArry[1] + '/' + pathArry[2]
      }
    },
    methods: {
      handleSelect (key, keyPath, node) {
//        this.util.addStorage('activePath', {path: key})
      }
    }
  }
</script>
<style type="text/less" lang="less">
  .sidebar-menu-con{
    height: 100%;
    background-color: #243A5B;

    .el-menu{
      border-right: none 0;
    }
    .is-opened{
      background-color: #162E50;
      color:#fff
    }
  }
  .el-submenu.is-active > .el-submenu__title{
    color: #fff !important;
  }

  .el-submenu.is-opened li{
    background: #162E50 !important;
  }
  .el-submenu.is-opened .el-submenu__title{
    background: #162E50 !important;
  }

  .sidebar-menu-con > ul.el-menu > li > .el-submenu__title{
    font-size: 16px;
  }
  .sidebar-menu-con > ul.el-menu > li.el-menu-item{
    font-size: 16px;
  }
  .sidebar-menu-con > ul > li > ul > li .el-submenu__title{
    height: 36px;
    line-height: 36px;
  }
  .sidebar-menu-con > ul > li > ul .el-menu-item{
    height: 36px;
    line-height: 36px;
  }
  .el-submenu__title i{
    color: #6589BC;
  }
  .el-submenu.is-active > .el-submenu__title i{
    color: #fff;
  }
</style>
