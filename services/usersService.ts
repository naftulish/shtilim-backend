import { IUsersModel, UsersModel } from "../models/usersModel";
import ValidationError from "../utils/ValidationError";
import cyber from "../utils/cyber";



async function getUserById(_id: string): Promise<IUsersModel> {
    return UsersModel.findById(_id);
}

async function login(email: string, password: string): Promise<string> {

    //hash the password
    const hashedPassword = cyber.hash(password);
    const userArr = await UsersModel.find({ email, password: hashedPassword });

    if (userArr.length) {
        // Return action token
        return cyber.getNewToken(userArr[0]);
    }
    throw new Error("No such user");
}

async function getAllUsers(): Promise<IUsersModel[]> {
    return UsersModel.find();
}

// async function getUserByEmail(email: string): Promise<IUsersModel[]> {
//     return UsersModel.find({ email });
// }

async function doesUserExistByEmail(email: string): Promise<boolean> {
    const user = await UsersModel.findOne({ email });
    return !!user; // Returns true if user exists, false otherwise
    
}

async function saveOneUser(user: IUsersModel): Promise<IUsersModel> {
    const err = user.validateSync();
    if (err)
        throw new ValidationError(err.message);

            
    //hash the password
    const hashedPassword = cyber.hash(user.password);
    user.password = hashedPassword;
    const newUser = await user.save();
    return newUser;
}

async function updateOneUser(_id: string, user: IUsersModel): Promise<IUsersModel> {
    const err = user.validateSync();
    if (err) {
        throw new ValidationError(err.message);
      }
    
      // Hash the password if it is present
      if (user.password) {
        const hashedPassword = cyber.hash(user.password);
        user.password = hashedPassword;
      }
   
    const newUser = await UsersModel.findByIdAndUpdate(_id, user, { returnOriginal: false });
    return newUser;
}

async function deleteOneUser(_id: string): Promise<void> {
    const user = await getUserById(_id);
    if (!user)
        throw new ValidationError("user not found");

    return await UsersModel.findByIdAndDelete(_id);
}

export default {
    getUserById,
    login,
    saveOneUser,
    getAllUsers,
    doesUserExistByEmail,
    updateOneUser,
    deleteOneUser
}