import { Request, Response, NextFunction } from 'express';
import User from '../model/userModel'; // Import your user model
const jwt = require('jsonwebtoken');

// Middleware to authenticate the token
function AuthenToken(req: Request, res: Response, next: NextFunction) {
    const author = req.headers['authorization'];

    // Kiểm tra xem authorization header có tồn tại không
    if (!author) {
        return res.status(401).json({ message: 'Authorization header not found' });
    }

    // Bearer token
    const token = author.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }

    const key = "iloveyou";
    jwt.verify(token, key, async (err: any, user: any) => {
        if (err) {
            return res.status(401).json({ message: 'Token invalid' });
        }

        // Check user.version against the database
        try {
            const foundUser = await User.findOne({ username: user.username });
            console.log('found' + foundUser);
            console.log(user.username);
            if (foundUser) {
                if (foundUser.username !== user.username) {
                    return res.status(401).json({ message: 'Token expired' });
                }
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        next();
    });
}

export default AuthenToken;
