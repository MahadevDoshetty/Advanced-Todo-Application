import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt"
import { userInfo, userTodos } from "../Models/user.js"
export async function signUpService(payload) {
    const { name, email, password } = payload;
    try {
        const isMatch = await userInfo.findOne({ email });
        if (isMatch) {
            return false;
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const userRecords = await userInfo.create({
                name: name,
                email: email,
                password: hashedPassword
            });
            return true;
        }
    } catch (error) {
        throw error;
    }
};
export async function signInService(userDetails) {
    const { email, password } = userDetails;
    const payload = {
        email, password
    };
    const response = {};
    const doesExist = await userInfo.findOne({ email: email });
    if (doesExist) {
        const hashedPassword = await bcrypt.compare(password, doesExist.password);
        if (hashedPassword) {
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN
            });
            response.token = token;
            response.user = doesExist;
            response.status = true;
            response.message = "Login statusful !"
            return response;
        } else {
            response.status = false;
            response.message = "Invalid email or password";
            return response;
        }
    } else {
        response.status = false;
        response.message = "Invalid email or password";
        return response;
    }
}
export async function changePasswordService(obj) {
    const decoded = jwt.verify(obj.token, process.env.JWT_SECRET);
    const response = {};
    if (!decoded) {
        response.status = false;
        response.status.message = "Invalid token!";
        return response;
    }
    this.email = decoded.email;
    const user = await userInfo.findOne({ email: this.email });
    const oldPasswordMatch = await bcrypt.compare(obj.oldPassword, obj.newPassword);
    if (!oldPasswordMatch) {
        response.status = false;
        response.status.message = "Old password didn't match";
        return response;
    };
    const hashedNewPassword = await bcrypt.hash(obj.newPassword, 10);
    const updating = await userInfo.updateOne({ email: this.email }, { password: hashedNewPassword });
    if (!updating) {
        response.status = false;
        response.status.message = "Failed to update!";
        return response;
    };
    response.status = true;
    response.status.message = "Password changed statusfully!";
    return response;
};
export async function profileService(token) {
    const response = {};
    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userInfo.findOne({ email: decoded.email });
    if (!user) {
        response.status = false;
        response.status.message = "User does not exist !";
        return response;
    }
    response.name = user.name;
    response.email = user.email;
    response.status = true;
    response.status.message = "User fetched statusfully !";
    return response;
};
export async function getTodoService(token) {
    const response = {};
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        response.status = false;
        response.status.message = "Token does not exists!";
        return response;
    };
    const user = await userTodos.findOne({ email: decoded.email });
    if (!user) {
        response.status = false;
        response.status.message = "User does not exists!";
        return response;
    };
    const todos = user.todoLists;
    if (todos.length == 0) {
        response.status = false;
        response.status.message = "There exist no todos!";
        return response;
    };
    response.todos = todos;
    response.status = true;
    response.status.message = "Todos fetched!";
    return response;
};
export async function postTodoService(obj) {
    const response = {};
    const { token } = obj;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    this.email = decoded.email;
    const user = await userTodos.findOne({ email: this.email });
    if (!user) {
        await userTodos.create({
            email: this.email,
            todoLists: [obj]
        });
        response.status = true;
        response.status.message = "Todos added statusfully!";
        return response;
    };
    await user.todoLists.push(obj);
    response.status = true;
    response.status.message = "Todos added statusfully!"
    // obj is one todo with title and id 
    return response
};