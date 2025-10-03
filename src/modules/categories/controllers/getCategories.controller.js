import { getCategoriesService } from "../services/getCategories.service.js";

export const getCategoriesController = async (req, res, next) => {
  try {
    const categories = await getCategoriesService();

    res.status(200).json({
      message: "Categories fetched successfully",
      categories,
    });
  } catch (error) {
    next(error);
  }
};
