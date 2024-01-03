/* eslint-disable no-useless-catch */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * 'A bit of fragrance clings to the hand that gives flowers!'
 */

import { boardModel } from '~/models/boardModel'
import { columnModel } from '~/models/columnModel'

const createNew = async (reqBody) => {
  try {
    const newColumn = {
      ...reqBody
    }

    // thực hiện ghi dữ liệu vào DB
    const createdColumn = await columnModel.createNew(newColumn)

    // lấy bản ghi vừa được insert để trả về cho FE
    const getNewColumn = await columnModel.findOneById(createdColumn.insertedId)

    if (getNewColumn) {
      //xử lí đúng dữ liệu chuẩn mockdata
      getNewColumn.cards = []

      //cập nhật mảng columnOderIds
      await boardModel.pushColumnOrderId(getNewColumn)
    }

    return getNewColumn
  } catch (error) {
    throw error
  }

}

const update = async (columnId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }
    const updatedColumn = await columnModel.update(columnId, updateData)
    return updatedColumn
  } catch (error) {
    throw error
  }
}


export const columnService = {
  createNew,
  update
}