const express = require('express');
const multer = require( 'multer')
const multerS3 = require("multer-s3");

const s3 = require("../config/aws");

const router = express.Router();

const upload = multer({
	storage: multerS3({
		s3: s3,
		bucket: "mfe-dashboard-ar/uploads",
		acl: 'public-read',
		key: (req, file, cb) => {
			cb(null, Date.now().toString() + '_' + file.originalname);
		}
	})
});

router.post('/', upload.single('image'), (req, res) => {
	res.send(`${req.file.location}`);
});

module.exports =  router;
