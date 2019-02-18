<template>
  <div>
    <div class="mb-3">
      <a-range-picker v-model="dayRange" :ranges="customRanges"/>
      <a-select class="ml-4" v-model="events" mode="multiple"
        :default-value="[]"
        placeholder="事件筛选列表" style="width:180px">
        <a-select-option v-for="event in eventList" :key="event.name">{{event.text}}</a-select-option>
      </a-select>
      <a-button type="primary" class="ml-4" @click="fetch">查看</a-button>
    </div>
    <a-table bordered
      row-key="index"
      :columns="tableColumns"
      :data-source="expandedData"
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
      events: [],
      eventList: [],
      tableColumns: [
        {
          title: '日期',
          dataIndex: 'date',
          width: '30%',
          key: 'data',
          customRender: (value, row, index) => {
            const obj = {
              children: value,
              attrs: {}
            }
            if (index === 0 || this.expandedData[index - 1].date !== value) {
              obj.attrs.rowSpan = this.dateChildsMap[value]
            } else {
              obj.attrs.rowSpan = 0
            }
            return obj
          }
        },
        {
          title: '事件',
          dataIndex: 'event',
          width: '30%',
          key: 'event',
          customRender: (value, row) => {
            return `${value}${row.eventName ? `(${row.eventName})` : ''}`
          }
        },
        {
          title: '触发总数',
          dataIndex: 'count',
          key: 'count'
        }
      ]
    }
  },
  computed: {
    expandedData () {
      const ret = []
      let index = 0
      for (const item of this.data) {
        for (const child of item.events) {
          ret.push({
            ...child,
            date: item.date,
            index: index++
          })
        }
      }
      return ret
    },
    dateChildsMap () {
      return this.data.reduce((map, obj) => {
        map[obj.date] = obj.events.length
        return map
      }, {})
    }
  },
  methods: {
    async fetchEvents () {
      const { data, error } = await this.$http.get('/events/list')
      if (!error) {
        this.eventList = data
      }
    },
    async fetch () {
      this.loading = true
      const { from, to } = this.getDayRange()
      const { data, error } = await this.$http.get('/events/custom', {
        params: { from, to, events: this.events }
      })
      if (!error) {
        this.data = data
      }
      this.loading = false
    }
  },
  mounted () {
    this.fetchEvents()
    this.fetch()
  }
}
</script>
