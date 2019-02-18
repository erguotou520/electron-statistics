<template>
  <div>
    <a-table bordered
      row-key="province"
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
          title: '城市',
          dataIndex: 'province',
          width: '30%',
          key: 'province'
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
      const { data, error } = await this.$http.get('/distribution/geo')
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
