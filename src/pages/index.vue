<template lang="html">
  <div class="container">
    <div class="header flex">
      <div class="flex-item logo">
        <img :src="logo"/>
      </div>
      <div class="">
        <span class="hot-tel"><i class="el-icon-service"></i>客服热线：400-700-9665</span>
        <router-link to="/login">
          <el-button type="primary">登录</el-button>
        </router-link>
      </div>
    </div>
    <div class="main">
      <div class="banner">
        <div class="banner-inner">
          <img class="name" :src="totodi"/>
          <p class="en-titile">Financial RegTech Specialist</p>
          <div class="content">
            妥妥递致力于成为金融监管部门和金融机构的一座桥梁，用技术辅助监管部门更高效的<br/>
            执行监管意愿，提升传统金融机构的行业内竞争力，为金融行业提供高效合规的金融科技解决方案
          </div>
        </div>
      </div>
      <div class="text-box">
        <img class="title" :src="zhgl"/>
        <div class="content">
          致力于帮助监管机构提升金融行业的合规性，提升金融机构运<br>
          营效率，提升风险控制能力，提升终端投资者权益保障，并使得金融行业更加环保、绿色
        </div>
      </div>
      <div class="apollo">
        <div class="apollo-title">
          <img class="brand" :src="tuo">
          <h1 class="title">Apollo 阿波罗产品系</h1>
        </div>
        <div class="apollo-content">
          <h3>铸造合规和高效的金融销售体系</h3>
          <p>
            Apollo阿波罗产品系列，运用最先进的电子签约、合同管理和灵活双录技术，通过快速深入的监管政策研究及不断的技术革新，实现销售业务全程线上发布、审核、
            签署、管理等，实现销售留痕。同时拥有深入金融行业多年的专业团队，深度理解金融机构的业务流程，可协助金融机构优化传统销售流程，让整个销售过程更加便
            捷、灵活、合规、高效、环保
          </p>
        </div>
      </div>
      <div class="service">
        <img class="img" :src="service">
        <p class="text">Apollo阿波罗产品系列广泛运用于金融行业，其核心产品包括电子签约、合同管理和灵活双录系统，帮助金融机构满足监管合规要求</p>
        <div class="service-wrapper">
          <el-row :gutter="110">
            <el-col :span="12">
              <div class="service-item">
                <img :src="zhang">
                <div class="item-right">
                  <h3>合同管理/电子签章 解决方案</h3>
                  <p>提供电子合同线上签约解决方案，高效便捷的达到随时签约的目的。提供电子合同在线编辑，电子合同上传与管理，多人会签，在线审批，合同验真，批量签章等功能，随时随地，想签就签</p>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="service-item">
                <img :src="video">
                <div class="item-right">
                  <h3>录音录像（双录）系统</h3>
                  <p>录音录像（双录）系统，包含现场双录、远程双录、离线双录及双录后台管理系统，覆盖金融机构线上线下所有用户群体，是既符合监管要求，又满足业务需求的完整双录体系</p>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="produce">
        <div class="center-img"></div>
        <div class="produce-wrapper">
          <div class="produce-line" style=" border-bottom: 1px solid #C7D4E3;">
            <div class="produce-item left">
              <div class="left"><img :src="produce1"></div>
              <div class="right" style="margin-left: 30px;">
                <h4>助力合规</h4>
                <p>帮助金融机构达成整个销售过程中的合规问题，拥抱监管要求，合规前行</p>
              </div>
            </div>
            <div class="produce-item right">
              <div class="left">
                <h4>技术先进</h4>
                <p>双录系统超低延时、抗丢包、抗抖动、弱环境仍可通信；电子合同防篡改、功能齐全、安全可靠</p>
              </div>
              <div class="right" style="margin-left: 30px;"><img :src="produce2"></div>
            </div>
          </div>
          <div class="produce-line">
            <div class="produce-item left">
              <div class="left"><img :src="produce3"></div>
              <div class="right" style="margin-left: 30px;">
                <h4>深入行业</h4>
                <p>团队深入金融行业多年，了解金融机构业务流程及关注点，深知展业员工与客户需求，从而定制最优的一站式科技解决方案</p>
              </div>
            </div>
            <div class="produce-item right">
              <div class="left">
                <h4>便捷高效</h4>
                <p>实现随时随地签约，可实现批量签署、在线审核，让整个销售流程与后台管理更加便捷、稳定、高效</p>
              </div>
              <div class="right" style="margin-left: 15px;"><img :src="produce4"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="scene">
        <div class="title">
          <h6>
            应用场景
          </h6>
          <p>我们的产品可运用于金融行业的多个领域，针对不同行业提供定制合规解决方案服务</p>
        </div>
        <div class="scene-wrapper">
          <el-row :gutter="35">
            <el-col :span="8">
              <div class="scene-item" :style="{backgroundImage: 'url(' + scene_xt + ')'}">
                <div class="name">信托</div>
                <figcaption class="uk-overlay-panel uk-overlay-slide-bottom useCover">
                  <h3>信托</h3>
                  <p>为信托行业提供专业的在线电子合同签署服务，深入信托行业签约场景，从产品发布到审批流程全程跟踪，高效完成信托产品合同电子化管理。</p>
                </figcaption>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="scene-item" :style="{backgroundImage: 'url(' + scene_zg + ')'}">
                <div class="name">资产管理</div>
                <figcaption class="uk-overlay-panel uk-overlay-slide-bottom useCover">
                  <h3>资产管理</h3>
                  <p>随着监管合规成本越来越高，资产管理公司也受到越来越多的监管要求，通过线上电子合同系统，解决其合规性需求，同时梳理业务流程，使其销售流程高效、安全、规范。</p>
                </figcaption>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="scene-item" :style="{backgroundImage: 'url(' + scene_ticket + ')'}">
                <div class="name">证券</div>
                <figcaption class="uk-overlay-panel uk-overlay-slide-bottom useCover">
                  <h3>证券</h3>
                  <p>由于互联网金融的快速发展，依托互联网完成证券电子合同签署的模式，已经在互联网金融中得到了广泛的使用，有效性地解决了地域差异、签约流程漫长等问题，提高企业运营效率。</p>
                </figcaption>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="35" style="margin-top: 35px">
            <el-col :span="8">
              <div class="scene-item" :style="{backgroundImage: 'url(' + scene_bank + ')'}">
                <div class="name"> 银行</div>
                <figcaption class="uk-overlay-panel uk-overlay-slide-bottom useCover">
                  <h3>银行</h3>
                  <p>传统银行正在面临转型，互联网+银行模式正在兴起，通过电子签约系统的方式，将提高银行行业个人借贷和手机借贷的运行效率和法律效力，通过安全高效的电子签约模式，给借贷双方带来双赢。</p>
                </figcaption>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="scene-item" :style="{backgroundImage: 'url(' + scene_tg + ')'}">
                <div class="name">托管</div>
                <figcaption class="uk-overlay-panel uk-overlay-slide-bottom useCover">
                  <h3>托管</h3>
                  <p>
                    托管业务涉及投资方、委托方，托管方三方，且在业务签订过程中常出现异地签约，通过妥妥递线上签约系统可以实现异地多方在线签署，并且整个过程安全、高效，防止合同被篡改、信息泄露，保障投资人和委托人、托管方三方权益。</p>
                </figcaption>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="scene-item" :style="{backgroundImage: 'url(' + scene_xt + ')'}">
                <div class="name"> 私募基金</div>
                <figcaption class="uk-overlay-panel uk-overlay-slide-bottom useCover">
                  <h3>私募基金</h3>
                  <p>由于监管合规性要求，私募基金签约模式也正在向线上无纸化电子合同转型，由于私募基金客户信息私密，传统纸质合同线下签约方式有信息泄露、被篡改等风险，通过电子合同可以解决其安全性、合规性的问题。</p>
                </figcaption>
              </div>
            </el-col>
          </el-row>
        </div>


      </div>
      <div class="investor">
        <h2 class="title">投资机构</h2>
        <div class="investor-wrapper">
          <el-row :gutter="70" >
            <el-col :span="6">
              <img :src="investor1"/>
            </el-col>
            <el-col :span="6">
              <img :src="investor2"/>
            </el-col>
            <el-col :span="6">
              <img :src="investor3"/>
            </el-col>
            <el-col :span="6">
              <img :src="investor4"/>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-wrapper">
        <el-row :gutter="70" >
          <el-col :span="5">
            <div class="footer-column">
              <h5>技术产品</h5>
              <p><a href="javascript:void(0)">合同管理／电子签章</a></p>
              <p><a href="javascript:void(0)">录音录像（双录）系统</a></p>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="footer-column">
              <h5>解决方案</h5>
              <p><a href="javascript:void(0)">信托</a></p>
              <p><a href="javascript:void(0)">资产管理</a></p>
              <p><a href="javascript:void(0)">证券</a></p>
              <p><a href="javascript:void(0)">银行</a></p>
              <p><a href="javascript:void(0)">托管</a></p>
              <p><a href="javascript:void(0)">私募基金</a></p>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="footer-column">
              <h5>合作伙伴</h5>
              <p><a href="javascript:void(0)">第三方合作伙伴</a></p>
              <p><a href="https://www.totodi.com/index.html#touzijg">投资方介绍</a></p>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="footer-column">
              <h5>关于我们</h5>
              <p><a href="https://www.totodi.com/company.html">公司介绍</a></p>
              <p><a href="https://www.totodi.com/teamInfo.html">创始团队</a></p>
              <p><a href="https://www.totodi.com/join_us.html">加入我们</a></p>
              <p><a href="https://www.totodi.com/callme.html">联系我们</a></p>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="footer-column">
              <div class="clearfix">
                <span class="left"><img :src="phone" alt="" style="height: 20px;"></span>
                <span class="left" style="margin-left: 5px;font-size: 16px;margin-bottom: 30px;">客服热线：028-61989869</span>
              </div>
              <p style="padding-top: 30px;font-size: 14px">工作时间：9:30-18:00</p>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="footerBottom">四川妥妥递科技有限公司&nbsp; &nbsp; 版权所有 ©2016&nbsp;&nbsp; 蜀ICP备15027876</div>
    </div>
  </div>

