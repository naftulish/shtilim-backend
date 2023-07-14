import express, { NextFunction, Request, Response } from "express";
import usersService from "../services/usersService";

const router = express.Router();

router.post("/auth/login", async function (req: Request, response: Response, next: NextFunction) {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const token = await usersService.login(email, password);
        response.json(token);
    } catch (error) {
        next(error);
    }
});

export default router;