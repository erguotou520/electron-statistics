const Admin = require('./schemas/admin')

module.exports = async () => {
  const admin = await Admin.findOne({ role: 'admin' })
  if (!admin) {
    await Admin.create({
      name: 'Admin',
      username: 'admin',
      role: 'admin',
      avatar: '',
      password: 'admin'
    })
  }
}
