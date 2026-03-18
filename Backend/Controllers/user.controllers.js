import { userInfo } from "../Models/user.js"
import mongoose from "mongoose";
import { changePasswordService, getTodoService, postTodoService, profileService, signInService, signUpService } from "../Services/user.services.js";
export async function getTodoRoute(req, res) {
    const token = req.cookies.token;
    try {
        const response = await getTodoService(token);
        if (!response.status) {
            return res.status(400).json({
                response
            });
        };
        return res.status(200).json({
            response
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
};


export async function postTodoRoute(req, res) {
    const token = req.cookies.token;
    const obj = req.body;
    obj.token = token;
    try {
        const response = await postTodoService(obj);
        return res.status(200).json({
            message: response.status.message,
            status: response.status
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: false
        })
    }
};
/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */

export async function profileRoute(req, res) {
    const {token} = req.cookies.token;
    console.log(token);
    try {
        const response = await profileService(token);
        if (!response.status) {
            return res.status(400).json({
                message: response.status.message,
                status: false
            })
        };
        return res.status(200).json({
            message: response.status.message,
            user: response
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: false
        })
    }
};

export async function changePasswordRoute(req, res) {
    const token = req.cookies.token;
    const obj = req.body;
    obj.token = token;
    try {
        const response = await changePasswordService(obj);
        if (!response.status) {
            return res.status(400).json({
                message: response.status.message,
                status: response.status
            })
        };
        return res.status(200).json({

            message: response.status.message,
            status: response.status
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: false
        })
    }
};

export async function signUpRoute(req, res) {
    const payload = req.body;
    try {
        const response = await signUpService(payload);
        if (response) {
            return res.status(200).json({
                message: "User registered statusfully !",
                status: true
            })
        } else {
            return res.status(400).json({
                message: "User already exists"
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: false
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
        if (!response.status) {
            return res.status(401).json({
                message: response.status.message,
                status: response.status
            });
        };
        req.body.user = response.user;
        return res.status(200).cookie("token", response.token, {
            expires: new Date(Date.now() + 500000)
        }).json({
            message: response.status.message,
            status: true,
            user: response.user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            status: false
        })
    }
};
