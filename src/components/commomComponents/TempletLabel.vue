<template>
  <div>
    <el-select v-model="tempItem" size="small" placeholder="请选择签章模板">
      <el-option label="置空" value=""></el-option>
      <el-option v-for="(item, index) in labelTempList" :key="item.templateId" :label="item.templateName" :value="item.labelContent"></el-option>
    </el-select>
  </div>
</template>
<style></style>
<script>
  export default {
    data () {
      return {
        labelTempList: [],  // 标签模板列表
        tempItem: ''
      }
    },
    created () {
      this.getLabelTempList()
    },
    watch: {
      tempItem (currVal) {
        let obj = ''
        if (currVal === '') {
          obj = []
        } else if (currVal === null) {
          this.$message({message: '该模板还未打标签', type: 'warning'})
          return
        } else {
          obj = JSON.parse(currVal)
        }
        this.$emit('setLabelContent', obj)
      }
    },
    methods: {
      async getLabelTempList () {
        let data = {
          sysCode: 'TTDFUND'
        }
        let res = await this.$sever.getLabelTempletList(data)
        switch (res.code) {
          case 0:
            console.log('hahahah')
            this.labelTempList = res.data.list
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      }
    }
  }
</script>
