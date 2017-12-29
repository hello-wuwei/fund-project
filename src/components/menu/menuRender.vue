<!--  自调用，循环渲染 menu-->
<template lang="html">
    <el-submenu :index="children.urlAddress"  v-if="children.subList && children.subList.length > 0">
      <template slot="title">
        <icon :icon-class="children.icon"></icon>
        <span>{{children.name}}</span>
      </template>
      <menu-render v-for="(child,index) in children.subList" :children="child" :key="index"></menu-render>
    </el-submenu>
    <el-menu-item v-else :index="children.urlAddress" @click="activeMenu(children)">
      <icon :icon-class="children.icon"></icon>
      <span slot="title">{{children.name}}</span>
    </el-menu-item>
</template>

<script>
  import bus from '../../utils/bus'
  export default {
    name: 'menu-render',
    props: {
      children: {
        default: {}
      }
    },
    methods: {
      getRoute (obj) {
        return {
          title: obj.name,
          path: obj.path
        }
      },
      activeMenu (item) {
        bus.$emit('menuGo', this.$route)
      }
    }
  }
</script>
