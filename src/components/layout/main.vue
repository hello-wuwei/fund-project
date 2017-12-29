<template>
  <div class="home-back">
    <div class="tab-itemlist top-tag">
      <div class="navicon-con">
        <i @click="_hanldeCollapse" class="el-icon-menu" style="cursor:pointer"></i>
      </div>
      <div class="navicon-con">
        <i class="el-icon-caret-left" style="cursor:pointer"></i>
      </div>
      <el-tabs style="float: left" v-model="activeTag" type="card" :closable="true" @tab-remove="removeTag" @tab-click="tagClick">
        <el-tab-pane
          class="tab-style"
          v-for="tag in tags"
          :key="tag.name"
          :label="tag.name"
          :name="tag.name"
        >
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="tab-box">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
  import {mapMutations, mapActions} from 'vuex'
  import bus from '../../utils/bus'

  export default {
    data () {
      return {
        activeTag: '首页',
        tags: [{
          name: '首页',
          path: '/home/index'
        }]
      }
    },
    created () {
      let cloneRoute = Object.assign({}, this.$route)
      cloneRoute.name = cloneRoute.name.split('/')[0]
      if (cloneRoute.name !== '首页') {
        this.tags.push(cloneRoute)
      }
      this.activeTag = cloneRoute.name
      bus.$on('menuGo', (item) => {
        let cloneItem = Object.assign({}, item)
        if (cloneItem.name.indexOf('/') > 0) {
          cloneItem.name = cloneItem.name.split('/')[0]
        }
        this.activeTag = cloneItem.name
        if (this.tags.some((tag) => { return tag.name === cloneItem.name })) {
          return false
        } else {
          this.tags.push(cloneItem)
        }
      })
    },
    watch: {
    },
    methods: {
      ...mapMutations({
        saveUserInfo: 'SAVE_USERINFO',
        changeMenu: 'CHANGE_MENU'
      }),
      ...mapActions([
        'insertSong'
      ]),
      addTab(targetName) {
      },
      removeTag(name) {
        for (let i = 0; i < this.tags.length; i++) {
          if (this.tags[i].name === name) {
            this.tags.splice(i, 1)
            this.activeTag = this.tags[i - 1].name
            this.$router.push(this.tags[i - 1].path)
            return
          }
        }
      },

      // tab切换时，动态的切换路由
      tagClick (tag) {
        for (let i = 0; i < this.tags.length; i++) {
          if (this.tags[i].name === tag.name) {
            this.$router.push(this.tags[i].path)
            return
          }
        }
      },
      _hanldeCollapse () {
        this.changeMenu()
      }
    },
    computed: {
      tabs () {
        return this.$store.state.tabs
      },
      tabActiveIndex: {
        get () {
          return this.$store.state.tabActiveIndex
        },
        set (val) {
          this.$store.commit('SET_ACTIVE_TAB', val)
        }
      }
    }
  }
</script>
<style>
  .top-tag .el-tabs__content{
    display: none;
  }
  .el-tabs__nav .el-tabs__item:nth-child(1) span{
    display: none;
  }
  .top-tag .is-active{
    background: #243959;
    color: #fff;
  }
  .top-tag .el-tabs--card>.el-tabs__header .el-tabs__nav{
    border: none;
  }
  .top-tag .el-tabs--card>.el-tabs__header .el-tabs__item{
    border-bottom: none;
  }
</style>
<style scoped>
  .tab-box{
    margin: 20px;
  }
  .tab-itemlist{
    height: 40px;
    border-bottom: 2px solid #243A5B;
    background: #fff;
    /*overflow: hidden;*/
  }
  .navicon-con{
    float: left;
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border-right: 1px solid #ccc;
  }
  .tab-style{
    background: none;
    border: none;
    border-radius: inherit;
    border-right: 1px solid #ccc;
    height: 40px;
    line-height: 40px;
    color: #444444;
    width: 100px;
    text-align: center;
  }
  .home-back{
    background: #F0F3F5;
  }
  .tag-link{
    display: inline-block;
    height: 100%;
    width: 60px;
    cursor: pointer;
  }
</style>
