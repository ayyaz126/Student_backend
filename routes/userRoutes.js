import express from "express";
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "../auth/userController.js";

const router = express.Router()

router.get("/" , getUsers);
router.get ("/:id", getUserById)
router.post("/create", createUser )
router.put("/:id" , updateUser )
router.delete("/:id", deleteUser )

export default  router
