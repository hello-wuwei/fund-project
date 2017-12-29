/**
 * Created by Administrator on 2017/12/15.
 */
const drawCoordinate = (labelType) => {
  switch (labelType) {
    case '7':
      return {
        x: 10,
        y: 150
      }
    case '11':
      return {
        x: 10,
        y: 150
      }
    case '15':
      return {
        x: 10,
        y: 150
      }
    case '1':
      return {
        x: 10,
        y: 40
      }
    case '5':
      return {
        x: 10,
        y: 110
      }
    default:
      return {}
  }
}
export default drawCoordinate
