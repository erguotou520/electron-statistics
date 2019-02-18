<template>
  <div>
    <div class="mb-3">
      <a-range-picker v-model="dayRange" :ranges="customRanges"/>
      <a-button type="primary" class="ml-4" @click="fetch">查看</a-button>
    </div>
    <a-table bordered
      row-key="date"
      :columns="tableColumns"
      :data-source="data"
      :loading="loading"
      :pagination="false" />
  </div>
</template>
<script>
import dateTable from '../../mixins/dateTable.js'
export default {
  mixins: [dateTable],
  data () {
    return {
      tableColumns: [
        {
          title: '日期',
          dataIndex: 'date',
          width: '30%',
          key: 'data'
        },
        {
          title: '平均启动次数',
          dataIndex: 'average',
          key: 'average'
        },
        {
          title: '启动总次数',
          dataIndex: 'count',
          key: 'count'
        }
      ]
    }
  },
  methods: {
    async fetch () {
      this.loading = true
      const { from, to } = this.getDayRange()
      const { data, error } = await this.$http.get('/devices/launch', {
        params: { from, to }
      })
      if (!error) {
        this.data = data
      }
      this.loading = false
    }
  },
  mounted () {
    this.fetch()
  }
}
</script>
