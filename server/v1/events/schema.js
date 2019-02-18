const eventListSchema = {
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string'
          },
          text: {
            type: 'string'
          }
        }
      }
    }
  }
}

const eventSchema = {
  querystring: {
    type: 'object',
    properties: {
      from: {
        type: 'string'
      },
      to: {
        type: 'string'
      },
      events: {
        type: 'array',
        item: {
          type: 'string'
        }
      }
    },
    required: ['from', 'to']
  },
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          date: {
            type: 'string'
          },
          events: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                event: {
                  type: 'string'
                },
                eventName: {
                  type: 'string'
                },
                count: {
                  type: 'number'
                }
              }
            }
          }
        }
      }
    }
  }
}

module.exports = {
  eventListSchema,
  eventSchema
}
