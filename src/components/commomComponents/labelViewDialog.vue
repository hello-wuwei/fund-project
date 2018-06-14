<!--用户中心右侧模板-->
<template lang="html">
  <div class="pdf-view-block">
    <el-dialog title="预 览" :visible.sync="isView" width="1200px">
      <switch-view-page :view="isView" @page="page = $event" :numPages="numPages"></switch-view-page>
      <div class="white-area">
        <i class="el-icon-close" @click="$emit('closeView', false)"></i>
        <!--<h4 style="text-align: center">{{fileName}}</h4>-->
        <div class="pdf-area">
          <pdf-view :src="src" :page="page" @numPages="numPages = $event">
            <label-make :isclose="false" :labelViewData="labelViewData" :page="page" @numPages="numPages = $event"></label-make>
          </pdf-view>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import switchViewPage from '../globalComponents/switchViewPage.vue'
  export default {
    props: {
      isView: {
        type: [Boolean],
        default: false
      },
      src: {
        type: [String]
      },
      labelViewData: {
        type: [Object, Array]
      },
      fileName: {
        type: [String]
      }
    },
    data () {
      return {
        page: 1,
        numPages: 0
      }
    },
    components: {
      switchViewPage
    },
    watch: {
      isView (boolean) {
        if (boolean === false) {
          this.page = 1
        }
      }
    }
  }
</script>
<style>
  .pdf-view-block .el-dialog__body{
    padding-top: 0;
  }
  .pdf-view-block .el-dialog{
    background: none !important;
    box-shadow: none;
  }
  .pdf-view-block .el-dialog__header{
    display: none;
  }
  .pdf-view-block .label-view{
    border: none !important;
  }
</style>
<style scoped>
  .white-area{
    position: relative;
    margin: 0 auto;
    width:918px;
    height: 720px;
    background: #fff
  }
  .white-area i{
    color: #fff;
    position: absolute;
    right: -30px;
    top: -30px;
    display: block;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    cursor: pointer;
  }
  .pdf-area{
    width: 918px;
    height: 650px;
    border-bottom: 2px solid #ccc;
    overflow-y: scroll;
    margin: 0 auto
  }
</style>
