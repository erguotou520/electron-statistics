const { readdirSync } = require('fs')
const { join } = require('path')

const dir = join(__dirname, '../v1')
let files = readdirSync(dir)
files = files.filter(file => file !== 'index.js')

module.exports = function (fastify, opts, next) {
  files.forEach(file => {
    const func = require(`./${file}`)
    func(fastify)
  })
  next()
}
