import express, { Request, Response, Router } from 'express';
import UserService from '../service/UserService';

const router: Router = express.Router();

// Get all users
router.get('/get-all', async (req: Request, res: Response) => {
    try {
        const users = await UserService.getAllUsers();
        if(!users) {
            res.status(404).json({ message: 'No user found' });
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

// Get user by id
router.get('/get-by-id/:id', async (req: Request, res: Response) => {
    try {
        const user = await UserService.getUser(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'No user found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

// Create user
router.post('/add-user', async (req: Request, res: Response) => {
    try {
        const { username, email, phone, age } = req.body; // Destructure req.body
        const user = await UserService.addUser(username, email, phone, age);
        if (!user) {
            res.status(404).json({ message: 'There is already a user using it' });
        }
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

// Update user
router.put('/update-user/:id', async (req: Request, res: Response) => {
    try {
        const { id, username, email, phone, age } = req.body; // Destructure req.body
        const user = await UserService.updateUser(id, username, email, phone, age);
        if (!user) {
            res.status(404).json({ message: 'No user found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

// Delete user
router.delete('/delete-user/:id', async (req: Request, res: Response) => {
    try {
        const user = await UserService.deleteUser(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'No user found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

export default router;
