import mongoose from "mongoose";


const connectDB = async ()=>{
    try{
    await mongoose.connect(process.env.dburl);
    console.log('db connected')
}catch(err){
    console.log("err when try connct db" , err)
}
}

export default connectDB;