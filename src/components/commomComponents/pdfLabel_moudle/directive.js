/**
 * Created by Administrator on 2018/2/24.
 */
import drawCoord from './config/label_type_position'
const directive = {
  move: {
    // 指令的定义
    bind: function (el, binding) {
      window.onmousemove = function (e) {
        // 当鼠标移到已打标签上时，隐藏拖动标签
        if ((e.target.id !== 'img')) {
          el.style.display = 'none'
          return
        }

        e.target.style.cursor = 'none' // 隐藏鼠标
        el.style.display = 'block' // 恢复拖动标签
        el.style.left = e.offsetX + 10 + 'px' // 设置拖动标签位置，距离鼠标位置右侧10px
        el.style.top = e.offsetY + 10 + 'px' // 设置拖动标签位置，距离鼠标位置下侧10px
      }
      window.onclick = function (e) {
        // 当鼠标点击到打标签区域时（img区域）
        if (e.target.id === 'img') {
          let tagData = JSON.parse(el.getAttribute('tagData')) // 获取当前拖动标签的数据
          let data = { // 构造需要提交到后台的数据
            val: {
              xAxis: e.offsetX + drawCoord(tagData.type).x, // 距离合同区域左边的距离（xAxis）
              yAxis: e.offsetY + drawCoord(tagData.type).y, // 距离合同区域顶边的距离（yAxis）
              labelWidth: parseInt(el.style.width), // 标签宽度
              labelHigh: parseInt(el.style.height), // 标签高度
              labelType: tagData.type, // 标签类型
              labelId: tagData.labelId || '', // 标签id（仅文本标签需要，也只有文本标签会带有该字段，没有则为空）
              showName: tagData.name, // 标签名称
              shape: tagData.shape, // 标签形状（前端回填编辑时本地需要用于渲染，后台不需要）
              titleName: tagData.titleName || '', // 选项标签名（如性别、爱好等多选类型），其他类型标签为空
              labelCode: tagData.labelCode || '', // 标签编码，仅选项标签需要（前端本地逻辑需要）
              code: tagData.code || '', // 标签编码，仅选项标签需要（后台需要）
              styleObj: {           // 样式对象，用于前端本地渲染
                position: 'absolute',
                width: el.style.width,
                height: el.style.height,
                top: e.offsetY + 10 + 'px',
                left: e.offsetX + 10 + 'px'
              }
            },
            x: e.offsetX,
            y: e.offsetY
          }
          binding.value(data)
        }
      }
    }
  },
  scale: {
    // 用于缩放文本标签
    bind: (el, binding) => {
      let tagData = JSON.parse(el.getAttribute('tagData'))
      if (tagData.type !== 1) {
        return
      }
      el.onmousedown = function (e) {
        let orignTag = {showName: el.getAttribute('showName'), top: parseInt(el.style.top), left: parseInt(el.style.left)}
        let right = parseInt(el.style.width) - e.offsetX
        let bottom = parseInt(el.style.height) - e.offsetY
        document.onmousemove = function(e) {
          if (right < 20 && bottom < 20) {
            el.style.width = e.offsetX + right + 'px'
            el.style.height = e.offsetY + bottom + 'px'
          }
          // container.style.left = event.clientX - offLX; //设置block的X坐标
          // container.style.top = event.clientY - offLY; //设置block的Y坐标
        }
        document.onmouseup = function(e) {
          document.onmousemove = null
          binding.value({orignTag: orignTag, newWidth: parseInt(el.style.width), newHeight: parseInt(el.style.height)})
        } // 鼠标弹起
      }
    }
  }
}

export default directive
