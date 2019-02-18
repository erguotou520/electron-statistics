<template>
  <div class="v-overview">
    <div class="row">
      <overview-card title="今日新增用户" :number="newUserCount" unit="人" style="background:#277540;" />
      <overview-card title="今日活跃用户" :number="activeUserCount" unit="人" style="background:#b34e35;" />
      <overview-card title="今日在线总时长" :number="onlineTimeCount" :fixed-count="2" unit="时" style="background:#21519a;" />
    </div>
  </div>
</template>
<script>
import OverviewCard from './OverviewCard'
export default {
  data () {
    return {
      newUserCount: 0,
      activeUserCount: 0,
      onlineTimeCount: 0,
      pullTimeout: null
    }
  },
  components: {
    OverviewCard
  },
  methods: {
    async fetch () {
      const { error, data } = await this.$http.get('/overview')
      if (!error) {
        this.newUserCount = data.newUserCount
        this.activeUserCount = data.activeUserCount
        this.onlineTimeCount = data.onlineTimeCount
      }
    },
    startPull () {
      this.pullTimeout = setTimeout(async () => {
        await this.fetch()
        this.startPull()
      }, 5000)
    }
  },
  mounted () {
    this.fetch()
    this.startPull()
  },
  beforeDestroy () {
    if (this.pullTimeout) {
      clearTimeout(this.pullTimeout)
    }
  }
}
</script>
<style lang="postcss">
.v-overview {
  & .row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 5%;
    & .card {
      border-radius: 4px;
      padding: 16px;
      color: #fff;
      & .title {
        font-size: 14px;
      }
      & .number {
        margin-top: 8px;
        text-align: right;
        font-size: 20px;
      }
    }
  }
}
</style>
