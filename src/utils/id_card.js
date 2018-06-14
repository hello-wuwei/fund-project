/**
 * Created by Administrator on 2018/1/29.
 */
export const validateIdCard = (card) => {
  // 验证身份证的正确性
  // 7－9－10－5－8－4－2－1－6－3－7－9－10－5－8－4－2
  if (!!card && /^[1-9]\d{16}[0-9Xx]$/.test(card)) {
    let arrCard = card.split('')
    let total = 0
    total = arrCard[0] * 7 +
      arrCard[1] * 9 +
      arrCard[2] * 10 +
      arrCard[3] * 5 +
      arrCard[4] * 8 +
      arrCard[5] * 4 +
      arrCard[6] * 2 +
      arrCard[7] * 1 +
      arrCard[8] * 6 +
      arrCard[9] * 3 +
      arrCard[10] * 7 +
      arrCard[11] * 9 +
      arrCard[12] * 10 +
      arrCard[13] * 5 +
      arrCard[14] * 8 +
      arrCard[15] * 4 +
      arrCard[16] * 2
    // 余数只可能有0－1－2－3－4－5－6－7－8－9－10这11个数字。
    // 其分别对应的最后一位身份证的号码为1－0－X －9－8－7－6－5－4－3－2
    let endNum = ''
    switch (total % 11) {
      case 0 :
        endNum = 1
        break
      case 1 :
        endNum = 0
        break
      case 2 :
        endNum = 'X'
        break
      case 3 :
        endNum = 9
        break
      case 4 :
        endNum = 8
        break
      case 5 :
        endNum = 7
        break
      case 6 :
        endNum = 6
        break
      case 7 :
        endNum = 5
        break
      case 8 :
        endNum = 4
        break
      case 9 :
        endNum = 3
        break
      case 10 :
        endNum = 2
        break
    }
    return arrCard[17].toUpperCase() === endNum.toString()
  } else {
    return false
  }
}
