import mongoose, {Schema} from "mongoose";

const UserSchema = Schema({
    name: String,
    createdAt: {type: Date, default: Date.now},
    email: String,
    password: String,
    userName: String
});

export const UserModel = mongoose.model('User', UserSchema);