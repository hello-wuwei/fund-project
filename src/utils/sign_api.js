/**
 * Created by Administrator on 2018/3/22.
 */

var CryptoAgent = ''
var XACAtlCtrl = ''
/*  读取UKEY编号 */
export const onLoadKey = () => {
  let kDiv = document.createElement('div')
  kDiv.style.display = 'none'
  kDiv.innerHTML = '<object id=\'XACAtlCtrl\' name=\'XACAtlCtrl\' classid=\'CLSID:57618A3D-7655-4C46-83B5-6FAAF215F458\'></object>'
  document.body.appendChild(kDiv)
  XACAtlCtrl = document.getElementById('XACAtlCtrl')
}

export const GetUkeySN = () => {
  console.log(XACAtlCtrl)
  let rv = XACAtlCtrl.GetUkeySN()
  console.log(rv)
  return rv
}

export const OnLoad = () => {
  try {
    var eDiv = document.createElement('div')
    if (navigator.appName.indexOf('Internet') >= 0 || navigator.appVersion.indexOf('Trident') >= 0) {
      if (window.navigator.cpuClass === 'x86') {
        eDiv.innerHTML = '<object id=\'CryptoAgent\' codebase="/static/CryptoKit.ToToDi.x86.cab" classid=\'clsid:5635B01D-C661-4ACE-B997-EECFA63BD388\' ></object>'
      } else {
        eDiv.innerHTML = '<object id=\'CryptoAgent\' codebase="/static/CryptoKit.ToToDi.x64.cab" classid=\'clsid:63F9892E-D854-476E-A839-C8BA79254EC1\' ></object>'
      }
    } else {
      eDiv.innerHTML = '<embed id=\'CryptoAgent\' type=\'application/npCryptoKit.Ultimate.x86\' style=\'height: 0px; width: 0px\'>'
    }
    document.body.appendChild(eDiv)
    // onLoadKey()
  } catch (e) {
    alert(e)
  }
  CryptoAgent = document.getElementById('CryptoAgent')
  // console.log(CryptoAgent)
}

/*  获取签章证书信息 */
export const GetSignCertInfo = () => {
  if (!(navigator.appName.indexOf('Internet') >= 0 || navigator.appVersion.indexOf('Trident') >= 0)) {
    alert('使用UKEY读取证书信息，请使用IE浏览器')
    return false
  }
  if (!SelectCertificate()) {
    return false
  }
  try {
    let InfoContent = ''

    // certificate information identifier
    // InfoTypeID = GetSelectedItemValue('InfoTypeID')
    InfoContent = CryptoAgent.GetSignCertInfo('SubjectDN')
    // Opera浏览器，NPAPI函数执行结果为false时，不能触发异常，需要自己判断返回值。
    if (!InfoContent) {
      let errorDesc = CryptoAgent.GetLastErrorDesc()
      alert(errorDesc)
      return false
    }
    let certInfo = {
      SubjectDN: CryptoAgent.GetSignCertInfo('SubjectDN'),
      SubjectCN: CryptoAgent.GetSignCertInfo('SubjectCN'),
      IssuerDN: CryptoAgent.GetSignCertInfo('IssuerDN'),
      SerialNumber: CryptoAgent.GetSignCertInfo('SerialNumber'),
      CSPName: CryptoAgent.GetSignCertInfo('CSPName'),
      CertType: CryptoAgent.GetSignCertInfo('CertType')
      // GetUkeySN: GetUkeySN()
    }
    return certInfo
    // document.getElementById('CertInfoContent').value = InfoContent
  } catch (e) {
    let errorDesc = CryptoAgent.GetLastErrorDesc()
    alert(errorDesc)
    return false
  }
}

export const SelectCertificate = () => {
  try {
    // document.getElementById('SelectCertResult').value = ''
    // let subjectDNFilter = ''
    // let issuerDNFilter = ''
    // let serialNumFilter = ''
    let bSelectCertResult = ''
    // subjectDNFilter = document.getElementById('SubjectDNFilter').value
    // issuerDNFilter = document.getElementById('IssuerDNFilter').value
    // serialNumFilter = document.getElementById('SerialNumFilter').value

    bSelectCertResult = CryptoAgent.SelectCertificate('', '', '', 'CFCA FOR UKEY CSP v1.1.0')
    // Opera浏览器，NPAPI函数执行结果为false时，不能触发异常，需要自己判断返回值。
    if (!bSelectCertResult) {
      let errorDesc = CryptoAgent.GetLastErrorDesc()
      alert(errorDesc)
      return false
    }
    return bSelectCertResult
  } catch (e) {
    let errorDesc = CryptoAgent.GetLastErrorDesc()
    alert(errorDesc)
    return false
  }
}
