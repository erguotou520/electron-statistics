const { readdirSync } = require('fs')
const { join } = require('path')

const dir = join(__dirname, '../users')
let files = readdirSync(dir)
files = files.filter(file => file !== 'index.js' && file !== 'schema.js' && file !== 'common.js')

module.exports = function (fastify) {
  files.forEach(file => {
    const func = require(`./${file}`)
    func(fastify)
  })
}
