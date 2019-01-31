const mongoose = require('mongoose')
const crypto = require('crypto')

const AdminSchema = new mongoose.Schema({
  name: String,
  username: {
    type: String,
    lowercase: true,
    required: true
  },
  role: {
    type: String,
    default: 'normal'
  },
  avatar: String,
  hashedPassword: String,
  salt: String
}, { timestamps: true })

AdminSchema
  .virtual('password')
  .set(function (password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashedPassword = this.encryptPassword(password)
  })
  .get(function () {
    return this._password
  })

// Public profile information
AdminSchema
  .virtual('profile')
  .get(function () {
    return {
      name: this.name,
      role: this.role,
      avatar: this.avatar
    }
  })

// Non-sensitive info we'll be putting in the token
AdminSchema
  .virtual('token')
  .get(function () {
    return {
      _id: this._id,
      role: this.role
    }
  })

/**
* Validations
*/

// Validate empty username
AdminSchema
  .path('username')
  .validate(function (username) {
    return username.length
  }, 'Username cannot be blank')

// Validate empty password
AdminSchema
  .path('hashedPassword')
  .validate(function (hashedPassword) {
    return hashedPassword.length
  }, 'Password cannot be blank')

// Validate username is not taken
AdminSchema
  .path('username')
  .validate(function (value, respond) {
    var self = this
    this.constructor.findOne({ username: value }, function (err, user) {
      if (err) throw err
      if (user) {
        if (self.id === user.id) return respond(true)
        return respond(false)
      }
      respond(true)
    })
  }, 'The specified username is already in use.')

var validatePresenceOf = function (value) {
  return value && value.length
}

/**
* Pre-save hook
*/
AdminSchema
  .pre('save', function (next) {
    if (!this.isNew) return next()

    if (!validatePresenceOf(this.hashedPassword)) {
      next(new Error('Invalid password'))
    } else {
      next()
    }
  })

/**
* Methods
*/
AdminSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */
  makeSalt: function () {
    return crypto.randomBytes(16).toString('base64')
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  encryptPassword: function (password) {
    if (!password || !this.salt) return ''
    var salt = Buffer.from(this.salt, 'base64')
    return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64')
  }
}

module.exports = mongoose.model('admin', AdminSchema)
