<template lang="html">
  <div :style="styleObj" labelType="999" tagName="moudleTag">
    <component v-for="(item,index) in pdfPageTagList" :parentInfo="item.parentInfo" :is='item.tagName'
               :group-id="item.group_id" :style="item.styleObj" keep-alive :showName='item.showName'
               :key="index"></component>
  </div>
</template>

<script>
  import textTag from './textTag.vue'
  import optionTag from './optionTag.vue'
  export default {
    props: ['moudleData'],
    components: {
      textTag,
      optionTag
    },
    data () {
      return {
        styleObj: {},
        pdfPageTagList: []
      }
    },
    created () {
//    alert(JSON.stringify(this.moudleData))
      this.analyticMoudle()
    },
    methods: {
      analyticMoudle () {
        let that = this
        let top = []
        let left = []
        let right = []
        let bottom = []
        this.moudleData.forEach(function (item, index) {
          if (parseInt(item.labelType) === 2 || parseInt(item.labelType) === 3) {
            item.labelContent.forEach(function (v, index) {
              top.push(v.yAxis)
              left.push(v.xAxis)
              right.push(v.xAxis + v.labelWidth)
              bottom.push(v.yAxis + v.labelHigh)
            })
          } else {
            top.push(item.yAxis)
            left.push(item.xAxis)
            right.push(item.xAxis + item.labelWidth)
            bottom.push(item.yAxis + item.labelHigh)
          }
        })
        let T = Math.min.apply(null, top)
        let L = Math.min.apply(null, left)
//        let R = Math.max.apply(null, right)
//        let B = Math.max.apply(null, bottom)

        this.moudleData.forEach(function (item, index) {
          if (parseInt(item.labelType) === 2 || parseInt(item.labelType) === 3) {
            item.labelContent.forEach(function (v, index) {
              v.styleObj.top = parseInt(v.styleObj.top) - T + 'px'
              v.styleObj.left = parseInt(v.styleObj.left) - L + 'px'
//            v.parentInfo = JSON.stringify({showName: item.showName, isMust: item.isMust, labelType: item.labelType, group_id: item.group_id})
              that.pdfPageTagList.push(v)
            })
          } else {
            item.styleObj.top = parseInt(item.styleObj.top) - T + 'px'
            item.styleObj.left = parseInt(item.styleObj.left) - L + 'px'
            that.pdfPageTagList.push(item)
          }
        })
      }
    }
  }
</script>
<style lang="css" scoped>
  .label-style {
    width: 100%;
    height: 100%;
    border: none;
    background: darkorange;
  }
</style>
