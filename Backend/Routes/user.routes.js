import express from "express";
const router = express.Router();
import { authMiddleware } from "../Middlewares/user.middlewares.js"
import { getTodoRoute, postTodoRoute, signInRoute, signUpRoute, changePasswordRoute, profileRoute } from "../Controllers/user.controllers.js";
router.get("/getTodos",  getTodoRoute);
router.post("/postTodos",  postTodoRoute);
router.post("/signIn", signInRoute);
router.post("/signUp", signUpRoute);
router.get("/me",  profileRoute);
router.patch("/changePassword",  changePasswordRoute);
export default router;