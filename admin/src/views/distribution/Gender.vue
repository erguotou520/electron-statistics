<template>
  <div>
    <a-table bordered
      row-key="gender"
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
          title: '性别',
          dataIndex: 'gender',
          width: '30%',
          key: 'gender'
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
      const { data, error } = await this.$http.get('/distribution/gender')
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
