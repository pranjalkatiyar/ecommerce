const express=require('express');
const app=express();
const errorMiddleware=require('./middleware/error');
const cookieParser=require('cookie-parser');
const cors=require('cors');
const dotenv=require('dotenv');
const fileupload=require('express-fileupload');

dotenv.config({path:"/config.env"});

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin:'*'  // allow all origins
}));
app.use(fileupload());

const productRoutes=require('./routes/productRoutes');
const userRoutes=require('./routes/userRoutes');
const orderRoutes=require('./routes/orderRoutes');
const paymentRoutes=require('./routes/paymentRoutes');

// error Middleware
app.use(errorMiddleware);
// routes imports
// productRoute
app.use("/api/v1",productRoutes);

// UserRouter
app.use("/api/v1",userRoutes);

// Order Router
app.use("/api/v1",orderRoutes);

// payment router
app.use("/api/v1",paymentRoutes);

module.exports=app;
