<template>
  <div class="page">
    <div class="content-main tree-text">
      <div class="table-tree">
        <div class="table-header-org">
          <div class="td1">组织名称</div>
          <div class="td2">组织ID</div>
          <div class="td3">显示排序</div>
          <div class="td4">操作</div>
        </div>
        <scroll-bar>
          <el-tree
            :data="treeData"
            default-expand-all
            node-key="deptId"
            ref="tree"
            highlight-current
            :render-content="renderContent"
            :props="defaultProps">
          </el-tree>
        </scroll-bar>
      </div>
      <div style="margin-top: 15px">
        <el-button type="primary" icon="plus" @click="addResouce">新建组织</el-button>
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
          id: 'deptId',
          children: 'subList',
          label: 'deptName'
        }
      }
    },
    created: function () {
      this.getResouceTree()
    },
    methods: {
      async getResouceTree () {
        let res = await this.$sever.orgManageTree({sysCode: 'TTD_MANAGE_SYSTEM'})
        switch (res.code) {
          case 0:
            console.log(res)
            this.treeData = res.data.bean
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      renderContent (h, {node, data, store}) {
        return (
          <div class="table-org">
            <div class="td1">
              <span>{data.deptName}</span>
            </div>
            <div class="item">
              <div class="td2">{data.deptId}</div>
              <div class="td3">{data.sortNo ? data.sortNo : '--'}</div>
              <div class="td4">
                <el-button size="mini" type="primary" on-click={() => this.editResouce(data.deptId)}>修 改</el-button>
                <el-button size="mini" on-click={() => this.deleteAlert(data.deptId)}>删 除</el-button>
              </div>
            </div>
          </div>
        )
      },
      addResouce () {
        this.$emit('addTag', {title: '新建组织', name: 'addResouce'})
      },
      editResouce (deptId) {
        this.$emit('addTag', {title: '修改组织', name: 'editResouce', deptId: deptId})
      },
      async deleteSource (deptId) {
        let res = await this.$sever.deleteOrg({deptId: deptId, sysCode: 'TTD_MANAGE_SYSTEM'})
        switch (res.code) {
          case 0:
            this.$message({message: '删除成功', type: 'success'})
            this.getResouceTree()
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      deleteAlert (deptId) {
        this.$confirm('确定删除该组织吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteSource(deptId)
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
  .table-header-org{
    position: relative;
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
    color: #333;
    font-weight: bold;
    font-size: 14px;
  }
  .table-header-org > div{
    float: left;
    width: 25%;
    text-align: center;
  }
  .table-org{
    width: 100%;
    flex: 1;
    line-height: 50px;
  }
  .table-org > div{
    /*width: 25%;*/
  }
  .table-org .td1 {
    float: left;
  }
  .table-org{
    height: 50px;
  }
  .table-org .item{
    position: absolute;
    height: 100%;
    width: 75%;
    right: 0;
  }
  .table-org .item > div{
    float: left;
    text-align: center;
    width: 33.3%;
  }
</style>
