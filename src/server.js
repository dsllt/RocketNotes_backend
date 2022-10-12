require('express-async-errors')
const migrationsRun = require('./database/sqlite/migrations')
const AppError = require('./util/AppError')
const uploadConfig = require('./configs/upload')

const express = require('express')
const routes = require('./routes/index')

migrationsRun()

const app = express()
app.use(express.json())

app.use('/files', express.static(uploadConfig.UPLOAD_FOLDER))

app.use(routes)

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }

  console.log(error)

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})

const PORT = 3333
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))
