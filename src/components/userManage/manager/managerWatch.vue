<template lang="html">
  <div class="page">
    <div class="content-main" style="overflow: hidden">
      <div class="check-result">
        <ul>
          <li>
            <label>机构认证审核结果：</label>
            <span v-if="authInfoList.length" :style="stateColor(authInfoList[0].auditState)">
              <i>{{{0:'待审核',1:'审核失败',2:'待上传',3:'审核通过'}[authInfoList[0].auditState]}}</i>
              <i v-if="authInfoList[0].auditState == 1" style="margin-left: 100px;">审核不通过理由：{{authInfoList[0].auditFailure}}</i>
            </span>
            <span v-else style="color: #333"><i>待上传</i></span>
          </li>
          <li>
            <label>账户认证审核结果：</label>
            <span v-if="manageAccount" :style="stateColor(manageAccount.state)">
              <i>{{{0:'待审核',1:'审核失败',2:'待上传',3:'审核通过'}[manageAccount.state]}}</i>
              <i v-if="manageAccount.state == 1" style="margin-left: 100px;">审核不通过理由：{{manageAccount.auditFailure}}</i>
            </span>
            <span v-else style="color: #333"><i>待上传</i></span>
          </li>
        </ul>
      </div>
      <div class="scroll-view">
        <scroll-bar :maxH="600">
          <div class="con-block">
              <div class="base-info">
                <h4>管理人基本信息：</h4>
                <ul>
                  <li v-for="(item,index) in baseInfoList" :key="index"><label>{{item.materialName}}：</label><span>{{item.materialValue}}</span></li>
                </ul>
              </div>

              <div class="base-info">
                <h4>管理人认证资料：</h4>
                <div class="info-img">
                  <div v-for="(item,index) in authInfoList" :key="index" class="img-block">
                    <div class="img-show" :style="'background: url('+item.materialValue + ')'">
                      <div class="see-cover">
                        <i class="el-icon-search" @click="showBigImg(item.materialValue)"></i>
                      </div>
                    </div>
                    <span>{{item.materialName}}</span>
                  </div>
                </div>
              </div>

              <div class="base-info">
                <h4>管理人账户认证信息：</h4>
                <div class="info-img">
                  <el-form label-width="100px" label-position="left">
                    <el-form-item label="收款金额：">
                      <span class="info-text">{{manageAccount?manageAccount.receiptAmount : '--'}}</span>
                    </el-form-item>
                    <el-form-item label="收款验证码：">
                      <span class="info-text">{{manageAccount?manageAccount.receiptCode : '--'}}</span>
                    </el-form-item>
                    <el-form-item label="账户截屏：">
                      <span class="info-text" v-if="manageAccount" style="display: block; width: 200px;height: 200px"><img style="width: 100%; height: 100%" :src="manageAccount.accountScreenshots"></span>
                      <span v-else>--</span>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
          </div>
        </scroll-bar>
      </div>
      <div class="foot-done" style="text-align: center" type="primary">
        <el-button @click="$emit('removeTag', 'managerWatch')">返 回</el-button>
      </div>
    </div>

    <el-dialog :visible.sync="dialogVisible" size="tiny">
      <img width="100%" :src="imgUrl">
    </el-dialog>


  </div>
</template>

<script>
  export default {
    props: ['userId'],
    data () {
      return {
        dialogVisible: false,
        imgUrl: '',
        baseInfoList: [],

        fileList: [],
        authInfoList: [],
        manageAccount: {}
      }
    },
    created () {
      this.showManagerInfo()
    },
    watch: {
      rejectShow (newVal, oldVal) {
        if (newVal === false) {
          this.submitData.auditFailure = ''
        }
      }
    },
    methods: {
      async showManagerInfo () {
        let res = await this.$sever.showManagerInfo({userId: this.userId, sysCode: 'TTD_MANAGE_SYSTEM'})
        switch (res.code) {
          case 0:
            this.baseInfoList = res.data.bean.baseInfoList
            this.authInfoList = res.data.bean.authInfoList
            this.manageAccount = res.data.bean.manageAccount
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      stateColor (state) {
        return 'color:' + {
          0: '#FF8600',
          1: '#FF553C',
          2: '#333333',
          3: '#29C76C'
        }[state]
      },

      showBigImg (imgUrl) {
        this.imgUrl = imgUrl
        this.dialogVisible = true
      }
    }
  }
</script>
<style lang="css">
  .info-img .el-form-item{
    margin-bottom: 10px;
  }
  .base-info{
    overflow: hidden;
  }
</style>
<style lang="css" scoped>
  .btn-tip p{
    line-height: normal;
    font-size: 14px;
    margin-bottom: 10px;
  }
  .info-img{
    padding: 20px;
    width: 700px;
  }
  .img-show{
    width: 120px;
    height: 120px;
    overflow: hidden;
    border: 1px dashed #ccc;
    position: relative;
  }
  .img-show img{
    width: 100%;
  }
  .img-show:hover .see-cover{
    display: block;
  }
  .see-cover{
    position: absolute;
    background: rgba(0,0,0,0.3);
    z-index: 10;
    width: 100%;
    height: 100%;
    top:0;
    left: 0;
    display: none;
  }
  .see-cover i{
    position: absolute;
    color: #fff;
    bottom: 0px;
    right:0px;
    font-weight: bold;
    font-size: 24px;
    cursor: pointer;
  }
  .con-block{
    overflow: hidden;
    padding: 30px;
  }
  .base-info h4{
    font-size: 16px;
  }
  .base-info ul{
    width: 800px;
    padding: 20px;
    overflow: hidden;
  }
  .base-info ul li{
    font-size: 14px;
    width: 50%;
    float: left;
    line-height: 40px;
  }
  .base-info ul li label{
    display: inline-block;
    width: 140px;
    text-align: right;
  }
  .img-block{
    width: 120px;
    height: 192px;
    float: left;
    padding:10px 20px;
  }
  .img-block span{
    display: block;
    width: 100%;
    text-align: center;
    margin-top: 10px;
    line-height: 20px;
    font-size: 14px;
  }
  .foot-done{
    text-align: center;
    margin: 20px 0;
  }
  .check-result{
    font-size: 14px;
  }
  .check-result ul li{
    line-height: 30px;
  }
</style>

