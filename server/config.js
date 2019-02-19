const env = process.env

module.exports = {
  secret: 'random_secret',
  mongoUri: env.MONGO_URI || 'mongodb://localhost:27017/electron-statistics',
  serverHost: env.SERVER_HOST || '0.0.0.0',
  serverPort: env.SERVER_PORT || 3333
}
