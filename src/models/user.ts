import { Schema, model, models, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface User extends Document {
    name: string;
    email: string;
    image: string;
    password: string;
    idToken?: string;
}

const userSchema = new Schema<User>({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    idToken: {
        type: String,
    },
});

userSchema.methods.encryptPassword = async function (this: User) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
};

userSchema.statics.comparePassword = async function (password: string, hash: string) {
    return await bcrypt.compare(password, hash);
};

userSchema.methods.generateToken = function (this: User) {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET || '');
};

export default models.User || model<User>('User', userSchema);
