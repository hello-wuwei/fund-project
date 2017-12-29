<template lang="html">
  <div :style="styleObj" labelType="1" tagName="textTag">
    <slot></slot>
    <input class="label-style" type="text"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      styleObj: {
        width: '100px',
        height: '30px'
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
  border: none;
  background: darkorange;
}
</style>
