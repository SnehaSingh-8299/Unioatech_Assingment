const router = require("express").Router();
const Model = require('../../models/index')
const Validation = require("../validations");
const Auth = require("../../common/authenticate");
const Controller = require("../controllers");
const sizeOf = require('image-size')
const multer = require("multer");
const sharp = require("sharp");
const fs = require('fs');
const { ObjectId } = require("bson");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/user')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })

//  ONBOARDING API'S
router.post('/uploadImage', Auth.verify("guest"), upload.single("file"), async (req, res, next) => {
  try {
    await Validation.User.uploadImage.validateAsync(req.body);
    const filename = req.file.originalname.replace(/\..+$/, "");
    const dimensions = sizeOf(`public/uploads/user/${req.file.filename}`)
    const location = {
        type: "Point",
        coordinates : [parseFloat(req.body.longitude) , parseFloat(req.body.latitute)]
    }
    let doc = await Model.ImageModel({
        name : filename,
        latitute : req.body.latitute,
        longitude : req.body.longitude,
        size : req.file.size,
        extension : req.file.mimetype,
        nameOfPerson : req.body.nameOfPerson,
        width : dimensions.width,
        height : dimensions.height,
        location : location
    }).save();
    return res.success("Image uploaded successfully.", doc);
  } catch (error) {
    next(error)
  }
    
});

router.get("/getAllImage", Auth.verify("guest"), Controller.User.getAllImage);
router.get("/getImageById", Auth.verify("guest"), Controller.User.getImageById);

module.exports = router;