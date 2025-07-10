import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        minLength: 1,
        maxLength: 20,
        required: [true, 'User name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'User email is required'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'User password is required'],
        minLength: 8
    }
}, {timestamps: true})

const User = new mongoose.model(User, userSchema);

export default User;