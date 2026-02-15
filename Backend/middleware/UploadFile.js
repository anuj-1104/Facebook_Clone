import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, res, cal) {
    return cal(null, "./uploads"); //find in current directroty
  },
  filename: function (req, file, cal) {
    return cal(null, `${Date.now()}.${file.originalname}`);
  },
});

// const filter = (req, file, cal) => {
//   if (file.) {
//     cal(null, true);
//   } else {
//     cal(new Error("Only image file are allowed"));
//   }
// };

export const upload = multer({ storage: storage });
