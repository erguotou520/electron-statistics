const querySchema = {
  type: 'object',
  properties: {
    event: {
      type: 'string',
      description: '事件'
    },
    eventName: {
      type: 'string',
      description: '事件名'
    },
    data: {
      description: '事件属性'
    },
    user: {
      type: 'string',
      description: '用户标识码'
    },
    device: {
      type: 'string',
      description: '设备标识码'
    }
  }
}

module.exports = (fastify) => {
  fastify.get('/web.gif', {
    schema: {
      description: '统计记录',
      querystring: querySchema
      // response: {
      //   200: {
      //     description: '返回码'
      //   }
      // }
    }
  }, async (req, reply) => {
    console.log(req.query)
    reply.code(200).send()
  })
}
