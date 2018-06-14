<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'app',
    created () {
    }
  }
</script>

<style lang="sass">
  @import "assets/css/element-variables.scss";
</style>

<style lang="less">
  @import "./assets/css/common.less";

  #app {
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: 100%;
    overflow: auto;
  }
</style>
