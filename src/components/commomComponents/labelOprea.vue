<!--用户中心右侧模板-->
<template lang="html">
  <div class="label-done-area">
    <div class="label-group">
      <div class="title-con">常用标签</div>
      <div class="label-list">
        <div class="label-item" v-for="(item, index) in opreaConfig" :key="item.labelType">
          <el-button class="btn" type="primary" @click="emitSignItem(item.labelType)">+ 设置{{item.name}}位置</el-button>
        </div>

      </div>
    </div>

    <div class="label-group">
      <div class="title-con">文本标签类</div>
      <class-cascader @emit-label="emitSignItem" @setCheckList="setCheckList"/>
    </div>

    <div class="label-group">
      <div class="label-list pt-empty">
        <div class="option-group">
          <h4>设置选项标签位置</h4>
          <div class="item-list">
            <div class="single-list" v-for="(item, index) in optionGroup" :key="index">
              <label>{{item.labelName}}：</label>
              <el-button
                v-for="(option, index) in (item.labelValue ? JSON.parse(item.labelValue) : [])"
                class="btn-dashed"
                type="primary"
                style="padding: 6px 10px"
                :key="index"
                @click="emitSignItem(Object.assign({optionName: option.description, code: option.code}, item))">
                {{option.description}}
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--<div class="label-preview pt-empty">-->
      <!--<h4>已打标签</h4>-->
      <!--<div class="con-list">-->
        <!--<div class="allSign">-->
          <!--<span>所有标签：</span><button class="view-btn" @click="$emit('setLabelView',0)">预 览</button>-->
          <!--<p class="label-name">-->
            <!--<span v-for="(item,index) in labelData">{{item.showName}}、</span>-->
          <!--</p>-->
        <!--</div>-->
        <!--<div class="allSign" v-for="(itemConf, index) in opreaConfig" :key="index">-->
          <!--<span>{{itemConf.name}}位置：</span><button class="view-btn" @click="$emit('setLabelView', itemConf.labelType)">预 览</button>-->
          <!--<p class="label-name">-->
            <!--<span v-for="(item,index) in labelData" v-if="item.labelType==itemConf.labelType">{{item.showName}}、</span>-->
          <!--</p>-->
        <!--</div>-->

        <!--<div class="allSign">-->
          <!--<span>文本标签：</span><button class="view-btn" @click="$emit('setLabelView',1)">预 览</button>-->
          <!--<p class="label-name">-->
            <!--<span v-for="(item,index) in labelData" v-if="item.labelType==1 || item.labelType==2">{{item.showName}}、</span>-->
          <!--</p>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>
<script>
  import ClassCascader from './ClassCascader.vue'
  export default {
    props: {
      opreaConfig: {
        type: [Array],
        default: () => {
          return []
        }
      },
      labelData: {
        type: [Array],
        default: () => {
          return []
        }
      }
    },
    components: {
      ClassCascader
    },
    data () {
      return {
        inputNameList: [],   // 文本标签列表
        optionGroup: []    // 选项标签列表
      }
    },
    created () {
//      this.getTextLabelList()
    },
    methods: {
      emitSignItem (type) {
        if (typeof type === 'number') {
//          this.itemObj = val
          this.$emit('getSignItem', type)
        } else {
          let typeObj = {}
          if (type.typeId === 2) {
            typeObj = {
              typeId: type.typeId,
              type: 2,
              optionName: type.optionName,
              labelName: type.labelName,
              labelCode: type.labelCode,
              code: type.code
            }
            this.$emit('getSignItem', typeObj)
          } else {
            typeObj = {
              typeId: type.typeId,
              type: 1,
              name: type.labelName,
              labelId: type.labelId,
              labelCode: type.labelCode
            }
            this.$emit('getSignItem', typeObj)
          }
        }
      },

      setCheckList (data) {
        this.optionGroup = data
      },

      splitLabel (list) {
        for (let i = 0; i < list.length; i++) {
          if (list[i].typeId === 1) {
            this.inputNameList.push(list[i])
          }
          if (list[i].typeId === 2) {
            list[i].labelValue = JSON.parse(list[i].labelValue)
            this.optionGroup.push(list[i])
          }
        }
      },

      async getTextLabelList () {
        let res = await this.$sever.getAllLabelList()
        switch (res.code) {
          case 0:
            this.splitLabel(res.data.list)
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      }
    }
  }
</script>
<style>
</style>
<style scoped>
  .label-group{
    margin-bottom: 20px;
    border: 1px solid #ccc;
  }
  .title-con {
    padding-left: 20px;
    color: #333;
    font-size: 20px;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
  }
  .label-done-area{
    width: 320px;
  }

  .label-list {
    padding: 20px 0;
    text-align: center;
  }

  .label-list .label-item {
    margin-bottom: 20px;
  }

  .label-list .label-item .btn {
    width: 240px;
    border-radius: 18px;
    background: #EBEEF3;
    color: #222222;
    border: none;
  }
  .label-list .label-item .btn:hover{
    background: #DEF5FD;
  }
  .pt-empty{
    padding-top: 0;
  }

  .gongzhang img {
    width: 100%;
    height: 100%;
  }

  .label-preview h4 {
    text-align: center;
  }

  .label-preview .con-list {
    margin: 10px;
    border: 1px solid #ccc;
    padding: 20px;
  }

  .label-name {
    margin-top: 10px;
    color: #20a0ff;
    font-size: 14px;
  }
  .allSign{
    margin-bottom: 20px;
  }
  .view-btn{
    width: 40px;
    height:20px;
    background: none;
    font-size: 12px !important;
    border: 1px solid #3D82F7;
    text-align: center;
    line-height: 20px;
    font-size: 14px;
    border-radius: 2px;
    padding: 0;
    color: #3D82F7;
    float: right;
    cursor: pointer;
    outline: none;
  }
  .option-group{
    font-size: 14px;
  }
  .option-group h4{
    line-height: 40px;
    background: #F2F2F2;
    border-bottom: 1px solid #ccc;
  }
  .item-list{
    text-align: left;
    margin-left: 15px;
  }
  .single-list{
    padding: 15px 0;
  }
</style>
