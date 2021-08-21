
const router = require('express').Router();
const { getImages, uploadImages } = require('../controllers/cloudinary.controllers');


router.get('/api/images', getImages)

router.post('/api/upload', uploadImages)

module.exports = router;