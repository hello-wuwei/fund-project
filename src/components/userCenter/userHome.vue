<template lang="html">
  <div class="user-home">
    <el-container>
      <el-aside width="400px"><user-left></user-left></el-aside>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </div>
</template>
<script>
  import bus from '../../utils/bus'
  import userLeft from './userComps/userLeft.vue'
  export default {
    components: {
      userLeft
    },
    data () {
      return {
      }
    },
    created () {
      bus.$emit('menuGo', this.$route)
    },
    computed: {
    },
    methods: {
    }
  }
</script>

<style scoped>
  .user-home{
  }
</style>
