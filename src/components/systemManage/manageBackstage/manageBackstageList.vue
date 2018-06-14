<template>
  <div class="page">
    <com-breadcrumb :list="['后台管理']"></com-breadcrumb>
    <div class="content-main tree-text">
      <div class="table-tree">
        <div class="table-header">
          <div class="td1" style="padding: 0">组织名称</div>
          <div class="item-g">
            <div class="td2" style="padding: 0">资源编码</div>
            <div class="td3">URL</div>
            <div class="td4">资源类型</div>
            <div class="td5">显示排序</div>
            <div class="td6">启用状态</div>
            <div class="td7">操作</div>
          </div>
        </div>
        <scroll-bar>
          <el-tree
            :data="treeData"
            :default-expanded-keys="[131]"
            node-key="id"
            ref="tree"
            highlight-current
            :render-content="renderContent"
            :props="defaultProps">
          </el-tree>
        </scroll-bar>
      </div>
      <div style="margin-top: 15px">
        <el-button v-if="SYS_BACK_NEW" class="bom-btn" size="mini" icon="el-icon-plus" @click="addResouce">新增资源</el-button>
      </div>
    </div>
  </div>

</template>
<script>
  export default {
    data () {
      return {
        treeData: [],
        defaultProps: {
          id: 'sourcesId',
          children: 'subList',
          label: 'name'
        }
      }
    },
    created: function () {
      this.getResouceTree()
    },
    methods: {
      async getResouceTree () {
        let res = await this.$sever.getResouceTree({sysCode: 'TTD_MANAGE_SYSTEM'})
        switch (res.code) {
          case 0:
            console.log(res)
            this.treeData = res.data.bean
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      showBtn (h, data) {
        let btnArr = []
        if (this.SYS_BACK_SEE) {
          btnArr.push(h('el-button', {attrs: {size: 'mini', type: 'primary'}, on: {click: () => this.seeResouce(data.sourcesId)}}, '查 看'))
        }
        if (this.SYS_BACK_EDIT) {
          btnArr.push(h('el-button', {attrs: {size: 'mini', type: 'primary'}, on: {click: () => this.editResouce(data.sourcesId)}}, '修 改'))
        }
        if (this.SYS_BACK_USED) {
          btnArr.push(h('el-button', {attrs: {size: 'mini'}, on: {click: () => this.stopUsed(data.sourcesId, data.isUsed)}}, data.isUsed === 1 ? '停 用' : '启 用'))
        }
        if (this.SYS_BACK_DELE) {
          btnArr.push(h('el-button', {attrs: {size: 'mini'}, on: {click: () => this.deleteAlert(data.sourcesId)}}, '删 除'))
        }
        return btnArr
      },

      getDoneList (h, data) {
        return h('div', {
          attrs: {
            class: 'td7'
          }
        }, this.showBtn(h, data))
      },

      renderContent (h, {node, data, store}) {
        return (
          <div class="table-tr table-btn-style">
            <div class="td1">
              <span>{data.name}</span>
            </div>
            <div class="item">
              <div class="td2">{data.code}</div>
              <div class="td3"><span>{data.urlAddress ? data.urlAddress : ' -- '}</span></div>
              <div class="td4">{{'1': '菜单', '2': '功能', '4': '数据', '5': '接口'}[data.type]}</div>
              <div class="td5">{data.sortNo}</div>
              <div class="td6">{data.isUsed === 1 ? '启用' : '停用'}</div>
              { this.getDoneList(h, data) }
            </div>
          </div>
        )
      },
      addResouce () {
        this.$router.push({path: '/home/manageBackstage/addResouce'})
      },
      editResouce (sourcesId) {
        this.$router.push({path: '/home/manageBackstage/editResouce', query: {sourcesId: sourcesId}})
      },
      seeResouce (sourcesId) {
        this.$router.push({path: '/home/manageBackstage/seeResouce', query: {sourcesId: sourcesId}})
      },
      async stopUsed (sourcesId, isUsed) {
        let res = await this.$sever.stopUseBack({sourcesId: sourcesId, sysCode: 'TTD_MANAGE_SYSTEM'})
        switch (res.code) {
          case 0:
            this.$message({message: '资源已' + (isUsed === 1 ? '停用' : '启用'), type: 'success'})
            this.getResouceTree()
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },
      async deleteSource (sourcesId) {
        let res = await this.$sever.deleteBackSource({sourcesId: sourcesId, sysCode: 'TTD_MANAGE_SYSTEM'})
        switch (res.code) {
          case 0:
            this.$message({message: '删除成功', type: 'success'})
            this.getResouceTree()
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      deleteAlert (sourcesId) {
        this.$confirm('确定删除该资源吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteSource(sourcesId)
        }).catch(() => {
        })
      }
    }
  }
</script>
<style>
  .tree-text{
    font-size: 14px;
  }
  .table-header{
    position: relative;
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
    color: #333;
    font-weight: bold;
  }
  .table-header > .td1{
    text-align: center;
    width: 13%;
  }
  .table-header .item-g{
    position: absolute;
    height: 100%;
    width: 87%;
    top: 0;
    right: 0;
    display: flex;
  }
  .table-header .item-g > div{
    flex: 1;
    text-align: center;
  }
  .table-header .item-g > div:nth-child(1){
    min-width: 170px;
  }
  .table-header .item-g > div:nth-child(2){
    min-width: 170px;
  }
  .table-header .item-g > div:nth-child(6){
    flex: inherit;
    width: 300px;
  }

  .table-tr{
    height: 50px;
  }
  .table-tr .td1 {
    float: left;
    width: 15%;
  }
  .table-tr .item{
    position: absolute;
    height: 100%;
    width: 85.7%;
    right: 0;
    display: flex;
  }
  .table-tr .item > div{
    flex: 1;
    text-align: center;
  }
  .table-tr .item > div:nth-child(1){
    min-width: 170px;
  }
  .table-tr .item > div:nth-child(2){
    min-width: 170px;
  }
  .table-tr .item > div:nth-child(6){
    flex: inherit;
    width: 300px;
  }
</style>
