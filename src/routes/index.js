const { Router } = require('express')

const usersRouter = require('./users.routes')
const notesRouter = require('./notes.routes')
const tagsRouter = require('./tags.routes')
const sessionsRouter = require('./sessions.routes')

const routes = Router()

// Toda vez que alguém acessar o users vai ser redirecionado para o userRoutes
routes.use('/users', usersRouter)
routes.use('/notes', notesRouter)
routes.use('/tags', tagsRouter)
routes.use('/sessions', sessionsRouter)

module.exports = routes