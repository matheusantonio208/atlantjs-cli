<<<<<<< HEAD imports
import '#config/env-loader.js'
import express from 'express'
import cors from 'cors'
import YouchLogs from '#config/debug/youch-config.js'

import DatabaseDB from '#config/db-database/db-connect.js'

import routes from '#controllers/routes-api.js'

=======
import '#config/env-loader.js'
import express from 'express'
import cors from 'cors'
import YouchLogs from '#config/debug/youch-config.js'

import DatabaseDB from '#config/db-database/db-connect.js'

import routes from '#controllers/routes-api.js'
>>>>>>> TEMP imports

class ApiConfig {
<<<<<<< HEAD constructor
  constructor() {
    this.server = express()

    this.middlewares()
    this.routes()

=======
  constructor() {
    this.server = express()

    this.middlewares()
    this.routes()
>>>>>>> TEMP constructor

    // DatabaseDB.start();
  }

  middlewares() {
    this.server.use(cors())
    this.server.use(YouchLogs)
    this.server.use(express.json())
  }

  routes() {
    this.server.use(routes)
  }
}

export default new ApiConfig().server
