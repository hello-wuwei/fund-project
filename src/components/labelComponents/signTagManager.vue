<template lang="html">
  <div :style="styleObj" labelType="11" tagName="signTagManager">
    <slot></slot>
    <div class="label-style"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      styleObj: {
        width: '140px',
        height: '140px'
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
  border-radius: 50%;
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
