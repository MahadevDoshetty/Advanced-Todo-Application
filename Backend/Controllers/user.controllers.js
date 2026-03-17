import { userInfo } from "../Models/user"
import mongoose from "mongoose";
import { signInService, signUpService } from "../Services/user.services";



export function getTodoRoute(req, res) {

};
export function postTodoRoute(req, res) {

};
export function profileRoute(req, res) {
    
};
export function changePasswordRoute(req, res) {

};
export async function signUpRoute(req, res) {
    const payload = req.body;
    try {
        const response = await signUpService(payload);
        if (response) {
            return res.status(200).json({
                message: "User registered successfully !",
                success: true
            })
        } else {
            return res.status(400).json({
                message: "User already exists"
            });
        }
    } catch (error) {
        return res.status(401).json({
            message: error.message,
            success: false
        });
    }
};
/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */



export async function signInRoute(req, res) {
    const userDetails = req.body;
    try {
        const response = await signInService(userDetails);
        if (!response.success) {
            return res.status(401).json({
                message: response.success.message,
                success: response.success
            });
        };
        req.body.user = response.user;
        return res.status(200).cookie("token", response.token, {
            expires: new Date(Date.now() + 500000)
        }).json({
            message: response.success.message,
            success: true,
            user: response.user
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: false
        })
    }
};
