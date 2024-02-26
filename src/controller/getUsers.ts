// controllers/userController.ts
import { Request, Response } from 'express';
import User from '../model/userModel'; // Assuming you have a UserModel defined

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        // Retrieve all user data from the database
        const users = await User.find();

        // Return user data as JSON response
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default getAllUsers;
