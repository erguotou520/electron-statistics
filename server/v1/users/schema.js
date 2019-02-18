const commonUserSchema = {
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
          count: {
            type: 'number'
          }
        }
      }
    }
  }
}

const durationSchema = {
  querystring: {
    type: 'object',
    properties: {
      day: {
        type: 'string'
      }
    },
    required: ['day']
  },
  response: {
    200: {
      type: 'object',
      properties: {
        total: {
          type: 'number'
        },
        range: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              duration: {
                type: 'string'
              },
              count: {
                type: 'number'
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

const retainUserSchema = {
  querystring: {
    type: 'object',
    properties: {
      day: {
        type: 'string'
      },
      unit: {
        type: 'string',
        enum: ['day', 'week', 'month']
      }
    },
    required: ['day', 'unit']
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
          retainPercent: {
            type: 'number'
          }
        }
      }
    }
  }
}

module.exports = {
  commonUserSchema,
  durationSchema,
  retainUserSchema
}
