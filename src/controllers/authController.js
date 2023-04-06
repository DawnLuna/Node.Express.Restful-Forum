import { User } from '../models/userSchema';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = (req, res) => {
    let newUser = new User(req.body);
    newUser.password = bcrypt.hashSync(req.body.password, +process.env.SALT_ROUND);
    newUser.save((err, user) => {
        if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                // Duplicate username/email
                return res.status(422).send({ success: false, message: 'Username or email has been taken!' });
            }
            // other error
            return res.status(422).send({ success: false, message: 'Registration failed!', err });
        } else {
            return res.status(201).json(
                {
                    success: true,
                    message: 'User created!',
                    token: jwt.sign({
                        uid: user._id,
                        username: user.username
                    }, process.env.JWT_SECRET, { expiresIn: '7d' })
                }
            );
        }
    });
}

export const login = (req, res) => {
    const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const query = emailRegex.test(req.body.username) ? { email: req.body.username } : { username: req.body.username };

    User.findOne(query, (err, user) => {
        if (err) {
            return res.status(401).json(err);
        }
        if (!user) {
            return res.status(401).json({ success: false, message: "Login failed, pleace check username/email or password." });
        } else {
            if (!user.comparePassword(req.body.password, user.password)) {
                return res.status(401).json({ success: false, message: "password not match." });
            } else {
                return res.json({
                    success: true,
                    message: 'Login succes!',
                    token: jwt.sign(
                        {
                            uid: user._id,
                            username: user.username,
                        },
                        process.env.JWT_SECRET,
                        { expiresIn: '7d' }
                    )
                });
            }
        }
    });
}

export const authCheck = (req, res, next) => {
    if (req.headers && req.headers.authorization) {
        jwt.verify(req.headers.authorization, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).json({ success: false, message: "Authentication failed!", error: err });
            }
            User.findById(
                decode.uid,
                {},
                (err, user) => {
                    if (err) {
                        req.user = undefined;
                        next();
                        //return res.status(401).json({ success: false, message: "Login required!" });
                    } else if (!user) {
                        req.user = undefined;
                        next();
                        //return res.status(401).json({ success: false, message: "User not found" });
                    //} else if (user.banned === true) {
                        //return res.status(401).json({ success: false, message: "You have been banned!" });
                    } else {
                        req.user = decode;
                        next();
                    }
                }
            );
        })
    } else {
        req.user = undefined;
        next();
    }
}

export const loginCheck = (req, res, next) => {
    if(!req.user) return res.status(401).json({ success: false, message: "Login required!" });
    next();
}

export const changePassword = (req, res) => {
    User.findById(
        req.user.uid,
        (err, user) => {
            if (err) {
                return res.status(401).json({ success: false, message: "Error finding user!", error: err });
            } else {
                if (!user.comparePassword(req.body.oldPassword, user.password)) {
                    return res.status(401).json({ success: false, message: "Old password dose not match." });
                } else {
                    user.password = bcrypt.hashSync(req.body.newPassword, +process.env.SALT_ROUND);
                    user.save(
                        (saveErr, updatedUser) => {
                            if (saveErr) {
                                return res.status(401).json({ success: false, message: "Error updating!", error: err });
                            } else {
                                return res.status(200).json({ success: true, message: "Password has been updated!" });
                            }
                        }
                    );

                }
            }
        }
    );
}

/*
 * todo: reset password
 */
