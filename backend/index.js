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

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Backend is running',
        timestamp: new Date().toISOString()
    });
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieparser());
const allowedOrigins = [
  'https://jop-portal-git-main-ahmeds-projects-2d35e5c9.vercel.app',
  'https://jop-portal-three.vercel.app', 
  'http://localhost:5173',
  ...(process.env.NODE_ENV === 'production' ? [/^https:\/\/.*\.koyeb\.app$/] : [])
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list
    if (allowedOrigins.some(allowedOrigin => 
      typeof allowedOrigin === 'string' ? 
        origin === allowedOrigin : 
        allowedOrigin.test(origin)
    )) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));

//api's
app.use('/api/v1/user',userRoute);
app.use('/api/v1/company',companyRoute);
app.use('/api/v1/job',jobRoute);
app.use('/api/v1/application',applicationRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong",
    success: false
  });
});

const PORT = process.env.PORT || 1500;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();

