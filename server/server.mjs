import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'; 
import cors from 'cors';
import connectDB from './mongoose.mjs';
import userRoutes from './allRoutes/users.mjs'
import colorRoutes from './allRoutes/colors.mjs'
import compression from 'compression';



dotenv.config();  

const app = express();

app.use(compression());

const port = process.env.PORT || 7000;

app.use(express.json());
app.use(cors());

connectDB();

app.use('/api', colorRoutes);
app.use('/user', userRoutes);


mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});




app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);

  
});