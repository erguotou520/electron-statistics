const launchSchema = {
  querystring: {
    type: 'object',
    properties: {
      from: {
        type: 'string'
      },
      to: {
        type: 'string'
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
          average: {
            type: 'number'
          },
          count: {
            type: 'number'
          }
        }
      }
    }
  }
}

const osSchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        os: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              os: {
                type: 'string'
              },
              percent: {
                type: 'number'
              }
            }
          }
        },
        version: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              version: {
                type: 'string'
              },
              percent: {
                type: 'number'
              }
            }
          }
        }
      }
    }
  }
}

module.exports = {
  launchSchema,
  osSchema
}
