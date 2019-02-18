<template>
  <div>
    <div class="mb-3">
      <a-date-picker v-model="day"/>
      <a-button type="primary" class="ml-4" @click="fetch">查看</a-button>
    </div>
    <p class="mb-2">总在线时长：{{total}}时</p>
    <a-table bordered
      row-key="duration"
      :columns="tableColumns"
      :data-source="data"
      :loading="loading"
      :pagination="false">
    </a-table>
  </div>
</template>
<script>
import moment from 'moment'
import dateTable from '../../mixins/dateTable.js'
export default {
  mixins: [dateTable],
  data () {
    return {
      day: moment(),
      total: 0,
      tableColumns: [
        {
          title: '使用时长',
          dataIndex: 'duration',
          width: '30%',
          key: 'duration'
        },
        {
          title: '用户数',
          dataIndex: 'count',
          key: 'count'
        },
        {
          title: '用户占比',
          dataIndex: 'percent',
          key: 'percent'
        }
      ]
    }
  },
  methods: {
    async fetch () {
      this.loading = true
      const day = (this.day ? this.day : moment()).format('YYYY-MM-DD')
      const { data, error } = await this.$http.get('/users/duration', {
        params: { day }
      })
      if (!error) {
        this.data = data.range
        this.total = data.total
      }
      this.loading = false
    }
  },
  mounted () {
    this.fetch()
  }
}
</script>
