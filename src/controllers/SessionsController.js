const knex = require('../database/knex')
const AppError = require('../util/AppError')
const { compare } = require('bcryptjs')
const authConfig = require('../configs/auth')
const { signer, sign } = require('jsonwebtoken')

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body

    const user = await knex('users').where({ email }).first()

    if (!user) {
      throw new AppError('E-mail e/ou senha incorretos', 401)
    }

    const matchPasswords = await compare(password, user.password)

    if (!matchPasswords) {
      throw new AppError('E-mail e/ou senha incorretos', 401)
    }

  const { secret, expiresIn } = authConfig.jwt

  const token = sign({}, secret, {
    subject: String(user.id),
    expiresIn
  })

    return response.json({user, token})
  }
}

module.exports = SessionsController
