const app=require('./app');
const dotenv=require('dotenv');
const connectDatabase=require('./config/database');
dotenv.config({});
const cors=require('cors');
const cloudinary=require('cloudinary');

// connection datbase
connectDatabase();

// Handle uncaught exception
process.on('uncaughtException',err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught exception`);
    process.exit(1);
});

// console.log(youtube);
app.use(cors({
    origin:'*',  // allow all origins
 }));

// setting up cloudinary config
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

app.get("/testing",(req,res)=>{
    res.status(200).json({
        msg:"Connected",
        success:true
    });
})

const server=app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});


// unhandeled promise rejection
process.on('unhandledRejection',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`);

    // closing the server
    server.close(()=>{
        process.exit(1);
    })
})