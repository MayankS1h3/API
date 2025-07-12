import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { JWT_EXPIRY, JWT_SECRET } from "../config/env.js";
import User from '../models/user.model.js';

export const signUp = async (req, res, next) => {
  const mongooseSession = await mongoose.startSession();
  mongooseSession.startTransaction();

  try {
    const {name, email, password} = req.body;

    const existingUser = await User.findOne({email});

    if(existingUser){
        const error = new Error('User already exist');
        error.statusCode = 409;
        throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUsers = await User.create([{
        name,
        email,
        password: hashedPassword
    }],{session: mongooseSession});

    const token = jwt.sign({userId: newUsers[0]._id}, JWT_SECRET, {expiresIn: JWT_EXPIRY});

    res.status(201).json({
        success: true,
        message: 'New user created successfully',
        data: {
            token: token,
            userId: newUsers[0]._id
        }
    });

    await mongooseSession.commitTransaction();
    mongooseSession.endSession();
  } catch (error) {
    await mongooseSession.abortTransaction();
    mongooseSession.endSession();
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const {email, password} = req.body;
  const existingUser = await User.findOne({email});

  if(!existingUser){
    const error = new Error('User does not exist');
    error.status = 401;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, existingUser.password);

  if(!isMatch){
    const error = new Error('Password does not match');
    error.status = 401;
    throw error;
  }

  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: {
      token: token,
      userId: existingUser._id
    }
  })
};

export const signOut = async (req, res, next) => {};
