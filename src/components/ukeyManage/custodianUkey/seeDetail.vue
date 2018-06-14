<!--用户中心右侧模板-->
<template lang="html">
  <div class="page">
    <com-breadcrumb :list="['托管人UKEY管理', '详情']"></com-breadcrumb>
    <div class="right-block">
      <div class="border-line">
        <!--<h4>产品信息</h4>-->
        <el-form class="form-list" label-width="200px" style="width: 700px">
          <el-form-item label="UKEY证书序列号：">
            {{uKeyInfo.serialNo || '--'}}
          </el-form-item>
          <el-form-item label="UKEY类型：">
            {{{1:'法人章', 2:'业务章'}[uKeyInfo.ukeyType]}}
          </el-form-item>
          <el-form-item label="证书持有者：">
            {{uKeyInfo.subscriberName || '--'}}
          </el-form-item>
          <el-form-item label="证件类型：">
            {{formateId(uKeyInfo.identificationType)}}
          </el-form-item>
          <el-form-item label="证件号码：">
            {{uKeyInfo.identificationNo || '--'}}
          </el-form-item>
          <el-form-item label="证书持有机构：">
            {{uKeyInfo.subscriberName || '--'}}
          </el-form-item>
          <el-form-item label="证书颁发机构：">
            {{uKeyInfo.organizationName || '--'}}
          </el-form-item>
          <el-form-item label="起始有效期：">
            {{uKeyInfo.notBefore | date}}
          </el-form-item>
          <el-form-item label="截止有效期：">
            {{uKeyInfo.notAfter | date}}
          </el-form-item>
          <el-form-item label="证书状态：">
            {{{3: '未下载', 4: '已激活', 5: '冻结'}[uKeyInfo.certStatus]}}
          </el-form-item>
        </el-form>
      </div>

      <div class="dialog-footer">
        <el-button @click="$router.back()">返 回</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import { cardType } from '../../../config/index'
  export default {
    data () {
      return {
        ukeyId: '',
        uKeyInfo: {}
      }
    },
    created () {
      this.ukeyId = this.$route.query.ukeyId
      this.getUkeyInfo()
    },
    methods: {
      async getUkeyInfo () {
        let res = await this.$sever.getUkeyInfo({ukeyId: this.ukeyId, sysCode: 'TTD_MANAGE_SYSTEM'})
        switch (res.code) {
          case 0:
            this.uKeyInfo = res.data.bean
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      formateId (type) {
        if (type) {
          return cardType[this.numToStr(type)]
        } else {
          return '--'
        }
      }
    }
  }
</script>
<style>
</style>
<style scoped>
  .right-block{
    padding-top: 1px;
    border-radius: 6px;
    background: #fff;
    min-height: 800px;
    padding: 20px;
  }
  .right-block h4{
    margin-bottom: 6px;
    font-size: 14px;
    color: #000;
    font-weight: bold;
  }
</style>
