<template>
  <div class="home-back">
    <div class="tab-itemlist top-tag" style="display: flex;flex-flow:row">
      <div style="overflow: hidden;flex: 1">
        <div style="width: 2000px;">
          <div class="navicon-con" @click="_hanldeCollapse">
            <icon icon-class="menucoll" style="margin: 0"></icon>
          </div>
          <!--<div class="navicon-con" @click="$router.back()">-->
            <!--<icon icon-class="back" style="margin: 0"></icon>-->
          <!--</div>-->
          <el-tabs style="float: left" v-model="activeTag" type="card" :closable="true" @tab-remove="removeTag" @tab-click="tagClick">
            <el-tab-pane
              class="tab-style"
              v-for="tag in tags"
              :key="tag.meta.moudlename"
              :label="tag.meta.moudlename"
              :name="tag.meta.moudlename"
            >
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div style="width: 65px">
        <div class="navicon-con tuichu" @click="util.loginOut">
          <i style="cursor:pointer"><img class="transform" src="../../assets/images/tuichu.png"> 退出</i>
        </div>
      </div>

    </div>

    <div class="tab-box">
      <!--<div v-show="isShow" class="white"></div>-->
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
  import {mapMutations, mapActions} from 'vuex'
//  import bus from '../../utils/bus'

  export default {
    data () {
      return {
        activeTag: '首页',
        tags: [{
          path: '/home/index',
          meta: {
            moudlename: '首页'
          }
        }],
        isShow: true
      }
    },
    created () {
      if (this.$route.meta.moudlename !== '首页') {
        this.activeTag = this.$route.meta.moudlename
        this.tags.push(this.$route)
      }
    },
    mounted () {
      let that = this
      this.resizePage()
      window.onresize = () => {
        that.resizePage()
      }
    },
    watch: {
      $route (to, form) {
        this.activeTag = to.meta.moudlename
        if (!this.tags.some((tag) => { return tag.meta.moudlename === to.meta.moudlename })) {
          this.tags.push(to)
        }
      }
    },
    methods: {
      ...mapMutations({
        changeMenu: 'CHANGE_MENU'
      }),
      ...mapActions([
        'insertSong'
      ]),
      addTab(targetName) {
      },
      removeTag(tagName) {
        for (let i = 0; i < this.tags.length; i++) {
          if (this.tags[i].meta.moudlename === tagName) {
            this.$router.push(this.tags[i - 1].path)
            this.tags.splice(i, 1)
            return
          }
        }
      },

      // tab切换时，动态的切换路由
      tagClick (tagObj) {
        for (let i = 0; i < this.tags.length; i++) {
          if (this.tags[i].meta.moudlename === tagObj.name) {
            let pathArry = this.tags[i].path.split('/')
            let repath = '/' + pathArry[1] + '/' + pathArry[2]
            this.$router.push(repath)
            return
          }
        }
      },
      _hanldeCollapse () {
        this.changeMenu()
      },

      resizePage () {
        document.getElementsByClassName('white')[0].style.minHeight = window.innerHeight - 260 + 'px'
      },

      judgeUser (path) {
        if (path.name.split('/')[0] === '个人中心') {
          this.isShow = false
        } else {
          this.isShow = true
        }
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
  .top-tag .el-tabs--card > .el-tabs__header .el-tabs__item.is-active.is-closable .el-icon-close{
    background: #fff;
    color: gray;
  }
  .top-tag .el-tabs--card > .el-tabs__header .el-tabs__item .el-icon-close{
    background: gray;
    color: #fff;
  }
  .top-tag .el-tabs--card > .el-tabs__header .el-tabs__item .el-icon-close{
    width: 14px;
  }
  .top-tag .el-tabs--card > .el-tabs__header .el-tabs__item.is-closable:hover{
    padding-left: 20px;
    padding-right: 20px;
  }
</style>
<style scoped>
  .white{
    position: absolute;
    top: 100px;
    width: 100%;
    background: #fff;
  }
  .tab-box{
    margin: 20px;
    position: relative;
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
    cursor: pointer;
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
  .transform{
    transform:rotate(180deg);
    -ms-transform:rotate(180deg); 	/* IE 9 */
    -moz-transform:rotate(180deg); 	/* Firefox */
    -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
    -o-transform:rotate(180deg); 	/* Opera */
    display: inline-block;
    margin-bottom: 2px
  }
  .tuichu{
    border-left:1px solid #ccc;
    width: auto;
    font-size: 14px;
    padding: 0 10px
  }
</style>
