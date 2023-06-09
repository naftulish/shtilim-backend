import mongoose from "mongoose"

// 1. interface
export interface IStudentsModel extends mongoose.Document{
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    gender: string,
    address: string,
    createdIn: Date // not in frontend
    plans: string[],
    group: string
}

// 2. schema
export const StudentsSchema = new mongoose.Schema<IStudentsModel>({
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
    dateOfBirth: {
        type: Date,
        required: [true, "Missing date of birth"]
    },
    gender: {
        type: String,
        required: [true, "Missing gander"],
        trim: true
    },
    address: {
        type: String,
        required: [true, "Missing address"],
        trim: true
    },
    createdIn: {
        type: Date,
        default: Date.now()
    },
    plans: {
        type: [],
        trim: true
    },
    group: {
        type: String,
        trim: true
    }
    
})

// 3. Model
export const StudentsModel = mongoose.model<IStudentsModel>("StudentsModel", StudentsSchema, 'students');