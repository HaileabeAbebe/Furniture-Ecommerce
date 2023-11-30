import multer from "multer";

const storage = multer.diskStorage({
  destination: "uploads",
  filename: function (req, image, cb) {
    // Define how the uploaded files should be named
    cb(null, Date.now() + "-" + image.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/jfif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage, fileFilter });
export default upload;
