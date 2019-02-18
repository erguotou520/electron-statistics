const { readdirSync } = require('fs')
const { join } = require('path')

const dir = join(__dirname, '../events')
let files = readdirSync(dir)
files = files.filter(file => file !== 'index.js' && file !== 'schema.js')

module.exports = function (fastify) {
  files.forEach(file => {
    const func = require(`./${file}`)
    func(fastify)
  })
}
