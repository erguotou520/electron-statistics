<template>
  <div>
    <a-table bordered
      row-key="ageRange"
      :columns="tableColumns"
      :data-source="data"
      :loading="loading"
      :pagination="false" />
  </div>
</template>
<script>
export default {
  data () {
    return {
      loading: false,
      data: [],
      tableColumns: [
        {
          title: '年龄段',
          dataIndex: 'ageRange',
          width: '30%',
          key: 'ageRange'
        },
        {
          title: '占比',
          dataIndex: 'percent',
          key: 'percent',
          sorter: (a, b) => a.percent > b.percent ? 1 : -1
        }
      ]
    }
  },
  methods: {
    async fetch () {
      this.loading = true
      const { data, error } = await this.$http.get('/distribution/age')
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
