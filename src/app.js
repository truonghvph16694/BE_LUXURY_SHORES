import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from "./router/user"

dotenv.config()
const app = express();
app.use(cors())
app.use(express.json());

app.get("/",(req,res) =>{
    res.send("Hello World")
});

app.use("/api", userRouter);

mongoose.connect("mongodb://localhost:27017/datn-be").then(() => {
    console.log("connected");
})
.catch(() => {
    console.log("disconnect");
});
const port = process.env.PORT || 8000;


// //Kết nối cơ sở dữ liệu với mongoose alat
// mongoose.connect(`mongodb+srv://truonghvph16694:${process.env.MONGO_DB}@cluster0.eux1ygq.mongodb.net/`)
// .then(() =>{
//     console.log('connect Db success!!');
// })
// //Kết nối cơ sở dữ liệu với mongoose alat
// //Kết nối cơ sở dữ liệu với mongoose alat
// .catch((err) =>{
//     console.log('Error', err)
// })

app.listen(port , () =>{
    console.log('Service is running on port', port);
})