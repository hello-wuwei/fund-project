<template lang="html">
  <div class="login">
    <login-header login-title="私募基金管理人账号注册"></login-header>
    <div class="login-con">
      <div class="">
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
          <el-form-item prop="organization">
            <el-autocomplete
              class="inline-input"
              v-model="loginForm.organization"
              :fetch-suggestions="querySearch"
              placeholder="选择注册机构"
              :trigger-on-focus="false"
              @select="handleSelect"
            >
              <i slot="prefix" class="icon-org"></i>
            </el-autocomplete>
          </el-form-item>
          <el-form-item prop="userName">
            <el-input v-model="loginForm.userName" :maxlength=11 placeholder="手机号" prefix-icon="icon-user">
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"
                      prefix-icon="icon-password"></el-input>
          </el-form-item>
          <el-form-item prop="password2">
            <el-input v-model="loginForm.password" type="password" placeholder="请再次输入密码"
                      prefix-icon="icon-password"></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-row :gutter="10">
              <el-col :span="14">
                <el-input v-model="loginForm.password" type="password" placeholder="请输入验证码"></el-input>
              </el-col>
              <el-col :span="10">
                <el-button type="primary" class="square">获取验证码</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item style="margin-bottom: 3px;">
            <el-checkbox label="阅读并同意"></el-checkbox>
            <a href="https://www.totodi.com/index.html">《妥妥递在线服务协议》</a>
          </el-form-item>
          <el-form-item>
            <el-button class="square" type="primary" :loading="loginBtnLoading"
                       @click="_onSubmit('loginFormRef')">{{loginBtnText}}
            </el-button>
            <div style="text-align: right;color:#777786; padding-top: .3rem">
              <router-link to="/revise_password">
                忘记密码？
              </router-link>
            </div>
          </el-form-item>
        </el-form>
      </div>

    </div>
  </div>
</template>

