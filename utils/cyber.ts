import { Request } from "express";
import jwt from "jsonwebtoken";
import { IUsersModel } from "../models/usersModel";
import crypto from "crypto"

const jwtSecretKey = "JohnBryceFullStackCourse";

function getNewToken(user: IUsersModel ): string {

    delete user.password;

    const container = { user };
    const token = jwt.sign(container, jwtSecretKey);
    return token;
}

function verifyToken(request: Request): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        try {
            const header = request.header("Authorization");
            if (!header) {
                resolve(false);
                return;
            }

            const token = header.substring(7);

            if (!token) {
                resolve(false);
                return;
            }
            jwt.verify(token, jwtSecretKey, err => {
                if (err) {
                    resolve(false);
                    return;
                }
                resolve(true);
            });
        }
        catch (err: any) {
            reject(err);
        }
    });
}


const salt = 'myStringsForPasswords';

function hash( plainText: string): string{
    if(!plainText ) return null;
    const hashedText = crypto.createHmac('sha512', salt ).update(plainText).digest('hex');
    return hashedText;
}


export default {
    getNewToken,
    verifyToken,
    hash,
};
