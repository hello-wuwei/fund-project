<!--  自调用，循环渲染 menu-->
<template lang="html">
    <el-submenu :index="rootIndex"  v-if="children.subList && children.subList.length > 0">
      <template slot="title">
        <icon :icon-class="children.icon"></icon>
        <span>{{children.name}}</span>
      </template>
      <menu-render v-for="(child,index) in children.subList" :children="child" :key="index" :rootIndex="rootIndex + '-' + index"></menu-render>
    </el-submenu>
    <el-menu-item v-else :index="children.urlAddress">
      <icon :icon-class="children.icon"></icon>
      <span slot="title">{{children.name}}</span>
    </el-menu-item>
</template>

<script>
  export default {
    name: 'menu-render',
    props: {
      children: {
        type: Object
      },
      rootIndex: {
        type: String
      }
    },
    methods: {
      getRoute (obj) {
        return {
          title: obj.name,
          path: obj.path
        }
      }
    }
  }
</script>
