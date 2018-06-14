/**
 * Created by Administrator on 2018/5/28.
 */
export const addMeta = (routerArry, moudleName) => {
  routerArry.forEach((item) => {
    item.meta = {
      moudlename: moudleName
    }
  })
}
