<template>
  <div>
    <div class="mb-3 flex">
      <a-date-picker v-model="day"/>
      <a-button type="primary" class="ml-4" @click="fetch">查看</a-button>
      <a-radio-group class="ml-auto" @change="fetch" v-model="unit">
        <a-radio-button value="day">日留存</a-radio-button>
        <a-radio-button value="week">周留存</a-radio-button>
        <a-radio-button value="month">月留存</a-radio-button>
      </a-radio-group>
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
import moment from 'moment'
export default {
  data () {
    return {
      day: moment().subtract(2, 'days'),
      unit: 'day',
      data: [],
      loading: false,
      tableColumns: [
        {
          title: '日期',
          dataIndex: 'date',
          width: '30%',
          key: 'data'
        },
        {
          title: '留存',
          dataIndex: 'retainPercent',
          key: 'retainPercent'
        }
      ]
    }
  },
  methods: {
    async fetch () {
      this.loading = true
      const day = (this.day ? this.day : moment()).format('YYYY-MM-DD')
      const { data, status, error } = await this.$http.get('/users/active-retain', {
        params: { day, unit: this.unit }
      })
      if (!error) {
        if (status === 204) {
          this.$message.warn('当日无活跃用户')
          this.data = []
        } else {
          this.data = data
        }
      }
      this.loading = false
    }
  },
  mounted () {
    this.fetch()
  }
}
</script>
