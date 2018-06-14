<template lang="html">
  <div class="switch-page">
    <!--<el-button type="primary" size="mini" @click="switchPage('prev')">上一页</el-button>-->
    <!--<el-button type="primary" size="mini" @click="switchPage('next')">下一页</el-button>-->
    <div class="switch-btn">
      <div class="btn-page left-page" @click="switchPage('prev')"><i class="el-icon-arrow-left" ></i></div>
      <div class="btn-page right-page" @click="switchPage('next')"><i class="el-icon-arrow-right"></i></div>
    </div>
    <div class="jump-page">
      <span style="margin-right: 2px">{{page}}/{{numPages}}</span>
      <span>跳转至<el-input v-model.number="itemPage" style="width: 50px;margin: 0 4px" size="mini" @keyup.native.enter="goPage"></el-input>页</span>
    </div>

  </div>
</template>

<script>
  export default {
    props: {
      numPages: {
        type: [Number, String]
      },
      view: {
        type: [Boolean],
        default: false
      }
    },
    data () {
      return {
        page: 1,
        itemPage: ''
      }
    },
    created () {
    },
    watch: {
      itemPage (val) {
        if (val < 1) {
          this.itemPage = 1
        }
      },
      view (bool) {
        if (!bool) {
          this.page = 1
        }
      }
    },
    methods: {
      switchPage (str) {
        if (str === 'prev') {
          if (this.page === 1) {
            return
          }
          this.page--
        }
        if (str === 'next') {
          if (this.page === this.numPages) {
            this.$message({message: '当前已是最后一页', type: 'warning'})
            return
          }
          this.page++
        }
        this.$emit('page', this.page)
      },
      goPage () {
        if (this.itemPage > 0) {
          if (this.itemPage >= this.numPages) {
            this.page = this.numPages
            this.itemPage = this.page
          } else {
            this.page = this.itemPage
          }
          this.$emit('page', this.page)
        }
      }
    }
  }
</script>
<style lang="css">
</style>
<style lang="css" scoped>
  .switch-page{
    position: relative;
    margin: 0;
    padding: 0;
    overflow: inherit;
  }
  .switch-page .switch-btn{
    position: absolute;
    top: 300px;
    width: 100%;
    color: #fff;
    font-size: 40px
  }
  .switch-btn .btn-page{
    width: 74px;
    height: 130px;
    text-align: center;
    line-height: 130px;
    background: rgba(255, 255, 255, 0.2);
    cursor: pointer;
  }
  .switch-btn .btn-page:hover{
    background: rgba(255, 255, 255, 0.5);
  }
  .switch-btn .left-page{
    float: left;
  }
  .switch-btn .right-page{
    float: right;
  }
  .jump-page{
    position: absolute;
    top: 670px;
    right: 140px;
    z-index: 10;
  }
</style>

