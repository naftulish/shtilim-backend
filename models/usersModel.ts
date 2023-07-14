import mongoose from "mongoose"

export enum Role {
    admin = "ADMIN",
    user = "USER"
}

// 1. interface
export interface IUsersModel extends mongoose.Document{
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    active: boolean,
    role: Role
}

// 2. schema
export const UsersSchema = new mongoose.Schema<IUsersModel>({
    firstName: {
        type: String,
        required: [true, "Missing first name"],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, "Missing last name"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Missing mail"],
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    active: {
        type: Boolean,
        required: [true, "Missing activation"]
    },
    role: {
        type: String,
        required: [true, "Missing role"],
        enum: Object.values(Role)
    }
})

// 3. Model
export const UsersModel = mongoose.model<IUsersModel>("UsersModel", UsersSchema, 'users');