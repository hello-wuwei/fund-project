<template>
  <div class="index">
    <div class="cascader">
      <ul class="cascader-parent">
        <li v-hover="callback" index="0">管理人文本标签</li>
        <li v-hover="callback" index="1">托管人文本标签</li>
        <li v-hover="callback" index="2">投资者文本标签</li>
        <li v-hover="callback" index="3">通用文本标签</li>
      </ul>
      <div class="levitate" id="cover" :style="{'top': top}">
        <ul class="cascader-children">
          <li v-for="(item, index) in currentLabelList" :key="index" @click="$emit('emit-label', item)">{{item.labelName}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style></style>
<script>
  export default {
    data () {
      return {
        top: 0,
        inputNameList: {
          managerLabelList: [],
          invertLabelList: [],
          trustLabelList: [],
          checkLabelList: [],
          commonLabelList: []
        },
        currentLabelList: []
      }
    },
    directives: {
      hover: {
        inserted (el, binding) {
          let index = el.getAttribute('index')
          el.onmouseover = (e) => {
            binding.value({index: index})
          }
        }
      }
    },
    created () {
      this.getTextLabelList()
    },
    methods: {
      getLabelData (index) {
        switch (index) {
          case 0:
            return this.inputNameList.managerLabelList
          case 1:
            return this.inputNameList.trustLabelList
          case 2:
            return this.inputNameList.invertLabelList
          case 3:
            return this.inputNameList.commonLabelList
        }
      },
      // 计算悬浮标签组位置
      callback (data) {
        let index = parseInt(data.index)
        this.currentLabelList = this.getLabelData(index)
        setTimeout(() => {
          let h = document.getElementById('cover').offsetHeight
          let y = 25 + (50 * index) - h / 2 + 'px'
          this.top = y
        })
      },
      async getTextLabelList () {
        let res = await this.$sever.getGroupLabelList()
        switch (res.code) {
          case 0:
            this.inputNameList = res.data.bean
            this.$emit('setCheckList', this.inputNameList.checkLabelList)
            console.log('取得标签', this.inputNameList)
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      }
    }
  }
</script>
<style scoped>
  .cascader{
    position: relative;
    width: 100%;
  }
  .cascader:hover .levitate{
    display: block;
  }
  ul.cascader-parent li{
    line-height: 50px;
    border-bottom: 1px solid #ccc;
    padding-left: 20px;
    cursor: pointer;
  }
  ul.cascader-parent li:hover{
    background: #E9F1FD;
  }
  .levitate{
    position: absolute;
    display: none;
    padding: 10px;
    width: 200px;
    top: 0;
    right: 100%;
    background: #fff;
    box-shadow: 0px 0px 1px 2px #e8e8e8;
  }
  .levitate .cascader-children li{
    color: #222222;
    font-size: 12px;
    text-align: center;
    border-radius: 14px;
    background: #EBEEF3;
    margin: 5px 0;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
  }
  .levitate .cascader-children li:hover{
    background: #DEF5FD;
  }
</style>
