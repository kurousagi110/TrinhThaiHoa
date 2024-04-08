import express, { Request, Response, Router } from 'express';
import UserService from './service/userService';
import AuthenToken from './middleWare/middleWare';


const router: Router = express.Router();




//get score board
router.get('/score', async (req: Request, res: Response) => {
    try {
        const users = await UserService.getScoreBroad();
        if (!users) {
            return res.status(404).json({ message: 'No user found' });
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//register
router.post('/register', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    console.log(username, password);
    if (!username || !password) {
        return res.status(400).json({ message: 'Missing username or password' });
    }
    try {
        const user = await UserService.register(username, password);
        if (!user) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//login
router.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Missing username or password' });
    }
    try {
        const result = await UserService.login(username, password);
        if (!result) {
            return res.status(400).json({ message: 'Username or password is incorrect' });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//update score
router.put('/update', AuthenToken, async (req: Request, res: Response) => {
    const { username, score } = req.body;
    console.log(username, score);
    if (!username || !score) {
        return res.status(400).json({ message: 'Missing username or score' });
    }
    try {
        const user = await UserService.updateScore(username, score);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;