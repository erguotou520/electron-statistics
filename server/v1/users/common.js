const dayjs = require('dayjs')

const unitMap = {
  'day': '%Y-%m-%d',
  'week': '%Y-%V',
  'month': '%Y-%m'
}

function getWeekRange (year, week, min, max) {
  const _firstDay = new Date(`${year}-01-01`).getDay() || 7
  const start = dayjs(`${year}-01-01`).add(8 - _firstDay + (week - 2) * 7, 'day')
  const end = start.clone().add(6, 'day')
  min = dayjs(min)
  max = dayjs(max)
  return {
    start: start.isBefore(min) ? min : start,
    end: end.isBefore(max) ? end : max
  }
}

function getRetainDayRange (day) {
  // 从指定时间的后一天起到昨天
  const start = new Date(`${day} 24:00:00`)
  const end = dayjs().endOf('day').subtract(1, 'day').toDate()
  if (end < start) {
    return {}
  }
  return { start, end }
}

module.exports = {
  unitMap,
  getWeekRange,
  getRetainDayRange
}
