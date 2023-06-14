import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import categoryRouter from './routes/category'


dotenv.config()
const app = express();

const port = process.env.PORT || 8000;

app.get("/",(req,res) =>{
    res.send("Hello World")
})

//Kết nối cơ sở dữ liệu với mongoose alat
mongoose.connect(`mongodb+srv://truonghvph16694:${process.env.MONGO_DB}@cluster0.eux1ygq.mongodb.net/`)
.then(() =>{
    console.log('connect Db success!!');
})
.catch((err) =>{
    console.log('Error', err)
})

//Router
app.use("/api",categoryRouter)


app.listen(port , () =>{
    console.log('Service is running on port', port);
})