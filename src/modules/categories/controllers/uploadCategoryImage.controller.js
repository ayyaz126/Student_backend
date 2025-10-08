export const uploadCategoryImageController = async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
  
      // Multer-Cloudinary automatically uploads file & gives the hosted URL
      const imageUrl = req.file.path;
  
      res.status(200).json({
        message: "Image uploaded successfully",
        imageUrl,
      });
    } catch (error) {
      next(error);
    }
  };
  