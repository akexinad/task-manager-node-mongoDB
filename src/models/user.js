const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    unique: true,
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

  tokens: [{
    token: {
      type: String,
      required: true,
    }
  }]
})

// this is a normal function because we need to use the 'this' binding
// userSchema.methods is for an individual user
// userSchema.statics are methods for the User model itself

userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens

  return userObject
}

userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, 'thisisanewjsonwebtoken')

  user.tokens = user.tokens.concat({ token }) // ES6 shorthand syntax
  await user.save()

  return token
}

// Whenever you refernce the User model, use the userSchema.statics method
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error('Unable to login')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if(!isMatch) {
    throw new Error('Unable to login')
  }

  return user
}

// Hash the plain text password before saving
// Here we use a plain function so we can use the 'this' binding
userSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)

  }

  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
