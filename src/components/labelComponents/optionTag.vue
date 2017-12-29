<template lang="html">
  <div :style="styleObj" labelType="2" tagName="optionTag">
    <input class="label-style" type="text"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      styleObj: {
        width: '30px',
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
