/* eslint-disable no-console */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from 'express'
import cors from 'cors'
import { CONNECT_DB, CLOSE_DB } from './config/mongodb'
import exitHook from 'async-exit-hook'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'
import { corsOptions } from '~/config/cors'


const START_SERVER = () => {
  const app = express()

  app.use(cors(corsOptions))

  // enable req.body jon data
  app.use(express.json())

  // APIs v1 status
  app.use('/v1', APIs_V1)

  // middleware xử lí lỗi tập trung
  app.use(errorHandlingMiddleware)

  if (env.BUILD_MODE === 'production') {
    app.listen(process.env.PORT, () => {

      console.log(`Hello ${env.AUTHOR}, I am running at PORT: ${ process.env.PORT }/`)
    })
  } else {
    app.listen(env.LOCAL_DEV_APP_PORT, env.LOCAL_DEV_APP_HOST, () => {

      console.log(`Hello ${env.AUTHOR}, I am running at ${ env.LOCAL_DEV_APP_HOST }:${ env.LOCAL_DEV_APP_PORT }/`)
    })
  }

  exitHook(() => {
    CLOSE_DB()
  })
}

// kết nối db thành công thì mới start backend
CONNECT_DB()
  .then(() => console.log('Connected to MongoDB successfully'))
  .then(() => START_SERVER())
  .catch(error => {
    console.error(error)
    process.exit()
  })

