<template>
  <div class="bread-crumb">
    <div class="text">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <!--<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>-->
        <el-breadcrumb-item v-for="(item, index) in list" :key="index">{{item}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>
<style scoped>
  .bread-crumb{
    position: relative;
    padding: 20px;
    background: #fff;
  }
  .bread-crumb:after{
    content: '';
    position: absolute;
    left: 20px;
    right:20px;
    border-bottom: 1px solid #ccc;
    bottom: 0;
  }
  .text{
    border-left: 2px solid #649bf9;
    padding-left: 15px
  }
</style>
<script>
  export default {
    props: {
      list: {
        type: [Array]
      }
    },
    data () {
      return {
      }
    }
  }
</script>
