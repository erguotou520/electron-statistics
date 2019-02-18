const dayjs = require('dayjs')
const User = require('../../schemas/user')
const { ageSchema } = require('./schema')

const ageRangeList = [
  [0, 10],
  [11, 15],
  [16, 20],
  [21, 25],
  [26, 30],
  [31, 100]
]

module.exports = (fastify) => {
  fastify.get('/distribution/age', {
    schema: ageSchema
  }, async (request, reply) => {
    const nowYear = dayjs().year()
    const all = await User.countDocuments()
    const data = await User.aggregate([
      {
        $group: {
          _id: '$birthyear',
          count: {
            $sum: 1
          }
        }
      },
      {
        $sort: {
          _id: -1
        }
      }
    ])
    let rangeIndex = 0
    const ret = ageRangeList.map(range => {
      return {
        ageRange: `${range[0]}-${range[1]}`,
        percent: 0
      }
    })
    for (const item of data) {
      if (item._id) {
        const age = nowYear - item._id
        while (age > ageRangeList[rangeIndex][1]) {
          rangeIndex++
        }
        if (ret[rangeIndex]) {
          ret[rangeIndex].percent = item.count / all
        } else {
          ret.push({
            ageRange: '其它',
            percent: item.count / all
          })
        }
      } else {
        ret.push({
          ageRange: '未设置',
          percent: item.count / all
        })
      }
    }
    // if (otherVersionCount > 0) {
    //   version.push({ version: '其它', percent: otherVersionCount / all })
    // }
    reply.send(ret)
  })
}
