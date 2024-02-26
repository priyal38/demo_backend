import express, { Request, Response, NextFunction , RequestHandler} from "express";


interface myRequest extends Request{
    schemaValidator?:RequestHandler
}

const requestsValidator = (req: myRequest, res: Response, next: NextFunction) => {
   
    const requiredMethods = ['POST', 'PUT', 'PATCH'];
    if (requiredMethods.includes(req.method) && !req.schemaValidator) {
        return res.status(500).json({ error: 'schemaValidator middleware is required for this request' });
    }

    next(); 
};
export default requestsValidator




