import { deleteCategoryService } from "../services/deleteCategory.service.js";
import { deleteCategorySchema } from "../dto/deleteCatafory.dto.js";

export const deleteCategoryController = async (req, res, next) => {
  try {

    const { id } = deleteCategorySchema.parse(req.params);

    const deletedCategory = await deleteCategoryService(id);

    res.status(200).json({
      message: "Category deleted successfully",
      category: deletedCategory,
    });
  } catch (error) {
    if (error.errors) {
   
      return res.status(400).json({ errors: error.errors });
    }
    res.status(400).json({ message: error.message });
  }
};
