import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

interface UserRequestBody {
    username: string;
    email: string;
    password: string;
    refreshToken?: string;
}

const userSchema = Joi.object<UserRequestBody>({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')).required()
        .messages({
            'string.pattern.base': 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one special character, and one number.'
        }),
    refreshToken: Joi.string().allow('').optional(), 
});


function validateUser(req: Request, res: Response, next: NextFunction) {
    
    const { error } = userSchema.validate(req.body as UserRequestBody);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    
    next();
}

export { validateUser };
