<!--用户中心右侧模板-->
<template lang="html">
  <div class="label-view">
    <div id="img" style="position: absolute;width: 100%; height: 100%;top: 0; left: 0;"></div>
    <!--用于显示当前标签-->
    <component
      :is='currentView'
      v-move="getCoordinates"
      class="tag"
      :showName='activeTagObj.name'
      :tagData="JSON.stringify(activeTagObj)"
      :tagStyle="JSON.stringify(activeTagObj)"
      :labelId="activeTagObj.labelId">
    </component>
    <!--用于渲染已打的标签-->
    <labelItem v-for="(item,index) in singleTagData"
               v-if="page===item.pageIndex && labelView == 0?true:(labelView==item.labelType)"
               v-scale="setSize" :style="getStyleCom(item)"
               @click.native.prevent.right="deTag(item, $event)"
               :tagData="JSON.stringify({type: item.labelType, name: item.showName, shape: item.shape})"
               :tagStyle="JSON.stringify({type: item.labelType, name: item.showName, shape: item.shape})"
               :showName='item.showName' :key="index"><i class="labelCon" :style="'line-height:'+ item.styleObj.height">{{item.labelType === 2 ? '' : item.showName}}</i><i v-if="isclose" class="close" @click="deleteTag(item)">+</i>
    </labelItem>
  </div>
