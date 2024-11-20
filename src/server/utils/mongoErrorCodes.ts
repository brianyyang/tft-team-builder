// Define MongoDB error codes
const MONGO_ERROR_CODES = {
  DUPLICATE_KEY: 11000,
};

export const isDuplicateKeyError = (error: any): boolean => {
  return error && error.code === MONGO_ERROR_CODES.DUPLICATE_KEY;
};
