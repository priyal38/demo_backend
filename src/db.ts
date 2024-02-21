import mongoose from "mongoose";
 
const connection = async (): Promise<void> => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/demo');
        console.log('Connected to MongoDB');
        console.log(`Connected to MongoDB database: ${mongoose.connection.name}`);
    } catch (error) {
        console.error(error);
    }
}
 
export default connection;