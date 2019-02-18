const Event = require('../../schemas/event')
const { eventListSchema, eventSchema } = require('./schema')

module.exports = (fastify) => {
  fastify.get('/events/list', {
    schema: eventListSchema
  }, async (request, reply) => {
    const data = await Event.aggregate([
      {
        $group: {
          _id: '$event',
          text: {
            $first: '$eventName'
          }
        }
      },
      {
        $addFields: {
          name: '$_id'
        }
      }
    ])
    reply.send(data)
  })

  fastify.get('/events/custom', {
    schema: eventSchema
  }, async (request, reply) => {
    const { from, to, events } = request.query
    const condition = [
      {
        $match: {
          createdAt: {
            $gte: new Date(`${from} 00:00:00`),
            $lt: new Date(`${to} 23:59:59`)
          }
        }
      },
      {
        $addFields: {
          createdTime: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$createdAt'
            }
          }
        }
      },
      {
        $group: {
          _id: {
            createdTime: '$createdTime',
            event: '$event'
          },
          count: {
            $sum: '$eventCount'
          },
          eventName: {
            $first: '$eventName'
          }
        }
      },
      {
        $group: {
          _id: '$_id.createdTime',
          events: {
            $push: {
              event: '$_id.event',
              eventName: '$eventName',
              count: '$count'
            }
          }
        }
      },
      {
        $addFields: {
          date: '$_id'
        }
      },
      {
        $sort: {
          date: -1
        }
      }
    ]
    if (events) {
      condition.unshift({
        $match: {
          event: {
            $in: events
          }
        }
      })
    }
    const data = await Event.aggregate(condition)
    reply.send(data)
  })
}
