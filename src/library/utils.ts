import mongoose from "mongoose";
import Logging from "./log";

export const isValidMongodbId = (_id: string) => {
  return mongoose.Types.ObjectId.isValid(_id);
}

export const aggregationUtilWithPagination = async (
  pipeline: any,
  repo: any,
  errorMessage: any
) => {
  try {
    return repo.aggregate(pipeline);
  } catch (err) {
    Logging.error(errorMessage);
    throw err;
  }
}

export const getLimitAndSkip = (page: string, limit: string) => {
  const limits = parseInt(limit) || 10;

  return {
    limit: limits,
    skip: (parseInt(page) - 1) * limits || 0,
  };
}