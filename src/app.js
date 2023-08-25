import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import categoryRouter from "./routes/category";
import routerOrders from "./routes/orders";
import feedbackRouter from "./routes/feedback";
import routerDetail from "./routes/order-detail";
import productRouter from "./routes/product";
import productentryRouter from "./routes/prroduct_entry";
import productsize from "./routes/product_size";
import productcolor from "./routes/product_color";

import userRouter from "./routes/user";
import cartRouter from "./routes/cart";
import routerUpload from "./routes/upload";
import routerVNPAY from "./routes/vnpay";
import morgan from "morgan";
import routerBills from "./routes/bills";
import routerImage from "./routes/product_image";
import routerProductCate from "./routes/product_category";
import routerUploadImage from "./routes/upload";

dotenv.config();
const app = express();
// app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
// app.use(bodyParser.json());

// mongoose.connect("mongodb://127.0.0.1:27017/datn")
// .then(() =>{
//     console.log('connect Db success!!');
// })
// .catch((err) =>{
//     console.log('Error', err)
// })

//Router
app.use(express.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

app.use(express.json());
app.use("/api", categoryRouter);
const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

// //Kết nối cơ sở dữ liệu với mongoose alat
mongoose
  .connect(
    `mongodb+srv://truonghvph16694:${process.env.MONGO_DB}@cluster0.eux1ygq.mongodb.net/`
  )
  .then(() => {
    console.log("connect Db success!!");
  })
  .catch((err) => {
    console.log("Error", err);
  });

//Router
app.use("/api", categoryRouter);
app.use("/api", productRouter);
app.use("/api", routerOrders);
app.use("/api", feedbackRouter);
app.use("/api", routerDetail);
app.use("/api", routerBills);
// app.use("/api", routerImage)
app.use("/api", routerProductCate);
app.use("/api", productentryRouter);
app.use("/api", productsize);
app.use("/api", productcolor);
app.use("/api", routerUpload);
app.use("/api", routerUploadImage);
app.use("/api", userRouter);
app.use("/api", cartRouter);
app.use("/api", routerVNPAY);

app.listen(port, () => {
  console.log("Service is running on port", port);
});
