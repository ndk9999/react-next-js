// Create mongodb connection
import mongoose from 'mongoose';

const connectMongoDb = async () => {
    await mongoose.connect('mongodb+srv://ndk9999:<password>@cluster0.xfhls.mongodb.net/?retryWrites=true&w=majority');
    console.log('Database connected');
}

export default connectMongoDb;