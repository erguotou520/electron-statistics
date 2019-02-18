const User = require('../../schemas/user')
const Online = require('../../schemas/online')
const { retainUserSchema } = require('./schema')
const { unitMap, getRetainDayRange, getWeekRange } = require('./common')

module.exports = (fastify) => {
  fastify.get('/users/new-retain', {
    schema: retainUserSchema
  }, async (request, reply) => {
    const { day, unit } = request.query
    // 当日新增用户
    const newUsers = await User.find({
      createdAt: {
        $gte: new Date(`${day} 00:00:00`),
        $lt: new Date(`${day} 23:59:59`)
      }
    })
    if (!newUsers.length) {
      return reply.code(204).send({ message: '当日无新增用户' })
    }
    // 用户uuid数组
    const ids = newUsers.map(user => user.id)
    const { start, end } = getRetainDayRange(day)
    if (!start) {
      return reply.code(400).send({ message: '所选时间不正确' })
    }
    // 后续一段时间新增用户仍有在线记录的占比
    const data = await Online.aggregate([
      {
        $match: {
          time: {
            $gte: start,
            $lt: end
          },
          userId: {
            $in: ids
          }
        }
      },
      {
        $group: {
          _id: '$userId',
          timeList: {
            $addToSet: {
              $dateToString: {
                format: unitMap[unit],
                date: '$time'
              }
            }
          }
        }
      },
      {
        $unwind: '$timeList'
      },
      {
        $group: {
          _id: '$timeList',
          count: {
            $sum: 1
          }
        }
      },
      {
        $sort: {
          date: -1
        }
      }
    ])
    reply.send(data.map(item => {
      let weekRange
      if (unit === 'week') {
        const match = item._id.match(/(\d{4})-(\d{1,2})/)
        if (match) {
          const year = +match[1]
          const week = +match[2]
          weekRange = getWeekRange(year, week, start, end)
        }
      }
      return {
        date: weekRange ? `${weekRange.start.format('YYYY-MM-DD')}~${weekRange.end.format('YYYY-MM-DD')}` : item._id,
        retainPercent: item.count / newUsers.length
      }
    }))
  })
}
