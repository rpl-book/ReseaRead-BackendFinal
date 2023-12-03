module.exports = (res, err, statusCode, message) => {
  console.log(err);
  return res
    .status(statusCode)
    .json({ payload: {}, message: `Failed to ${message}` });
};
