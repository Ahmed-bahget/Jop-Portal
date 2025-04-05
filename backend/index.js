import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import cookieparser from "cookie-parser";
import cors from "cors";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.routes.js"
import companyRoute from "./routes/company.routes.js"
import jobRoute from "./routes/job.routes.js"
import applicationRoute from "./routes/application.route.js"
const app = express();

app.get('/home' , (req,res)=>{
    res.status(200).json({
        message:'iam backend',
        success:true
    })
})
app.get('/' , (req,res)=>{
    res.status(200).send("<h1>hello in our jobportal website<h1/>")
})

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieparser());
const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(corsOptions));

const port = process.env.PORT || 2000 ;

//api's
app.use('/api/v1/user',userRoute);
app.use('/api/v1/company',companyRoute);
app.use('/api/v1/job',jobRoute);
app.use('/api/v1/application',applicationRoute);


app.listen(port , ()=>{
    connectDB();
    console.log(`server is run on http://localhost:${port}`)
})