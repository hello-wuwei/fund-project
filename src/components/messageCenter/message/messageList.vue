<template lang="html">
  <div class="page">
    <!--<div class="top-tab">托管人管理</div>-->
    <div class="content-main">
      <div v-if="tableData.length">
        <scroll-bar>
          <div class="message-list">
            <ul>
              <li v-for="(item, index) in tableData" :key="index">
                <div class="title"><i v-if="item.state==0"></i><h4>{{item.title}}</h4></div>
                <div class="content">
                  <span>{{item.content}}</span></br>
                  <i>{{item.created | date}}</i>
                </div>
              </li>
            </ul>
          </div>
        </scroll-bar>
      </div>
      <div v-else style="margin-top:30px;text-align: center;line-height: 50px">暂时还没有新消息哟！</div>

      <div class="foot-bottom">
        <el-pagination
          style="float: right"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="10"
          prev-text="上一页"
          next-text="下一页"
          layout="total, prev, pager, next, jumper"
          :total="parseInt(total)">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    data () {
      return {
        currentPage: 1,
        formData: {
          sysName: 'TTD_FUND_MANAGE',
          pageSize: 10,
          pageNum: 1,
          userId: ''
        },
        total: '',
        tableData: []
      }
    },
    created () {
      this.formData.userId = this.userInfo.userId
      this.getDataList()
    },
    watch: {
    },
    computed: {
      ...mapState([
        'userInfo'
      ]),
      ids () {
        let ids = this.tableData.map((item) => {
          return item.id
        })
        return ids.join(',')
      }
    },
    methods: {
      // 获取消息列表
      async getDataList () {
        let res = await this.$sever.getMessageList(this.formData)
        switch (res.code) {
          case 0:
            this.tableData = res.data.list
            this.total = res.data.total
            this.markMsgRead()
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      async markMsgRead () {
        let res = await this.$sever.markMsgRead({userId: this.userInfo.userId, 'ids[]': this.ids, sysName: 'TTD_FUND_MANAGE'})
        switch (res.code) {
          case 0:
            console.log('ready')
            break
          default:
//            this.$message({message: res.msg, type: 'warning'})
        }
      },

      editSeal (stampId) {
        this.$emit('addTag', {title: '编辑', name: 'uploadSeal', stampId: stampId})
      },
      uploadSeal (stampId) {
        this.$emit('addTag', {title: '上传', name: 'uploadSeal', stampId: stampId})
      },
      handleCurrentChange (val) {
        this.formData.pageNum = val
        this.getDataList()
      }
    }
  }
</script>
<style lang="css">
</style>
<style lang="css" scoped>
  .message-list{
  }
  .message-list ul li{
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 20px;
  }
  .message-list ul li .title{
    border-bottom: 1px solid #ccc;
    overflow: hidden;
    height: 66px;
    padding-left: 20px;
  }
  .message-list ul li .title i{
    float: left;
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: red;
    margin-top: 28px;
    margin-right: 10px;
  }
  .message-list ul li .title h4{
    float: left;
    line-height: 66px;
  }
  .message-list ul li .content{
    padding-left: 20px;
    height: 72px;
  }
  .message-list ul li .content span{
    font-size: 14px;
    line-height: 40px;
  }
  .message-list ul li .content i{
    font-size: 12px;
    color: gray;
  }
</style>

