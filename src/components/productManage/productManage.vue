<template lang="html">
  <div class="page">
    <el-tabs style="border: none" v-model="activeTag" type="card" closable @tab-remove="removeTag">
      <el-tab-pane v-for="(item, index) in editableTabs" :key="item.name" :label="item.title" :name="item.name"></el-tab-pane>
      <component :oId="propValue" v-on:addTag="addTag" v-on:removeTag="removeTag" :is='activeTag' keep-alive></component>
    </el-tabs>
  </div>
</template>

<script>
  import productManageList from './productManage/productManageList.vue'
  import seeView from './productManage/seeView.vue'
  import makeSign from './productManage/makeSign.vue'
  import textLabelResp from './productManage/textLabelResp.vue'
  import contractDone from './productManage/contractDone.vue'
  import riskbookDone from './productManage/riskbookDone.vue'
  import enterInfo from './productManage/enterInfo.vue'
  export default {
    components: {
      productManageList,
      seeView,
      makeSign,
      textLabelResp,
      contractDone,
      riskbookDone,
      enterInfo
    },
    data () {
      return {
        // tab组件切换
        comNameConfig: 'productManageList',         // 菜单主页面组件名称（固定值/常量）
        activeTag: 'productManageList',
        editableTabs: [{
          title: '产品管理',
          name: 'productManageList'
        }],
        propValue: null                // 来自子组件的值，传给另一子组件
      }
    },
    created () {
    },
    methods: {
      hasName (data) {
        return this.editableTabs.some(function (obj) {
          return obj.name === data.name
        })
      },
      addTag(data) {
        if (!this.hasName(data)) {
          this.editableTabs.push(data)
        }
        this.activeTag = data.name
        this.propValue = data.oId ? data.oId : this.propValue
      },
      removeTag(name) {
        if (name === this.comNameConfig) {
          return
        }
        for (let i = 0; i < this.editableTabs.length; i++) {
          if (this.editableTabs[i].name === name) {
            this.editableTabs.splice(i, 1)
//            this.activeTag = this.editableTabs[i - 1].name
            this.activeTag = this.comNameConfig
            return
          }
        }
      }
    }
  }
</script>
<style lang="css">
  .page .el-tabs--card > .el-tabs__header{
    border: none !important;
    margin: 0;
  }
  .page .el-tabs__nav{
    border: none !important;
  }
  .page .el-tabs__item.is-active{
    background: #fff;
  }
  .page .el-tabs__item{
    border: none !important;
  }
</style>
<style lang="css" scoped>
</style>

