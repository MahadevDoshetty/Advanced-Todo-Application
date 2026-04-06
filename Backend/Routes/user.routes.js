import express from "express";
const router = express.Router();
import { authMiddleware } from "../Middlewares/user.middlewares.js"
import { getTodoRoute, postTodoRoute, signInRoute, signUpRoute, changePasswordRoute, profileRoute } from "../Controllers/user.controllers.js";
router.get("/getTodos", authMiddleware, getTodoRoute);
router.post("/postTodos", authMiddleware, postTodoRoute);
router.post("/signIn", signInRoute);
router.post("/signUp", signUpRoute);
router.get("/me", authMiddleware, profileRoute);
router.patch("/changePassword", authMiddleware, changePasswordRoute);
export default router;