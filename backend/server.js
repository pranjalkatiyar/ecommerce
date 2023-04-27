const app=require('./app');
const dotenv=require('dotenv');
const connectDatabase=require('./config/database');
dotenv.config({path:'backend/config/config.env'});
const cors=require('cors');

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
    origin:'*'  // allow all origins
}));

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