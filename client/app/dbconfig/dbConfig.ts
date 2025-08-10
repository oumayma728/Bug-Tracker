// Import the Mongoose library to interact with MongoDB
import mongoose from 'mongoose';
// Define an async function to connect to MongoDB
export async function connect (){
    try{
        await mongoose.connect(process.env.mongo_uri!);
        const connection =mongoose.connection;
        connection.on('connected' ,()=>
        {
            console.log('MongoDB connected successfully')
        })
        connection.on('error' ,(err)=>
        {
            console.log('MongoDB connection error .Please make sure MongoDB is running'+ err);
            process.exit();
        })
    }catch (error) {
            console.log('Something goes wrong!');
            console.log(error);

           }
        
    }