/* eslint-disable no-useless-catch */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * 'A bit of fragrance clings to the hand that gives flowers!'
 */

import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'

const createNew = async (reqBody) => {
  try {
    const newCard = {
      ...reqBody
    }

    // thực hiện ghi dữ liệu vào DB
    const createdCard = await cardModel.createNew(newCard)

    // lấy bản ghi vừa được insert để trả về cho FE
    const getNewCard = await cardModel.findOneById(createdCard.insertedId)

    if (getNewCard) {
      //xử lí đúng dữ liệu chuẩn mockdata
      getNewCard.cards = []

      //cập nhật mảng columnOderIds
      await columnModel.pushCardOrderId(getNewCard)
    }

    return getNewCard
  } catch (error) {
    throw error
  }

}


export const cardService = {
  createNew
}