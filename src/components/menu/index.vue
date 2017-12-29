<template lang="html">
  <transition name="el-zoom-in-center">
    <div class="sidebar-menu-con" :style="{width: width}">
      <el-menu
        v-if="menuList.length"
        :default-active="$route.path"
        background-color="#243A5B"
        text-color="#6589BC"
        active-text-color="#ffffff"
        @select = "handleSelect"
        router
        :collapse="isCollapse">
          <menu-render v-for="item,index in menuList" :children="item" :key="index"></menu-render>
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
        width: '260px',
        defaultActive: ''
      }
    },
    created () {
      let userInfo = this.util.getStorage('TTD_MANAGE_USERINFO')
//      console.log('菜单：', this.util.getStorage('TTD_MANAGE_USERINFO'))
      this.menuList = userInfo.authMap.menuList
    },
    watch: {
      isCollapse (val) {
        this.width = val ? '64px' : '260px'
      }
    },
    computed: {
      ...mapState([
        'isCollapse'
      ])
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
      background-color: #162E50
    }
  }
</style>
