import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import cors from "cors";
import mongoose from 'mongoose';

import routerOrders from './routers/routers';
import morgan from 'morgan';

dotenv.config()
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"))

app.use("/api",routerOrders)

mongoose.connect("mongodb://127.0.0.1:27017/datn");

const port = process.env.PORT || 8000;
app.listen(port , () =>{
    console.log('Service is running on port', port);
})



// Dưới connect db atlat

// import express from 'express'
// import dotenv from 'dotenv'
// import mongoose from 'mongoose';
// import routerOrders from './routers/routers';


// dotenv.config()
// const app = express();

// const port = process.env.PORT || 8000;

// app.get("/",(req,res) =>{
//     res.send("Hello World")
// })

// app.use("/api",routerOrders)

// //Kết nối cơ sở dữ liệu với mongoose alat
// mongoose.connect(`mongodb+srv://truonghvph16694:${process.env.MONGO_DB}@cluster0.eux1ygq.mongodb.net/`)
// .then(() =>{
//     console.log('connect Db success!!');
// })
// .catch((err) =>{
//     console.log('Error', err)
// })

// app.listen(port , () =>{
//     console.log('Service is running on port', port);
// })