<script>
  import loginHeader from './header'

  export default {
    components: {
      'login-header': loginHeader
    },
    data () {
      let validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账号!'))
        } else if (!/^1\d{10}$/.test(value)) {
          callback(new Error('请输入正确的账号'))
        }
      }
      return {
        loginBtnLoading: false,
        loginBtnText: '同意并注册',
        restaurants: [],
        type: 1,
        loginForm: {
          organization: '',
          userName: '',
          password: ''
        },
        loginFormRules: {
          organization: [
            {required: true, message: '请输入机构名称11 wq ', trigger: 'blur'}
          ],
          userName: [
            {required: true, message: '请输入登录账号', trigger: 'blur'},
            {validator: validateName, trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入登录密码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      querySearch (queryString, cb) {
        console.log(queryString)
        var restaurants = this.restaurants
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
        // 调用 callback 返回建议列表的数据

        if (results.length > 10) {
          results.length = 10
        }
        console.log(results)
        cb(results)
      },

      createFilter (queryString) {
        return restaurant => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1)
        }
      },
      loadAll () {
        return [
          {'value': '三全鲜食（北新泾店）', 'address': '长宁区新渔路144号', id: 12},
          {'value': 'Hot honey 首尔炸鸡（仙霞路）', 'address': '上海市长宁区淞虹路661号'},
          {'value': '新旺角茶餐厅', 'address': '上海市普陀区真北路988号创邑金沙谷6号楼113'},
          {'value': '泷千家(天山西路店)', 'address': '天山西路438号'},
          {'value': '胖仙女纸杯蛋糕（上海凌空店）', 'address': '上海市长宁区金钟路968号1幢18号楼一层商铺18-101'},
          {'value': '贡茶', 'address': '上海市长宁区金钟路633号'},
          {'value': '豪大大香鸡排超级奶爸', 'address': '上海市嘉定区曹安公路曹安路1685号'},
          {'value': '茶芝兰（奶茶，手抓饼）', 'address': '上海市普陀区同普路1435号'},
          {'value': '十二泷町', 'address': '上海市北翟路1444弄81号B幢-107'},
          {'value': '星移浓缩咖啡', 'address': '上海市嘉定区新郁路817号'},
          {'value': '阿姨奶茶/豪大大', 'address': '嘉定区曹安路1611号'},
          {'value': '新麦甜四季甜品炸鸡', 'address': '嘉定区曹安公路2383弄55号'},
          {'value': 'Monica摩托主题咖啡店', 'address': '嘉定区江桥镇曹安公路2409号1F，2383弄62号1F'},
          {'value': '浮生若茶（凌空soho店）', 'address': '上海长宁区金钟路968号9号楼地下一层'},
          {'value': 'NONO JUICE  鲜榨果汁', 'address': '上海市长宁区天山西路119号'},
          {'value': 'CoCo都可(北新泾店）', 'address': '上海市长宁区仙霞西路'},
          {'value': '快乐柠檬（神州智慧店）', 'address': '上海市长宁区天山西路567号1层R117号店铺'},
          {'value': 'Merci Paul cafe', 'address': '上海市普陀区光复西路丹巴路28弄6号楼819'},
          {'value': '猫山王（西郊百联店）', 'address': '上海市长宁区仙霞西路88号第一层G05-F01-1-306'},
          {'value': '枪会山', 'address': '上海市普陀区棕榈路'},
          {'value': '纵食', 'address': '元丰天山花园(东门) 双流路267号'},
          {'value': '钱记', 'address': '上海市长宁区天山西路'},
          {'value': '壹杯加', 'address': '上海市长宁区通协路'},
          {'value': '唦哇嘀咖', 'address': '上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元'},
          {'value': '爱茜茜里(西郊百联)', 'address': '长宁区仙霞西路88号1305室'},
          {'value': '爱茜茜里(近铁广场)', 'address': '上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺'},
          {'value': '鲜果榨汁（金沙江路和美广店）', 'address': '普陀区金沙江路2239号金沙和美广场B1-10-6'},
          {'value': '开心丽果（缤谷店）', 'address': '上海市长宁区威宁路天山路341号'},
          {'value': '超级鸡车（丰庄路店）', 'address': '上海市嘉定区丰庄路240号'},
          {'value': '妙生活果园（北新泾店）', 'address': '长宁区新渔路144号'},
          {'value': '香宜度麻辣香锅', 'address': '长宁区淞虹路148号'},
          {'value': '凡仔汉堡（老真北路店）', 'address': '上海市普陀区老真北路160号'},
          {'value': '港式小铺', 'address': '上海市长宁区金钟路968号15楼15-105室'},
          {'value': '蜀香源麻辣香锅（剑河路店）', 'address': '剑河路443-1'},
          {'value': '北京饺子馆', 'address': '长宁区北新泾街道天山西路490-1号'},
          {'value': '饭典*新简餐（凌空SOHO店）', 'address': '上海市长宁区金钟路968号9号楼地下一层9-83室'},
          {'value': '焦耳·川式快餐（金钟路店）', 'address': '上海市金钟路633号地下一层甲部'},
          {'value': '动力鸡车', 'address': '长宁区仙霞西路299弄3号101B'},
          {'value': '浏阳蒸菜', 'address': '天山西路430号'},
          {'value': '四海游龙（天山西路店）', 'address': '上海市长宁区天山西路'},
          {'value': '樱花食堂（凌空店）', 'address': '上海市长宁区金钟路968号15楼15-105室'},
          {'value': '壹分米客家传统调制米粉(天山店)', 'address': '天山西路428号'},
          {'value': '福荣祥烧腊（平溪路店）', 'address': '上海市长宁区协和路福泉路255弄57-73号'},
          {'value': '速记黄焖鸡米饭', 'address': '上海市长宁区北新泾街道金钟路180号1层01号摊位'},
          {'value': '红辣椒麻辣烫', 'address': '上海市长宁区天山西路492号'},
          {'value': '(小杨生煎)西郊百联餐厅', 'address': '长宁区仙霞西路88号百联2楼'},
          {'value': '阳阳麻辣烫', 'address': '天山西路389号'},
          {'value': '南拳妈妈龙虾盖浇饭', 'address': '普陀区金沙江路1699号鑫乐惠美食广场A13'}
        ]
      },
      handleSelect (item) {
        console.log(item)
      },
      changeType (type) {
        this.type = type
      },
      _onSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid || !!true) {
            this.loginBtnText = '登录中'
            this.loginBtnLoading = true
            let response = this.http.post('login', this.loginForm, true)
            if (response.success) {
              this.$router.push({path: '/home'})
            }
          } else {
            console.log(valid)
            this.$message({
              message: '表单验证未通过!',
              type: 'warning',
              center: true
            })
          }
        })
      }
    },
    mounted () {
      this.restaurants = this.loadAll()
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  .square {
    width: 100%;
    border-radius: 0;
    height: 40px;
  }

  .login {
    .login-con {
      width: 410px;
      margin: 35px auto;
      .inline-input {
        width: 100%;
      }
      .tab-wrapper {
        padding: 30px 0;
        line-height: 2rem;
        text-align: center;
        .btn-type {
          border: none;
          border-bottom: 1px solid #DDDDE3;;
          .el-button {
            color: #4A4A4A
          }
        }
        .active {
          border: 1px solid #DDDDE3;
          border-bottom: none;
          .el-button {
            color: #3D82F7
          }
        }
      }
    }
  }


</style>
