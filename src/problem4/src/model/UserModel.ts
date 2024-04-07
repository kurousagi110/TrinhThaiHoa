import mongoose, { Document } from 'mongoose';

interface UserModelInterface extends Document {
    username: string;
    email: string;
    phone?: string;
    age?: number;
    createdAt: Date;
    status?: number;
}

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    age: { type: Number },
    createdAt: { type: Date, default: Date.now },
    status: { type: Number, default: 1 }
});

// Tạo model từ schema và interface
const UserModel = mongoose.model<UserModelInterface>('User', UserSchema);

export default UserModel;
