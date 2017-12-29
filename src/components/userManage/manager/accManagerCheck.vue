<template lang="html">
  <div class="page">
    <div class="content-main" style="overflow: hidden">

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
              <h4>管理人账户认证信息：</h4>
              <div class="info-img">
                <el-form label-width="100px" label-position="left">
                  <el-form-item label="收款金额：">
                    <span class="info-text">{{manageAccount.receiptAmount || '--'}}</span>
                  </el-form-item>
                  <el-form-item label="收款验证码：">
                    <span class="info-text">{{manageAccount.receiptCode || '--'}}</span>
                  </el-form-item>
                  <el-form-item label="账户截屏：">
                    <span class="info-text" v-if="manageAccount.accountScreenshots" style="display: block; width: 200px;height: 200px"><img style="width: 100%; height: 100%" :src="manageAccount.accountScreenshots"></span>
                    <span v-else>--</span>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>

        </scroll-bar>
      </div>

      <div class="foot-done" style="text-align: center" type="primary">
        <el-button type="primary" @click="checkYes">审查通过</el-button>
        <el-button @click="rejectShow=true">审查不通过</el-button>
        <el-button @click="$emit('removeTag', 'accManagerCheck')">返 回</el-button>
      </div>
    </div>

    <el-dialog title="不通过理由" :visible.sync="rejectShow" width="30%">
      <el-input type="textarea" v-model="submitData.auditFailure" :rows="6"></el-input>
      <div style="margin: 20px 0; text-align: center">
        <el-button type="primary" @click="checkNo">确 定</el-button>
        <el-button @click="rejectShow=false">取 消</el-button>
      </div>
    </el-dialog>

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
        rejectShow: false,
        imgUrl: '',
        submitData: {
          auditFailure: ''
        },
        baseInfoList: {},

        fileList: [],
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
            this.manageAccount = res.data.bean.manageAccount
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      // 审查通过
      checkYes () {
        this.$confirm('确定通过对该机构的审查吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.submitState('3')
        }).catch(() => {
        })
      },

      async submitState (state) {
        let obj = {accountId: this.manageAccount.accountId, sysCode: 'TTD_MANAGE_SYSTEM', state: state}
        if (state === '1') {
          obj.auditFailure = this.submitData.auditFailure
        }
        let res = await this.$sever.accountCheck(obj)
        switch (res.code) {
          case 0:
            this.$message({message: '提交成功', type: 'success'})
            this.$emit('removeTag', 'accManagerCheck')
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      checkNo () {
        if (this.submitData.auditFailure === '') {
          this.$message({message: '请输入不通过原因', type: 'warning'})
          return
        }
        this.submitState('1')
      },

      showBigImg (imgUrl) {
        this.imgUrl = imgUrl
        this.dialogVisible = true
      }
    }
  }
</script>
<style>
  .info-img .el-form-item{
    margin-bottom: 10px;
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
    float: left;
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
    float: left;
    padding:10px 20px;
  }
  .img-block span{
    display: block;
    width: 100%;
    text-align: center;
    line-height: 40px;
    font-size: 14px;
  }
  .foot-done{
    text-align: center;
    margin: 20px 0;
  }
</style>

