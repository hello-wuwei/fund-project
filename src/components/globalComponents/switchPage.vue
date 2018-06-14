<template lang="html">
  <div class="switch-page">
    <el-button size="mini" @click="switchPage('prev')"><i class="el-icon-caret-left"></i></el-button>
    <el-button size="mini" @click="switchPage('next')"><i class="el-icon-caret-right"></i></el-button>
    <span style="margin-left: 10px;">{{page}}/{{numPages}}</span>
    <span style="margin-left: 6px">跳转至<el-input v-model.number="itemPage" style="width: 50px;margin: 0 4px" size="mini" @keyup.native.enter="goPage"></el-input>页</span>
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
    margin: 0;
    padding: 0;
    overflow: auto;
  }
  .switch-page button{
    font-size: 16px;
    padding: 6px !important;
  }
</style>

