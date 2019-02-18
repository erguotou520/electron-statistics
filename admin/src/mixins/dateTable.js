import moment from 'moment'
export default {
  data () {
    return {
      dayRange: [moment(), moment()],
      customRanges: {
        '今天': [moment(), moment()],
        '近3天': [moment().subtract(3, 'days'), moment()],
        '近7天': [moment().subtract(7, 'days'), moment()]
      },
      loading: false,
      data: []
    }
  },
  methods: {
    getDayRange () {
      const from = (this.dayRange[0] ? this.dayRange[0] : this.customRanges['今天'][0]).format('YYYY-MM-DD')
      const to = (this.dayRange[1] ? this.dayRange[1] : this.customRanges['今天'][1]).format('YYYY-MM-DD')
      return { from, to }
    }
  }
}
