import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, res, cal) {
    return cal(null, "./uploads"); //find in current directroty
  },
  filename: function (req, file, cal) {
    return cal(null, `${Date.now()}.${file.originalname}`);
  },
});

export const upload = multer({ storage: storage });
