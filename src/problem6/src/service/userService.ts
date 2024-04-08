import UserModel from "../model/userModel";
const jwt = require('jsonwebtoken');


//get 10 user have highest score
const getScoreBroad = async () => {
    try {
        // Find users, sort them by score in descending order, and limit the result to 10 users
        const users = await UserModel.find().sort({ score: -1 }).limit(10);
        
        // If no users are found, return false
        if (users.length === 0) {
            return false;
        }
        
        // Return the array of users
        return users;
    } catch (error) {
        throw error;
    }
};

//createUser
const register = async (username: string, password: string) => {
    try {
        const check = await UserModel.findOne({ username });
        if (check) {
            return false;
        }
        const user = new UserModel({
            username,
            password,
        });
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
};

const login = async (username: string, password: string) => {
    try {
        const user = await UserModel.findOne({ username, password });
        if (!user) {
            return false;
        }
        const token = await taoToken(username);
        return { user, token };
    } catch (error) {
        throw error;
    }
};

const updateScore = async (username: string, score: number) => {
    try {
        const user = await UserModel.findOne({ username });
        if (!user) {
            return false;
        }
        user.score = score;
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
}

const taoToken = async (username : string) => {
    const key = "iloveyou"; // Use the same key as in your AuthenToken middleware
    const payload = { username: username };
    const token = jwt.sign(payload, key, { expiresIn: "24d" });
    return token;
  };

export default {
    getScoreBroad,
    register,
    login,
    updateScore
};