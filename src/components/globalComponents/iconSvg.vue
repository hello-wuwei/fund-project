<template>
  <svg class="svg-icon" :style="defineStyle" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
  export default {
    name: 'icon-svg',
    props: {
      iconClass: {
        type: String,
        required: true
      },
      defineStyle: {
        type: Object,
        required: false
      }
    },
    computed: {
      iconName() {
        return `#icon-${this.iconClass}`
      }
    }
  }
</script>

<style>
  .svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: middle;
    fill: currentColor;
    overflow: hidden;
    margin-right: 10px;
  }
</style>
