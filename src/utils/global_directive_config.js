/**
 * Created by Administrator on 2017/12/1.
 */
import drawCoord from '../config/label_type_position'
const resiter = (Vue) => {
  Vue.directive('move', {
    bind: function (el, binding) {
      window.onmousemove = function (e) {
        if ((e.target.id !== 'img')) {
          el.style.display = 'none'
          return
        }

        e.target.style.cursor = 'none'
        el.style.display = 'block'
        el.style.left = e.offsetX + 10 + 'px'
        el.style.top = e.offsetY + 10 + 'px'
      }
      window.onclick = function (e) {
        if (e.target.id === 'img') {
          switch (el.getAttribute('tagName')) {
            case 'moudleTag':
              let moudleChildrenObj = []
              console.log(el.childNodes)
              el.childNodes.forEach((node, index) => {
                moudleChildrenObj.push({
                  xAxis: e.offsetX + 10 + parseInt(node.style.left),
                  yAxis: e.offsetY + 10 + parseInt(node.style.top),
                  labelwidth: parseInt(node.style.width),
                  labelHigh: parseInt(node.style.height),
                  labelType: node.getAttribute('labelType'),
                  showName: node.getAttribute('showName'),
                  tagName: node.getAttribute('tagName'),
                  group_id: node.getAttribute('group-id'),
                  styleObj: {
                    position: 'absolute',
                    width: node.style.width,
                    height: node.style.height,
                    left: e.offsetX + 10 + parseInt(node.style.left) + 'px',
                    top: e.offsetY + 10 + parseInt(node.style.top) + 'px'
                  }
                })
              })
              binding.value({
                val: moudleChildrenObj,
                x: e.offsetX,
                y: e.offsetY
              })
              break
            default:
              binding.value({
                val: {
                  xAxis: e.offsetX + drawCoord(el.getAttribute('labelType')).x,
                  yAxis: e.offsetY + drawCoord(el.getAttribute('labelType')).y,
                  labelwidth: parseInt(el.style.width),
                  labelHigh: parseInt(el.style.height),
                  labelType: el.getAttribute('labelType'),
                  labelId: el.getAttribute('labelId'),
                  showName: el.getAttribute('tagName') === 'optionTag' ? '' : el.getAttribute('showName'),
                  tagName: el.getAttribute('tagName'),
                  group_id: el.getAttribute('group-id'),
                  styleObj: {
                    position: 'absolute',
                    width: el.style.width,
                    height: el.style.height,
                    top: e.offsetY + 10 + 'px',
                    left: e.offsetX + 10 + 'px'
                  }
                },
                x: e.offsetX,
                y: e.offsetY
              })
          }
        }
      }
    }
  })

  Vue.directive('drag', {
    bind: function (el, binding) {
      let oDiv = el   // 当前元素
      oDiv.onmousedown = function (e) {
        // 鼠标按下，计算当前元素距离可视区的距离
        let disX = e.clientX - oDiv.offsetLeft
        let disY = e.clientY - oDiv.offsetTop
        document.onmousemove = function (e) {
          // 通过事件委托，计算移动的距离
          let l = e.clientX - disX
          let t = e.clientY - disY
          // 移动当前元素
          oDiv.style.left = l + 'px'
          oDiv.style.top = t + 'px'
          // 将此时的位置传出去
          binding.value({x: e.pageX, y: e.pageY})
        }
        document.onmouseup = function (e) {
          document.onmousemove = null
          document.onmouseup = null
        }
      }
    }
  })
}
export default resiter
