<template>
  <div>
    <a-table bordered
      row-key="os"
      :columns="osTableColumns"
      :data-source="osData"
      :loading="loading"
      :pagination="false" />
    <a-table class="mt-3" bordered
      row-key="version"
      :columns="verTableColumns"
      :data-source="verData"
      :loading="loading"
      :pagination="false" />
  </div>
</template>
<script>
export default {
  data () {
    return {
      loading: false,
      osData: [],
      verData: [],
      osTableColumns: [
        {
          title: '操作系统',
          dataIndex: 'os',
          width: '30%',
          key: 'os'
        },
        {
          title: '占比',
          dataIndex: 'percent',
          key: 'percent'
        }
      ],
      verTableColumns: [
        {
          title: '应用版本',
          dataIndex: 'version',
          width: '30%',
          key: 'version'
        },
        {
          title: '占比',
          dataIndex: 'percent',
          key: 'percent'
        }
      ]
    }
  },
  methods: {
    async fetch () {
      this.loading = true
      const { data, error } = await this.$http.get('/devices/os')
      if (!error) {
        this.osData = data.os
        this.verData = data.version
      }
      this.loading = false
    }
  },
  mounted () {
    this.fetch()
  }
}
</script>
