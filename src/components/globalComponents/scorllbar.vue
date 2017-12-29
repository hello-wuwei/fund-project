<template>
  <!--<EasyScrollbar>-->
    <div :style="mH" class="jjj" id="scorller">
      <slot></slot>
    </div>
  <!--</EasyScrollbar>-->
</template>

<script>
  export default {
    props: ['maxH'],
    name: 'scorller',
    data () {
      return {
        mH: {
          maxHeight: (this.maxH ? this.maxH : 600) + 'px',
          overflowY: 'scroll'
        }
      }
    },
    methods: {
//      onScroll (e, position) {
//        this.position = position
//      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
