const env = process.env

module.exports = {
  secret: 'random_secret',
  mongoUri: env.MONGO_URI || 'mongodb://localhost:27017/electron-statistics',
  serverHost: env.SERVER_HOST || '192.168.31.105',
  serverPort: env.SERVER_PORT || 3333,
  serverUrl: env.SERVER_URL || '192.168.31.105:3333'
}
