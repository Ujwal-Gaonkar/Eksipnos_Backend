import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Define the MongoDB connection function
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string, {
      // Mongoose handles the default options; no need for 'useNewUrlParser' and 'useUnifiedTopology'
    } as ConnectOptions);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Safely handle unknown errors by casting to the Error type
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
      process.exit(1); // Exit process with failure
    } else {
      console.error('An unknown error occurred');
      process.exit(1); // Exit process with failure
    }
  }
};

export default connectDB;
