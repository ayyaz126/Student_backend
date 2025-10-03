import { createCategoryService } from "../services/category.service.js";
import { createCategorySchema } from "../dto/ createCategory.dto.js";

export const createCategoryController = async (req, res, next) => {
  try {
    
    const validatedData = createCategorySchema.parse(req.body);

    const category = await createCategoryService(
      validatedData.name,
      validatedData.description
    );

    return res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (error) {
 
    if (error.name === "ZodError") {
      return res.status(400).json({ message: error.errors });
    }
    next(error);
  }
};
