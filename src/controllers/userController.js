import { User } from '../models/userSchema';
import mongoose from 'mongoose';

export const getUserInfoById = (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.uid)) {
        return res.status(400).json({ success: false, message: "invalid uid" });
    }
    User.findOne(
        {
            _id: req.params.uid
        },
        {
            email: 0,
            password: 0,
            updatedAt: 0,
            __v: 0
        },
        (err, user) => {
            if (err) {
                return res.status(502).send({ success: false, message: "Error finding user!", error: err });
            } else if (!user) {
                return res.status(404).send({ success: true, message: "User not found", error: err });
            } else {
                return res.json(user);
            }
        }
    );
}

/*
 * todo: change user setting
 */

/*
 * todo: deactive user
 */