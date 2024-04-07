import express, { Request, Response } from 'express';
const router = express.Router();
import UserService from '../service/UserService';

// Get all users
router.get('/', async (req: Request, res: Response) => {
    try {
        const user = await UserService.getAllUsers();
        res.render('user/user', { user });

    } catch (error) {
        res.status(500).json({ message: error });
    }
});

// Get user by id
router.get('/edit/:id', async (req: Request, res: Response) => {
    try {
        const user = await UserService.getUser(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'No user found' });
        }
        res.render('user/edit', { user });
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

// Create user
router.get('/add', async (req: Request, res: Response) => {
    res.render('user/add');
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
router.put('/update/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const { username, email, phone, age } = req.body; // Destructure req.body
        console.log("router" + id + username + email + phone + age);
        const user = await UserService.updateUser(id, username, email, phone, age);
        
        if (!user) {
            res.status(404).json({ message: 'No user found' });
        }
        console.log(user);
        res.status(200).json({ result: 'success' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

// Delete user
router.delete('/delete/:id', async (req: Request, res: Response) => {
    try {
        const user = await UserService.deleteUser(req.params.id);
        console.log(user);
        if (!user) {
            res.status(404).json({ message: 'No user found' });
        }
        res.status(200).json({ result: 'success' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
});



export default router;