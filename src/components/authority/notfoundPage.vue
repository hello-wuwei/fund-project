<template>
  <div class="not-page">
    <img :src="notPage">
  </div>
</template>
<script>
  export default {
    data () {
      return {
        notPage: require('../../assets/images/notfound.png')
      }
    }
  }
</script>
<style type="text/less" lang="less" type="text/less">
  .not-page{
    text-align: center;
    height: 100%;
    position: relative;
  }
  .not-page img{
    position: absolute;
    display: inline-block;
    width: 434px;
    height: 406px;
    top: 50%;
    left: 50%;
    margin-top: -250px;
    margin-left: -217px;
  }
</style>
