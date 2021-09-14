const { cloudinary } = require('../utils/cloudinary');

const getImages = async (req, res) => {
  const { resources } = await cloudinary.search
  .expression('folder:dev_setups')
  .sort_by('public_id', 'desc')
  .max_results(30)
  .execute();

  const publicIds = resources.map((file) => file.public_id);
  res.send(publicIds);
}

const uploadImages = async (req, res) => {
  try {
      const fileStr = req.body.data;
      const uploadResponse = await cloudinary.uploader.upload(fileStr, {
          upload_preset: 'dev_setups',
      });
    //console.log(uploadResponse);
    const imageId = uploadResponse.public_id   
    console.log(imageId); 
    res.json({ success: true, public_id: imageId });
  } catch (err) {
      console.error(err);
      res.status(500).json({ err: 'Something went wrong' });
  }
}

module.exports = {
  getImages, uploadImages
}