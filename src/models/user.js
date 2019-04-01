const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a positive number');
      }
    }
  },

  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is not valid')
      }
    }
  },

  password: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if ( !validator.isLength(value, { min: 6 }) ) {
        throw new Error('The password must be at least six characters long')
      } else if (value.toLowerCase().includes("password")) {
        throw new Error('Cannot include the word password')
      }
    }
  }
})

userSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)

  }

  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
