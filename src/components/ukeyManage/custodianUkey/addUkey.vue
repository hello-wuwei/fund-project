<!--用户中心右侧模板-->
<template lang="html">
  <div class="page">
    <com-breadcrumb :list="['托管人UKEY管理', '新增UKEY']"></com-breadcrumb>
    <div class="right-block">
      <div class="border-line">
        <div style="display: none">
          <!--<OBJECT id="XACAtlCtrl" name="XACAtlCtrl" width="0" height="0" classid="CLSID:57618A3D-7655-4C46-83B5-6FAAF215F458" hidden="true" ></OBJECT>-->
          <input type="submit" value="获取UKEY序列号" name="generate" @click="getKeyNo()">
          <input name="UkeySN" type="input" id="UkeySN">
        </div>
        <div style="display: none">
          <div class="plaintext">持有者: <input type="text" id="SubjectDN" style="width: 120px" /></div>
          <div class="plaintext">颁发者: <input type="text" id="IssuerDN" style="width: 120px" /></div>
          <div class="plaintext">序列号: <input type="text" id="CertSN" style="width: 120px" /></div>
        </div>
        <el-form :model="submitData" ref="ruleForm" :rules="rules" label-width="200px" style="width: 700px">
          <div class="input-list">
            <el-form-item label="UKEY证书序列号：" prop="serialNo">
              <el-input v-model="submitData.serialNo" placeholder="请选择UKEY证书序列号" size="small" style="width: 240px"></el-input>
              <el-button type="primary" size="mini" @click="readyUkey">读取UKEY</el-button>
            </el-form-item>
            <el-form-item label="UKEY编号：" prop="ukeyCode">
              <el-input v-model="submitData.ukeyCode" placeholder="请选择UKEY编号" size="small" style="width: 240px"></el-input>
            </el-form-item>
            <el-form-item label="UKEY类型：" prop="ukeyType">
              <el-select v-model="submitData.ukeyType" placeholder="请选择UKEY类型" size="small">
                <el-option label="法人章" value="1"></el-option>
                <el-option label="业务章" value="2"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="form-list" v-if="Object.keys(this.uKeyInfo).length">
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
              {{getOrgName(uKeyInfo.subjectDn)}}
            </el-form-item>
            <el-form-item label="起始有效期：">
              {{formateDate(uKeyInfo.notBefore)}}
            </el-form-item>
            <el-form-item label="截止有效期：">
              {{formateDate(uKeyInfo.notAfter)}}
            </el-form-item>
            <el-form-item label="证书状态：">
              {{{3: '未下载', 4: '已激活', 5: '冻结'}[uKeyInfo.certStatus]}}
            </el-form-item>
          </div>
        </el-form>
      </div>

      <div class="dialog-footer">
        <el-button @click="$router.back()">返 回</el-button>
        <el-button @click="submitForm('ruleForm')" type="primary">提 交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import * as signCert from '../../../utils/sign_api'
  import { cardType } from '../../../config/index'
  export default {
    data () {
      return {
        submitData: {
          sysCode: 'TTD_MANAGE_SYSTEM',
          xACAtlCtrl: null,
          serialNo: '',
          ukeyType: '',
          ukeyCode: '',
          serialInfo: '',
          ukeyId: ''
        },

        uKeyInfo: {},

        rules: {
          serialNo: [
            {required: true, message: '请输入证书序列号', trigger: 'blur'}
          ],
          ukeyType: [
            {required: true, message: '请选择UKEY类型', trigger: 'change'}
          ],
          ukeyCode: [
            {required: true, message: '请输入UKEY编号', trigger: 'blur'}
          ]
        }
      }
    },
    created () {
//      console.log(signCert)
    },
    mounted () {
      signCert.OnLoad()
//      this.xACAtlCtrl = document.getElementById('XACAtlCtrl')
//      console.log(this.xACAtlCtrl)
    },
    watch: {
      'submitData.serialNo' (val) {
        this.queryUkeyInfo()
      }
    },
    methods: {
//      getKeyNo () {
//        let sn = this.xACAtlCtrl.GetUkeySN()
//        alert('sv = ' + sn)
//      },

      readyUkey () {
        this.submitData.serialNo = signCert.GetSignCertInfo().SerialNumber || ''
//        this.submitData.ukeyCode = signCert.GetSignCertInfo().GetUkeySN
      },

      async queryUkeyInfo () {
        this.uKeyInfo = {}
        let vm = this
        let jsonData = {
          source: 'TCMP',    // 系统标识
          msgBody: {
            serialNo: vm.submitData.serialNo // 证书序列号
          }
        }
        let res = await this.$sever.queryUkeyInfo({jsonData: JSON.stringify(jsonData), sysCode: 'TTD_MANAGE_SYSTEM'})
        switch (res.code) {
          case 0:
            if (res.data.bean.code === '2000') {
              this.uKeyInfo = res.data.bean.certlist[0]
            } else {
//              this.$message({message: res.data.bean.message, type: 'warning'})
            }
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      // 验证表单
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addUkeyInfo()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },

      async addUkeyInfo () {
        if (!Object.keys(this.uKeyInfo).length) {
          this.$message({message: '证书信息不完整，无法提交', type: 'warning'})
          return
        }
        this.submitData.serialInfo = JSON.stringify(this.uKeyInfo)
        let res = await this.$sever.addUkeyInfo(this.submitData)
        switch (res.code) {
          case 0:
            this.$message({message: '提交成功', type: 'success'})
            this.$router.back()
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      getOrgName (str) {
        if (!str) {
          return '--'
        }
        return str.split('O=')[1].split(',')[0]
      },

      formateDate (dateStr) {
        if (!dateStr) {
          return '--'
        }
        let date = dateStr.substr(0, 4) + '-'
        date = date + dateStr.substr(4, 2) + '-'
        date = date + dateStr.substr(6, 2) + ' '
        date = date + dateStr.substr(8, 2) + ':'
        date = date + dateStr.substr(10, 2) + ':'
        date = date + dateStr.substr(12, 2)
        return date
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