</template>

<script>
  export default {
    data () {
      return {
        logo: require('images/logo.png'),
        totodi: require('images/ttdkj.png'),
        zhgl: require('images/zhgl.png'),
        tuo: require('images/tuo.png'),
        service: require('images/fwyy.png'),
        zhang: require('images/zhang.png'),
        video: require('images/video.png'),
        produce1: require('images/index/1.png'),
        produce2: require('images/index/2.png'),
        produce3: require('images/index/3.png'),
        produce4: require('images/index/4.png'),
        scene_xt: require('images/index/xt.png'),
        scene_smjj: require('images/index/smjj.png'),
        scene_bank: require('images/index/bank.png'),
        scene_tg: require('images/index/tg.png'),
        scene_zg: require('images/index/zg.png'),
        scene_ticket: require('images/index/ticket.png'),
        investor1: require('images/index/b1.png'),
        investor2: require('images/index/b2.png'),
        investor3: require('images/index/b3.png'),
        investor4: require('images/index/b4.png'),
        phone: require('images/index/phone_2.png')
      }
    },
    methods: {}
  }
</script>

<style lang="less" scoped type="text/less">

  .container {
    .header {
      padding: 1.25rem 0;
      width: 1180px;
      margin: auto;
      .logo {
        width: 8.5rem;
        height: 2.5rem;
      }
      .hot-tel {
        padding-right: 35px;
      }
    }
    .main {
      .banner {
        height: 600px;
        background-image: url('../assets/images/bg.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        padding: 1px 0;
        .banner-inner {
          width: 1190px;
          height: 380px;
          background: rgba(255, 255, 255, .6);
          margin: 110px auto;
          text-align: center;
          padding: 1px;
          .name {
            margin-top: 80px;
          }
          .en-titile {
            width: 688px;
            margin: 25px auto 35px;
            line-height: 24px;
            color: #444;
            font-size: 16px;
          }
          .content {
            line-height: 1.5rem;
            padding: 25px 0 35px;
          }
        }
      }
      .text-box {
        text-align: center;
        .title {
          margin: 100px 0 40px;
        }
        .content {
          line-height: 1.5rem;
          padding: 0 0 100px;
        }
      }
      .apollo {
        height: 480px;
        background-image: url(../assets/images/keji_bg.png);
        background-size: cover;
        background-repeat: no-repeat;
        padding: 1px;
        overflow: hidden;
        .apollo-title {
          overflow: hidden;
          height: 104px;
          width: 480px;
          margin: 65px auto 0;
          .brand {
            width: 100px;
            margin-right: 40px;
            float: left;

          }
          .title {
            height: 100px;
            line-height: 100px !important;
            font-family: "microsoft yahei";
            font-size: 36px;
            color: #333333;
            letter-spacing: 0;
            line-height: 32px;
            float: left;
            font-weight: normal;
            margin: 0;
          }
        }
        .apollo-content {
          width: 1190px;
          margin: 94px auto 102px;
          text-align: left;
          .h3 {
            margin-bottom: 30px;
            font-size: 20px;
            color: #333333;
            letter-spacing: 2px;
          }
        }
      }
      .service {
        text-align: center;
        width: 1190px;
        margin: auto;
        .img {
          margin: 100px 0 40px;
        }
        .text {
          width: 580px;
          font-family: "microsoft yahei";
          font-size: 16px;
          line-height: 24px;
          color: #333333;
          letter-spacing: 0;
          margin: 0 auto 100px;
        }
        .service-item {
          img {
            width: 110px;
            margin-top: 70px;
          }
          .item-right {
            margin-left: 60px;
            color: #333333;
            text-align: left;
            float: right;
            h3 {
              font-size: 20px;
              font-weight: bold;
            }
            p {
              display: inline-block;
              line-height: 30px;
              width: 370px;
              font-size: 16px;
              margin-top: 44px;
            }
          }
        }
      }
      .produce {
        height: 640px;
        position: relative;
        background-color: #E4F0FE;
        overflow: hidden;
        .center-img {
          width: 440px;
          height: 440px;
          background-image: url(../assets/images/circle.png);
          background-repeat: no-repeat;
          background-size: 100%;
          position: absolute;
          z-index: 999;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          margin: auto;
        }
        .produce-wrapper {
          width: 1190px;
          border: 1px solid #C7D4E3;
          margin: 130px auto;
          .produce-line {
            overflow: hidden;
            height: 190px;
            .produce-item {
              overflow: hidden;
              padding: 25px;
              h4 {
                font-weight: normal;
                font-size: 20px;
                color: #333;
              }
              p {
                font-size: 14px;
                line-height: 30px;
                color: #555;
                margin-top: 20px;
                display: inline-block;
                width: 216px;
              }
            }
          }
          .left {
            float: left;
          }
          .right {
            float: right;
          }
        }
      }
      .scene {
        .title {
          text-align: center;
          h6 {
            font-family: "microsoft yahei";
            font-size: 36px;
            color: #333333;
            letter-spacing: 0;
            line-height: 67px;
            margin: 100px 0 40px;
          }
          p {
            font-family: "microsoft yahei";
            font-size: 16px;
            line-height: 24px;
            color: #333333;
            letter-spacing: 0;
            margin: 0 auto 100px;
            max-width: 688px;
          }
        }
        .scene-wrapper {
          width: 1160px;
          margin: auto;
          figcaption {
            display: none;
          }
          .scene-item {
            height: 260px;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            position: relative;
            .name {
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              height: 60px;
              background: rgba(0, 0, 0, 0.5);
              text-align: center;
              color: #fff;
              line-height: 60px;
              font-size: 18px;
            }
          }
        }
      }
      .investor {
        height: 570px;
        overflow: hidden;
        margin-top: 65px;
        background: #e0edfc;
        .title {
          font-size: 36px;
          color: #333333;
          letter-spacing: 0;
          text-align: center;
          line-height: 67px;
          margin: 100px 0 80px;
        }
        .investor-wrapper{
          width: 1190px;
          margin: auto;
        }
      }
    }
    .footer {
      height: 1280px;
      background-image: url('../assets/images/index/home_foot_bg.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      padding: 1px 0;
      position: relative;
      .footer-wrapper{
        margin: 850px auto 0;
        color: #fff;
        width: 1190px;
        .footer-column{
          h5{
            font-size: 18px;
            color: #fff;
            margin: 0 0 30px;
          }
          p{
            line-height: 35px;
            a{
              font-size: 14px;
              color: #ccc;

            }
          }
        }
      }
      .footerBottom {
        position: absolute;
        bottom: 50px;
        text-align: center;
        width: 100%;
        font-size: 12px;
        color: #ccc;
      }
    }
  }

</style>
