import UserModel from "../model/UserModel";


//getAllUsers
const getAllUsers = async () => {
    try {
        const users = await UserModel.find({ status: 1});
        if (users.length === 0) {
            return false;
        }
        return users;
    } catch (error) {
        throw error;
    }
};

//addUser
const addUser = async (username: string, email: string, phone: string, age: number) => {
    try {
        const check = await UserModel.findOne({ username, email});
        if (check) {
            if (check.status === 0) {
                check.status = 1;
                check.username = username;
                check.email = email;
                check.phone = phone;
                check.age = age;
                
                await check.save();
                return check;
            }
            return false;
        }
        const user = new UserModel({
            username,
            email,
            phone,
            age
        });
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
};

//getUser
const getUser = async (id: string) => {
    try {
        const user = await UserModel.findById(id);
        if (!user) {
            return false;
        }
        return user;
    } catch (error) {
        throw error;
    }
};

//updateUser
const updateUser = async (id: string, username: string, email: string, phone: string, age: number) => {
    try {
        const user = await UserModel.findById(id);
        console.log( "service" + user);
        if (!user) {
            return false;
        }
        user.username = username;
        user.email = email;
        user.phone = phone;
        user.age = age;
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
};

//deleteUser
const deleteUser = async (id: string) => {
    try {
        const user = await UserModel.findById(id);
        if (!user) {
            return false;
        }
        user.status = 0;
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
};


export default {
    getAllUsers,
    addUser,
    getUser,
    updateUser,
    deleteUser
};