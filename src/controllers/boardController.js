/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'

const createNew = async (req, res, next) => {
  try {
    const creatBoarde = await boardService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(creatBoarde)
  } catch (error) {
    next(error)
  }
}

export const boardController = {
  createNew
}
