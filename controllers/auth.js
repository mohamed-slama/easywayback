import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const usernamecheck = await User.findOne({ username: req.body.username });
    const emailcheck = await User.findOne({  email : req.body.email});
   
    const newUser = new User({  
      ...req.body,
      password: hash,
    });
    if (usernamecheck) return next(createError(404,"username alredy exist ")) ; 
    if (emailcheck) return next(createError(404,"email alredy exist ")) ; 
    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or email!"));

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT
    );

    const { password, ...otherDetails } = user._doc;
    const userr=user._doc;
    var data = {
       data:user,token
    };
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json( data );
  } catch (err) {
    next(err);
  }
};