</template>
<script>
  // 引入标签组件
  import labelItem from './commontag.vue'
  // 引入标签组件指令
  import directive from '../directive'
  // 引入标签配置（其中包含各类标签的类型（type）；标签名称（name）；标签形状（shape））
  import labelConfig from '../config/label_config'
  export default {
    props: {
      // 是否可删除标签
      isclose: {
        type: [Boolean],
        default: true
      },
      // 当前选中标签数据对象
      item: {
        type: [Object, Number]
      },
      // 当前合同页码（会根据当前页码显示对应当前页码的标签）
      page: {
        type: [Number, String],
        default: 1
      },
      // 当前要预览的标签类型（根据需求已移除预览功能，根据需要可再添加该功能）
      labelView: {
        type: [Number, String],
        default: 0
      },
      // 传入已有的标签数据（如需要查看合同时，要求还能看到合同上的标签，则可传入该合同的标签数据，用于显示，并可在该合同上修改或其他编辑）
      labelViewData: {
        type: [Array],
        default: () => {
          return []
        }
      }
    },
    components: {
      labelItem
    },
    data () {
      return {
        labelConfig: labelConfig,

        showLabel: {
          showName: '',
          labelId: ''
        },
        currentView: '',
        labelData: [],       // 将要提交的所有标签数据
        activeTagObj: {
          name: '',
          labelId: ''
        }
      }
    },
    created () {
      this.labelData = this.labelViewData   // 组件内部维持一个标签数据（labelData）,用于显示
      this.$emit('getLabelData', this.labelData) // 将传入的标签数据（即单独请求的该合同的标签数据）传到外部的标签数据（该数据为要提交的数据）
    },
    mounted () {
      // 此动作用于点击其他区域时清除标签内动态生成的删除按钮
      let vm = this
      document.onclick = () => {
        vm.removeElementsByClass('dele')
      }
    },
    directives: directive,
    watch: {
      // 异步请求标签数据时（防止数据未请求完成时，渲染不了标签），并监听数据变化，整合到待提交标签数据中
      labelViewData () {
        this.labelData = this.labelViewData
        this.$emit('getLabelData', this.labelData)
      },
      item (nItem) {
        // 单标签，类型为number
        if (typeof nItem === 'number') {
          this.showLabel.labelId = ''
          for (let i = 0; i < this.labelConfig.length; i++) {
            if (this.labelConfig[i].type === nItem) {
              this.activeTagObj = this.labelConfig[i]
              this.currentView = 'labelItem'
              return
            }
          }
        } else {
          if (nItem.typeId === 2) {
//           类型为对象时且标签类型为选项标签时，组装后台和本地需要的数据
            this.activeTagObj = {
              type: nItem.type,
              name: nItem.optionName,
              titleName: nItem.labelName,
              labelCode: nItem.labelCode,
              code: nItem.code,
              shape: 3
            }
            this.currentView = 'labelItem'
          } else {
//           类型为对象时且标签类型为文本标签时，组装后台和本地需要的数据
            this.activeTagObj = {
              type: nItem.type,
              name: nItem.name,
              labelId: nItem.labelId ? nItem.labelId : '',
              shape: 0
            }
            this.currentView = 'labelItem'
          }
        }
      }
    },
    computed: {
      singleTagData () {
        let options = []
        this.labelData.forEach((item) => {
          if (item.labelType === 2) {
            item.labelContent.forEach((i) => {
              options.push(i)
            })
          } else {
            options.push(item)
          }
        })
        return options
      }
    },
    methods: {
      getStyleCom (item) {
        item.styleObj.width = (item.labelWidth || item.labelwidth) + 'px'
        item.styleObj.height = item.labelHigh + 'px'
        return item.styleObj
      },

      removeElementsByClass (className) {
        let elements = document.getElementsByClassName(className)
        while (elements.length > 0) {
          elements[0].parentNode.removeChild(elements[0])
        }
      },

      deTag (item, e) {
        if (this.isclose === false) {
          return
        }
        this.removeElementsByClass('dele')
        var x = e.offsetX
        var y = e.offsetY
        let oEm = document.createElement('em')
        oEm.innerHTML = '删 除'
        oEm.setAttribute('class', 'dele')
        oEm.onclick = () => { this.deleteTag(item) }
        oEm.style = 'left:' + x + 'px; top:' + y + 'px;'
        e.target.appendChild(oEm)
      },

      // 点击pdf后的回调
      getCoordinates ({val, x, y}) {
        let data = this.labelData
        val.pageIndex = this.page
//        alert(JSON.stringify(val))
        if (val.labelType === 2) {
          let hasCodeVal = data.find((item) => {
            return item.labelCode === val.labelCode
          })
          if (hasCodeVal) {
            delete val.labelId
            delete val.titleName
            hasCodeVal.labelContent.push(val)
          } else {
            let item = {}
            item.labelCode = val.labelCode
            item.pageIndex = val.pageIndex
            item.showName = val.titleName
            item.labelType = val.labelType
            delete val.labelId
            delete val.titleName
            item.labelContent = [val]
            this.labelData.push(item)
          }
        } else {
          this.labelData.push(val)
        }
        this.$emit('getLabelData', this.labelData)
      },

      // 删除文本标签
      deleteTag (item) {
        for (let j = 0; j < this.labelData.length; j++) {
          if (item.labelType === 2) {
            if (this.labelData[j].labelCode === item.labelCode) {
              if (this.labelData[j].labelContent.length === 1) {
                this.labelData.splice(j, 1)
                return
              } else {
                for (let i = 0; i < this.labelData[j].labelContent.length; i++) {
                  if (this.labelData[j].labelContent[i].xAxis === item.xAxis && this.labelData[j].labelContent[i].yAxis === item.yAxis) {
                    this.labelData[j].labelContent.splice(i, 1)
                    return
                  }
                }
              }
            }
          } else {
            if (this.labelData[j].showName === item.showName && this.labelData[j].xAxis === item.xAxis && this.labelData[j].yAxis === item.yAxis) {
              this.labelData.splice(j, 1)
              this.$emit('getLabelData', this.labelData)
              return
            }
          }
        }
      },

      setSize (sizeObj) {
        for (let i = 0; i < this.labelData.length; i++) {
          let item = this.labelData[i]
          if (item.showName === sizeObj.orignTag.showName && item.xAxis === sizeObj.orignTag.left && item.yAxis === sizeObj.orignTag.top) {
            this.labelData[i].labelWidth = sizeObj.newWidth
            this.labelData[i].labelHigh = sizeObj.newHeight
            this.labelData[i].styleObj.width = sizeObj.newWidth + 'px'
            this.labelData[i].styleObj.height = sizeObj.newHeight + 'px'
            this.$emit('getLabelData', this.labelData)
            return
          }
        }
      }
    }
  }
</script>
<style>
  .dele {
    position: absolute;
    display: inline-block;
    width: 40px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    font-size: 12px;
    background: #6495ED;
    border: 1px solid #fff;
    border-radius: 2px;
    cursor: pointer;
  }
</style>
<style scoped>
  .label-view{
    position: relative;
    float: left;
    border: 1px solid #ccc;
    /*width: 889.5px;*/
    /*height:1263.5px;*/
    width: 100%;
    height: 100%;
  }
  .label-view .tag {
    position: absolute;
    z-index: 999;
    top: 0;
    display: none;
  }
  .labelCon{
    position: absolute;
    width: 100%;
    height:100%;
    top:0;
    left: 0;
    text-align: center;
    line-height: 100px;
    color: #fff;
    font-size: 12px
  }
  .close {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    position: absolute;
    top: -10px;
    right: -10px;
    background: coral;
    color: #fff;
    transform: rotateZ(45deg);
    text-align: center;
    line-height: 20px;
    cursor: pointer;
  }
  i{
    font-style: normal;
  }
</style>
