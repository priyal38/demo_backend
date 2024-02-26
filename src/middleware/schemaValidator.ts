import { RequestHandler } from "express";
import schemas from "../utils/schemas";


const validationOptions = {
  abortEarly: false,  //collect all err ony stop on first err
  allowUnknown: false,  //unknown keys (keys not defined in the schema) as errors.
  
};

const schemaValidator = (path: string): RequestHandler => {
  const schema = schemas[path];

  if (!schema) {
    throw new Error(`Schema not found for path: ${path}`);
  }

  return (req, res, next) => {
    
    const { error, value } = schema.validate(req.body, validationOptions);

    if (error) {
   
       return  res.status(422).send(error.details.map(err => err.message));
    }

    // validation successful
    req.body = value;
    return next();
  };
};

export default schemaValidator;