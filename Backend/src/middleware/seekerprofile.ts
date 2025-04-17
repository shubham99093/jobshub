import multer from "multer";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads1/seekerprofile");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const seekerimage = multer({ storage: storage }).single("js_profile");
export default seekerimage;
