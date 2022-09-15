const sendResponse = (res, status, data) => {
  res.status(status).json({
    status_code: status,
    data: data,
  });
};

const createError = (err) => {
  return {
    status: err?.status || 500,
    data: { error: err?.message || err || "Internal Server Error" },
  };
};

module.exports = {
  sendResponse,
  createError,
};
