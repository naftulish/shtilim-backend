import mongoose from "mongoose"

// 1. interface
export interface IGroupsModel extends mongoose.Document{
    name: string,
    teacher: string,
  
}

// 2. schema
export const GroupsSchema = new mongoose.Schema<IGroupsModel>({
    name: {
        type: String,
        required: [true, "Missing first name"],
        trim: true
    },
    teacher: {
        type: String,
        required: [true, "Missing teacher name"],
        trim: true,
      },
})

// 3. Model
export const GroupsModel = mongoose.model<IGroupsModel>("GroupsModel", GroupsSchema, 'groups');