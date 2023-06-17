import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import cors from "cors";
import mongoose from 'mongoose';
import categoryRouter from './routes/category'
import productRouter from "./routes/product";
import routerOrders from './routes/orders';


import morgan from 'morgan';

dotenv.config()
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"))
app.use(bodyParser.json());


mongoose.connect("mongodb://127.0.0.1:27017/datn")
.then(() =>{
    console.log('connect Db success!!');
})
.catch((err) =>{
    console.log('Error', err)
})

const port = process.env.PORT || 8000;

app.get("/",(req,res) =>{
    res.send("Hello World")
})

// //Kết nối cơ sở dữ liệu với mongoose alat
// mongoose.connect(`mongodb+srv://truonghvph16694:${process.env.MONGO_DB}@cluster0.eux1ygq.mongodb.net/`)
// .then(() =>{
//     console.log('connect Db success!!');
// })
// .catch((err) =>{
//     console.log('Error', err)
// })

//Router
app.use("/api",categoryRouter);
app.use("/api", productRouter);
app.use("/api",routerOrders)


app.listen(port , () =>{
    console.log('Service is running on port', port);
})