const express=require('express');
const app=express();
const errorMiddleware=require('./middleware/error');
const cookieParser=require('cookie-parser');
const cors=require('cors');
const fileupload=require('express-fileupload');

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin:'*'  // allow all origins
}));
app.use(fileupload());

const productRoutes=require('./routes/productRoutes');
const userRoutes=require('./routes/userRoutes');
const orderRoutes=require('./routes/orderRoutes');

// error Middleware
app.use(errorMiddleware);
// routes imports
// productRoute
app.use("/api/v1",productRoutes);

// UserRouter
app.use("/api/v1",userRoutes);

// Order Router
app.use("/api/v1",orderRoutes);

module.exports=app;
