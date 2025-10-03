import { updateCategoryService } from "../services/updateCategory.service.js";
import { updateCategorySchema } from "../dto/updataCategory.dto.js";

export const updateCategoryController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const parsedData = updateCategorySchema.parse(req.body);

    // agar user ne kuch bhi field send nahi kiya
    if (Object.keys(parsedData).length === 0) {
      return res.status(400).json({
        message: "At least one field (name or description) is required to update",
      });
    }

    
    const category = await updateCategoryService(
      id,
      parsedData.name,
      parsedData.description
    );

    res.status(200).json({
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    if (error.errors) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(400).json({ message: error.message });
  }
};
