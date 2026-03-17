import jwt from "jsonwebtoken";
import express from "express";
import { rateLimit } from "express-rate-limit"
/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export function authMiddleware(req, res, next) {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
        ignoreExpiration: false
    });
    if (decoded) {
        res.req.body.token = token;
        next();
    } else {
        return res.status(400).json({
            message: "Invalid token"
        });
    }
};
export function rateLimiter(req, res, next) {
    const limiter = new rateLimit({
        windowMs: 600000,
        limit: 50
    });

}