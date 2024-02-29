// mongoose.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();



const connectDB = async () => {
  try {
    // MongoDB connection URL

    const mongoURI = process.env.MONGODB_CONNECTION_STRING;

    


    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process with an error
  }
};

export default connectDB;
