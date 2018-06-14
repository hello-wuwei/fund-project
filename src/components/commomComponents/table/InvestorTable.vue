<template>
  <person-table v-if="investorType==='PERSONAL'"></person-table>
  <org-table v-else-if="investorType==='ORG'"></org-table>
  <product-table v-else></product-table>
</template>
<script>
  import PersonTable from './PersonTable.vue'
  import OrgTable from './OrgTable.vue'
  import ProductTable from './ProductTable.vue'
  export default {
    props: {
      investorType: {
        type: [String]
      },
      data: {
        type: [Object]
      }
    },
    components: {
      PersonTable,
      OrgTable,
      ProductTable
    },
    data () {
      return {}
    }
  }
</script>
