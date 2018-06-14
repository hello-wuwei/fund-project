<template lang="html">
  <div class="page">
    <com-breadcrumb :list="['管理人管理', '机构审核']"></com-breadcrumb>
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
              <h4>管理人对公账户信息：</h4>
              <ul>
                <li><label>对公账户银行卡号：</label><span>{{manageAccount.relationBank || '--'}}</span></li>
                <li><label>所属银行：</label><span>{{manageAccount.bank || '--'}}</span></li>
                <li><label>开户行：</label><span>{{manageAccount.bankAddress || '--'}}</span></li>
              </ul>
            </div>

            <div class="base-info">
              <h4>管理人认证资料：</h4>
              <div class="info-img">
                <div v-for="(item,index) in authInfoList" :key="index" class="img-block">
                  <div class="img-show" :style="'background: url(' + item.materialValue.url + ')'">
                    <div class="see-cover">
                      <i class="el-icon-search" @click="showBigImg(item.materialValue.url)"></i>
                    </div>
                  </div>
                  <span>{{item.materialName}}</span>
                </div>
              </div>
            </div>
          </div>
        </scroll-bar>
      </div>

      <div class="dialog-footer">
        <el-button @click="$router.back()">返 回</el-button>
        <el-button @click="rejectShow=true">审查不通过</el-button>
        <el-button type="primary" @click="checkYes">审查通过</el-button>
      </div>
    </div>

    <el-dialog title="不通过理由" :visible.sync="rejectShow" width="30%">
      <el-input type="textarea" v-model="submitData.auditFailure" :rows="6"></el-input>
      <div style="margin: 20px 0; text-align: center">
        <el-button @click="rejectShow=false">取 消</el-button>
        <el-button type="primary" @click="checkNo">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="预览" :visible.sync="dialogVisible" size="tiny">
      <img width="100%" :src="imgUrl">
    </el-dialog>


  </div>
</template>

<script>
  export default {
    data () {
      return {
        userId: '',
        dialogVisible: false,
        rejectShow: false,
        imgUrl: '',
        submitData: {
          auditFailure: ''
        },
        baseInfoList: {},
        manageAccount: {},

        fileList: [],
        authInfoList: []
      }
    },
    created () {
      this.userId = this.$route.query.userId
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
            this.baseInfoList = res.data.bean.baseInfoList || []
            this.authInfoList = res.data.bean.authInfoList || []
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
        let obj = {userId: this.userId, sysCode: 'TTD_MANAGE_SYSTEM', auditState: state}
        if (state === '1') {
          obj.auditFailure = this.submitData.auditFailure
        }
        let res = await this.$sever.managerCheckOut(obj)
        switch (res.code) {
          case 0:
            this.$message({message: '提交成功', type: 'success'})
            this.$router.back()
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
<style lang="css">
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
    width: 900px;
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
    width: 160px;
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
  .scroll-view{
    margin: 10px 10px;
  }
</style>

