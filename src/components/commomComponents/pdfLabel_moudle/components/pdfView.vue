<!--用户中心右侧模板-->
<template lang="html">
  <div class="pdf-view-area" v-loading="loading">
    <canvas id="pdf-canvas"></canvas>
    <div class="label-area"><slot></slot></div>
  </div>
</template>
<script>
  import PDFJS from 'pdfjs-dist'
  export default {
    props: {
      src: {
        type: [String],
        required: true,
        default: ''
      },
      page: {
        type: [String, Number],
        default: 1
      }
    },
    data () {
      return {
        pdf: '',
        numPages: 0,
        loading: true
      }
    },
    mounted () {
      this.startDraw()
    },
    computed: {
    },
    watch: {
      src () {
        this.startDraw()
      },
      // 监听页码变化，渲染对应合同页
      page (newPage, oldPage) {
        this.getPage(newPage)
      }
    },
    methods: {
      // 初始化pdf文件
      startDraw () {
        if (this.src && this.src.indexOf('pdf') === -1) {
          this.$message({message: '您要查看的文件非PDF格式，无法查看', type: 'warning'})
        } else {
          this.initDocument(this.src)
        }
      },

      initDocument (url) {
        if (!url) {
          return
        }
        let vm = this
        let loadTask = PDFJS.getDocument(url)
        loadTask.then((pdf) => {
          vm.pdf = pdf
          vm.numPages = pdf.numPages
          this.$emit('numPages', pdf.numPages)
          vm.loading = false
          vm.getPage(1)
        })
      },

      //  切换页面
      getPage (currpage) {
        // 用 promise 获取页面
        this.pdf.getPage(currpage).then((page) => {
          let viewport = page.getViewport(1.5)
          //  准备用于渲染的 canvas 元素
          let canvas = document.getElementById('pdf-canvas')
          let context = canvas.getContext('2d')
          canvas.height = viewport.height
          canvas.width = viewport.width
          // 将 PDF 页面渲染到 canvas 上下文中
          let renderContext = {
            canvasContext: context,
            viewport: viewport
          }
          page.render(renderContext)
        })
      }
    }
  }
</script>
<style scoped>
  .pdf-view-area{
    position: relative;
    margin: 0 auto;
    width: 892px;
    height: 1262px;
  }
  .label-area{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
