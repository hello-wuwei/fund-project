/**
 * Created by Administrator on 2017/12/15.
 */
// 重新确定标签坐标，不同标签有不同坐标取值（左下角或左上角）
const drawCoordinate = (labelType) => {
  switch (labelType) {
    case 7:
      return {
        x: 10,
        y: 150
      }
    case 11:
      return {
        x: 10,
        y: 150
      }
    case 15:
      return {
        x: 10,
        y: 150
      }
    case 1:
      return {
        x: 10,
        y: 10
      }
    case 5:
      return {
        x: 10,
        y: 60
      }
    case 21:
      return {
        x: 10,
        y: 60
      }
    case 19:
      return {
        x: 10,
        y: 60
      }
    case 23:
      return {
        x: 10,
        y: 150
      }
    case 25:
      return {
        x: 10,
        y: 150
      }
    case 27:
      return {
        x: 10,
        y: 150
      }
    case 2:              // 选项
      return {
        x: 10,
        y: 10
      }
    default:
      return {}
  }
}
export default drawCoordinate
