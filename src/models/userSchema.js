import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    banned: { type: Boolean, default: false }
},
    { timestamps: true }
);

UserSchema.methods.comparePassword = (plaintPassword, hashedPassword) => {
    return bcrypt.compareSync(plaintPassword, hashedPassword);
}

export const User = model('User', UserSchema);