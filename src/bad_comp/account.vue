<template>
  <div class="main-wrapper">
    <el-tabs class="main-tabs" v-model="activeName" type="border-card" @tab-remove="removeTab">
      <el-tab-pane label="系统账号" name="index">
        <account-list @handlePlus="changeActive" :tableData = "tableData" :orgList="orgList" :token="token" @chanParams="chanParams" @refresh="getList" />
      </el-tab-pane>
      <el-tab-pane v-for="(item, index) in tabData" :key="item.index" :label="item.label" :name="item.index" closable>
        <keep-alive>
          <component :is="item.type" :content="item.content" :orgList="orgList" :token="token" @refresh="getList" @on-cancel="handelCancel"></component>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>

</template>
<script>
  import AccountList from './account/account'
  import AccountAdd from './account/accountAdd'
  import AccountEdit from './account/accountEdit'

  import Api from './api'
  import {post} from '@/api/http.js'
  export default {
    components: {
      AccountList,
      AccountAdd,
      AccountEdit
    },
    data () {
      return {
        orgList: [],
        token: {
          mobile: '13730880167',
          orgName: '成都红泰投资有限公司',
          userId: 901,
          userName: '刘浩'
        },
        params: {}, // 查询分页等的参数
        tableData: {}, // 子账号数据列表 ，包含分页
        activeName: 'index', // tab页选中name
        tabData: []
      }
    },

    created () {
      this.getList()
      this.getOrgList()
    },
    methods: {
      // 修改查询参数
      chanParams (obj) {
        Object.assign(this.params, obj)
        this.getList()
      },
      // 获取系统账号数据, 刷新数据也调用次方法
      async getList () {
        let response = await post(Api.account.list, Object.assign({userId: this.token.userId}, this.params), '')
        if (response.code === 0) {
          this.tableData = response.data
        }
      },
      async getOrgList () {
        let response = await post(Api.orga.list, {userId: this.token.userId}, '')
        if (response.code === 0) {
          this.orgList = response.data.list
        }
      },
      changeActive (val) {
        let {tabData} = this
        if (!tabData.some(item => item.index === val.index)) {
          tabData.push(val)
        }
        this.activeName = val.index
      },
      // 删除tabs 标签页
      removeTab(targetName) {
        this.tabData.splice(this.tabData.findIndex(v => v.index === targetName), 1)
        this.activeName = 'index'
      },
      // 返回按钮, 关闭本tab页(即当前的active)
      handelCancel () {
        this.removeTab(this.activeName)
      }
    }
  }
</script>
<style lang="less">
  .account-title span {
    display: inline-block;
    padding: 9px 18px;
    background: #fff;
  }
</style>
