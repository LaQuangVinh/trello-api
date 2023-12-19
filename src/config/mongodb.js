/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import { env } from '~/config/environment'
import { MongoClient, ServerApiVersion } from 'mongodb'

// ban đầu là nll vì chưa connect
let trelloDatabaseInstance = null

// mongoClientInstance để connect tới MongoDB
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export const CONNECT_DB = async () => {
  await mongoClientInstance.connect()

  // kết nối thành công thì lấy ra database theo tên
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

// để đảm bảo đã connect thành công
export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to Database fisrt !')
  return trelloDatabaseInstance
}

export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}
