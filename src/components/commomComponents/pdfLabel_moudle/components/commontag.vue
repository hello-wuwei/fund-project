<template lang="html">
  <div :style="styleObj">
    <slot></slot>
    <div class="label-style" :style="shapeStyle"></div>
  </div>
</template>

<script>
export default {
  props: {
    // 传入当前标签的样式数据
    tagStyle: {
      type: [String, Object],
      required: true
    }
  },
  data () {
    return {
    }
  },
  created () {
  },
  computed: {
    // 根据切换的当前标签数据来设置标签样式
    styleObj () {
      let data = JSON.parse(this.tagStyle)
      switch (data.shape) {
        case 1:    // 切换到签名标签样式
          return {
            width: '100px',
            height: '50px'
          }
        case 2:    // 切换到签章标签样式，因签章为圆形，所以单独使用shapeStyle方法来设置border-radius为70px（见下方）
          return {
            width: '140px',
            height: '140px'
          }
        case 3:   // 切换到选项组标签样式
          return {
            width: '30px',
            height: '30px'
          }
        default:  // 切换到文本标签样式
          return {
            width: '200px',
            height: '30px'
          }
      }
    },
    // 当切换到签章时，设置标签为圆形
    shapeStyle () {
      let data = JSON.parse(this.tagStyle)
      switch (data.shape) {
        case 2:
          return {
            borderRadius: '70px'
          }
        default:
          return {}
      }
    }
  },
  methods: {
  }
}
</script>
<style lang="css" scoped>
.label-style{
  width: 100%;
  height: 100%;
  /*border-radius: 50%;*/
  background: darkorange;
  text-align: center;
}
.label-style i{
  display: inline-block;
  margin-top: 60px;
  font-size: 14px;
  color: #fff;
}
</style>
