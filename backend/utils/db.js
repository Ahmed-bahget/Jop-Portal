import mongoose from "mongoose";


const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.DB_URL, {
        });
        
        console.log(`DB Connected`);
    }catch(err){
        console.log("Error connecting to DB:", err.message);
        process.exit(1);
    }
}

export default connectDB;