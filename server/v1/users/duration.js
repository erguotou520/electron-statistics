const Online = require('../../schemas/online')
const { durationSchema } = require('./schema')

module.exports = (fastify) => {
  fastify.get('/users/duration', {
    schema: durationSchema
  }, async (request, reply) => {
    const { day } = request.query
    const match = {
      $match: {
        userId: {
          $exists: true,
          $nin: [null, undefined, '']
        },
        time: {
          $gte: new Date(`${day} 00:00:00`),
          $lt: new Date(`${day} 23:59:59`)
        }
      }
    }
    const data = await Online.aggregate([
      match,
      {
        $group: {
          _id: '$userId',
          durationG: {
            $sum: '$duration'
          }
        }
      },
      {
        $group: {
          _id: {
            $cond: {
              if: { $lte: ['$durationG', 600] },
              then: '10分钟以下',
              else: {
                $cond: {
                  if: { $lte: ['$durationG', 1800] },
                  then: '10到30分钟',
                  else: {
                    $cond: {
                      if: { $lte: ['$durationG', 3600] },
                      then: '30分钟到1小时',
                      else: {
                        $cond: {
                          if: { $lte: ['$durationG', 7200] },
                          then: '1小时到2小时',
                          else: {
                            $cond: {
                              if: { $lte: ['$durationG', 10800] },
                              then: '2小时到3小时',
                              else: '3小时以上'
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          count: {
            $sum: 1
          }
        }
      },
      {
        $addFields: {
          duration: '$_id'
        }
      },
      {
        $sort: {
          date: -1
        }
      }
    ])
    const totalOnlineTime = await Online.aggregate([
      match,
      {
        $group: {
          _id: 'null',
          total: {
            $sum: '$duration'
          }
        }
      }
    ])
    const all = data.reduce((sum, item) => sum + item.count, 0)
    reply.send({
      total: totalOnlineTime[0] ? Math.round(totalOnlineTime[0].total * 10 / 3600) / 10 : 0,
      range: data.map(item => {
        return {
          ...item,
          percent: item.count / all
        }
      })
    })
  })
}
