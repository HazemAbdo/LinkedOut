const multer = require("multer");
const path = require("path");

const fileUploadService = require("../services/fileUploadService");
const { sendResponse, createError } = require("../utils/respones");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
});

const uploadFile = async (req, res) => {
  try {
    if (!req.user._id) {
      sendResponse(res, 401, "Unauthorized");
    }

    upload.single("file")(req, res, (err) => {
      if (err) {
        sendResponse(res, createError(err).status, createError(err).data);
      }
      console.log(req.file);
      fileUploadService
        .uploadFile(req.user._id, req.file.path)
        .then((data) => {
          sendResponse(res, 200, data);
        })
        .catch((err) => {
          sendResponse(res, createError(err).status, createError(err).data);
        });
    });
  } catch (err) {
    sendResponse(res, createError(err).status, createError(err).data);
  }
};

module.exports = {
  uploadFile,
};
