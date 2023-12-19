/* eslint-disable no-console */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from 'express'
import { CONNECT_DB, CLOSE_DB } from './config/mongodb'
import exitHook from 'async-exit-hook'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'


const START_SERVER = () => {
  const app = express()

  // enable req.body jon data
  app.use(express.json())

  // APIs v1 status
  app.use('/v1', APIs_V1)

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`Hello ${env.AUTHOR}, I am running at ${ env.APP_HOST }:${ env.APP_PORT }/`)
  })

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

