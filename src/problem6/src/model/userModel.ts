import mongoose, { Document } from 'mongoose';

interface UserModelInterface extends Document {
    username: string;
    password: string;
    score: number;
    createdAt: Date;
    status: number;
}

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    score: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    status: { type: Number, default: 1 }
});

// Tạo model từ schema và interface
const UserModel = mongoose.model<UserModelInterface>('UserScore', UserSchema);

export default UserModel;
