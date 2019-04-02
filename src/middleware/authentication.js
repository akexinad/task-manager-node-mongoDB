const jwt = require('jsonwebtoken')
const User = require('../models/user.js')

const auth = async(req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, 'thisisanewjsonwebtoken')
    // We look for one user with the correct id, and then check if his token is stroed in the token value of the tokens key.
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

    if (!user) {
      throw new Error()
    }

    req.token = token
    req.user = user
    next()
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' })
  }

}

module.exports = auth
