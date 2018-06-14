<!-- 风险评估 -->
<template lang="html">
  <div class="evaluation">
    <div v-if="evaluationData.length">
      <div class="list-item" v-for="(item, index) in evaluationData" :key="item.questionId">
        <div class="question-title">{{item.questionContent}}</div>
        <div class="question-radio">
          <ul>
            <li v-for="(option, index) in item.answerList" :key="index">
              <el-radio v-model="radio" :label="option.id" disabled>{{option.answerContent}}</el-radio>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-else class="empty">
      该管理人暂未添加该类型问卷
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        radio: ''
      }
    },
    props: {
      evaluationData: {
        type: [Array]
      }
    },
    methods: {
    }
  }
</script>
<style type="text/less" scoped>
  .list-item{
    margin: 15px 0;
  }
  .list-item:first-child{
    margin-top: 0;
  }
  .empty{
    text-align: center;
    padding: 30px;
  }
</style>
