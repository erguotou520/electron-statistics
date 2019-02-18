const ageSchema = {
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          ageRange: {
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

const genderSchema = {
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          gender: {
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

const geoSchema = {
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          province: {
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

module.exports = {
  ageSchema,
  genderSchema,
  geoSchema
}
