<template lang="html">
  <div class="page">
    <!--<div class="top-tab">托管人管理</div>-->
    <el-tabs style="border: none" v-model="activeTag" type="card" closable @tab-remove="removeTag">
      <el-tab-pane v-for="(item, index) in editableTabs" :key="item.name" :label="item.title" :name="item.name"></el-tab-pane>
      <component :sourcesId="propValue" v-on:addTag="addTag" v-on:removeTag="removeTag" :is='activeTag' keep-alive></component>
    </el-tabs>
  </div>
</template>

<script>
  import clientBmanageList from './clientBmanage/clientBmanageList.vue'
  import addResouce from './clientBmanage/addResouce.vue'
  import editResouce from './clientBmanage/editResouce.vue'
  import seeResouce from './clientBmanage/seeResouce.vue'
  export default {
    components: {
      clientBmanageList,
      addResouce,
      editResouce,
      seeResouce
    },
    data () {
      return {
        // tab组件切换
        comNameConfig: 'clientBmanageList',         // 菜单主页面组件名称（固定值/常量）
        activeTag: 'clientBmanageList',
        editableTabs: [{
          title: 'B端后台',
          name: 'clientBmanageList'
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
        this.propValue = data.sourcesId ? data.sourcesId : this.propValue
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

