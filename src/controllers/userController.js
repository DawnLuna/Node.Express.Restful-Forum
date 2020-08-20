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
                return res.status(422).send({ succes: false, message: 'Username or email has been taken!' });
            }
            // other error
            return res.status(422).send({ succes: false, message: 'Registration failed!', err });
        } else {
            return res.status(201).json(
                {
                    succes: true,
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
            return res.status(401).json({ succes: false, message: "Login failed, pleace check username/email or password." });
        } else {
            if (!user.comparePassword(req.body.password, user.password)) {
                return res.status(401).json({ succes: false, message: "password not match." });
            } else {
                return res.json({
                    succes: true,
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