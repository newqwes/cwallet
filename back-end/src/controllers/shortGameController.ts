import { NextFunction } from "express";
import { getInitData } from "../middleware/authMiddleware";

export const getDataByShortGame = async (req: any, res: any, next: NextFunction) => {
  try {
    const initData = getInitData(res);
    const userId = initData.user.id;

// создай таблицу бд с шорт гейм, добавь возможность хотя бы смотреть монеты и тд
    res.status(201).json({});
  } catch (e) {
    next(e);
  }
};
