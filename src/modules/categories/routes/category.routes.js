import express from "express";
import { authMiddleware } from "../../../middleware/auth.middleware.js";
import { isAdmin } from "../../../middleware/isAdmin.middleware.js";
import { createCategoryController } from "../controllers/create.controller.js";
import { getCategoriesController } from "../controllers/getCategories.controller.js";
import { updateCategoryController } from "../controllers/updateCategory.controller.js";
import { deleteCategoryController } from "../controllers/deleteCategory.controller.js";

const router = express.Router();

router.post("/creat", authMiddleware, isAdmin, createCategoryController);
router.get("/get", authMiddleware, getCategoriesController);
router.put("/edit/:id", authMiddleware, isAdmin, updateCategoryController);
router.delete("/delete/:id", authMiddleware, isAdmin, deleteCategoryController);

export default router;