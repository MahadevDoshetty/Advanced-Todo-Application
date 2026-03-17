import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt"
import { userInfo, userTodos } from "../Models/user.js"
export async function signUpService(payload) {
    const { name, email, password } = payload;
    try {
        const isMatch = await mongoose.model(userInfo).findOne({ email });
        if (isMatch) {
            return false;
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const userRecords = await mongoose.model(userInfo).create({
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
    try {
        const doesExist = await mongoose.model(userInfo).findOne({ email: email });
        if (doesExist) {
            const hashedPassword = await bcrypt.compare(password, doesExist.password);
            if (hashedPassword) {
                const token = jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });
                response.token = token;
                response.user = doesExist;
                response.success = true;
                response.success.message = "Login successful !"
                return response;
            } else {
                response.success = false;
                response.success.message = "Invalid email or password";
                return response;
            }
        } else {
            response.success = false;
            response.success.message = "Invalid email or password";
            return response;
        }
    } catch (error) {
        throw error;
    }
}