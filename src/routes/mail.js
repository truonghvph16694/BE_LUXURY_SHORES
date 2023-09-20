import express from "express";
import product from "../models/product";

const router = express.Router();

// router.get("/send-mail", sendEmail);

var nodemailer = require("nodemailer"); // khai báo sử dụng module nodemailer
router.post("/send-mail-create", function (req, res, next) {
  const body = req.body;
  //   console.log(req);
  var transporter = nodemailer.createTransport({
    // config mail server
    service: "Gmail",
    auth: {
      user: "hamanhhung1706@gmail.com",
      pass: "dxbeiqoxeetkukqm",
    },
  });

  var productsHTML = ``;
  body.order.product.map((item) => {
    productsHTML =
      productsHTML +
      `<tr>
      <td>${item.product.name}</td>
      <td>${item.quantity}</td>
      <td>${item.product.price}</td>
      <td>${item.quantity * item.product.price}</td>
    </tr>`;
  });
  var mainOptions = {
    // thiết lập đối tượng, nội dung gửi mail
    from: "Thanh Batmon",
    to: body.user.email,
    subject: "Đặt hàng thành công",
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thông báo đặt hàng thành công</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f2f2f2;
                margin: 0;
                padding: 0;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                position: relative; /* Để .tt có thể căn góc phải */
            }
    
            .header {
                display: flex;
                justify-content: center; /* Căn giữa theo chiều ngang */
                align-items: center; /* Căn giữa theo chiều dọc */
                margin-bottom: 20px; /* Để tạo khoảng cách giữa header và nội dung */
            }
    
            .header img {
                width: auto;
                height: 50px;
            }
    
            h1 {
                color: #333333;
            }
    
            p {
                font-size: 16px;    
                color: #555555;
            }
    
            table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
            }
    
            table, th, td {
                border: 1px solid #ddd;
            }
    
            th, td {
                padding: 8px;
                text-align: left;
            }
    
            th {
                background-color: #f2f2f2;
            }
    
            .tt {
                position: absolute;
                right: 50px;
                padding: 10px;
                font-weight: bold;
            }
            .container p{
                padding-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <img src="./public/logo1.jpg" alt="">
            </div>
            <h1>Đặt hàng thành công!</h1>
            Xin chào: <b>${body.user.fullname}</b>  
            <p>Cảm ơn bạn đã đặt hàng tại cửa hàng của chúng tôi. Đơn hàng của bạn đã được xác nhận và đang được xử lý.</p>
            <p>Chi tiết đơn hàng:</p>
            <table>
                <tr>
                    <th>Sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Đơn giá</th>
                    <th>Tổng cộng</th>
                </tr>
               ${productsHTML}
               
               
            </table>
            
            <span class="tt"><small>Phí ship:${body.order.ships}đ</small>Tổng tiền : ${body.order.total_price}đ</span>
            <p>Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi. Chúng tôi sẽ thông báo cho bạn khi đơn hàng của bạn được giao.</p>
            <!-- <a href="/localhost:3000/orders" class="button">Xem đơn hàng</a> -->
        </div>
    </body>
    </html>
    `,
  };
  transporter.sendMail(mainOptions, function (err, info) {
    if (err) {
      console.log(err);
      res.redirect("/");
    } else {
      console.log("Message sent: " + info.response);
      res.redirect("/");
    }
  });
});

router.post("/send-mail-finish", function (req, res, next) {
  const body = req.body;
  //   console.log(req);
  var transporter = nodemailer.createTransport({
    // config mail server
    service: "Gmail",
    auth: {
      user: "hamanhhung1706@gmail.com",
      pass: "dxbeiqoxeetkukqm",
    },
  });

  var productsHTML = ``;
  body.order.product.map((item) => {
    productsHTML =
      productsHTML +
      `<tr>
        <td>${item.product.name}</td>
        <td>${item.quantity}</td>
        <td>${item.product.price}</td>
        <td>${item.quantity * item.product.price}</td>
      </tr>`;
  });
  var mainOptions = {
    // thiết lập đối tượng, nội dung gửi mail
    from: "Thanh Batmon",
    to: body.user.email,
    subject: "Giao hàng thành công",
    html: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thông báo đặt hàng thành công</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f2f2f2;
                  margin: 0;
                  padding: 0;
              }
      
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #ffffff;
                  border-radius: 5px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                  position: relative; /* Để .tt có thể căn góc phải */
              }
      
              .header {
                  display: flex;
                  justify-content: center; /* Căn giữa theo chiều ngang */
                  align-items: center; /* Căn giữa theo chiều dọc */
                  margin-bottom: 20px; /* Để tạo khoảng cách giữa header và nội dung */
              }
      
              .header img {
                  width: auto;
                  height: 50px;
              }
      
              h1 {
                  color: #333333;
              }
      
              p {
                  font-size: 16px;    
                  color: #555555;
              }
      
              table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-top: 20px;
              }
      
              table, th, td {
                  border: 1px solid #ddd;
              }
      
              th, td {
                  padding: 8px;
                  text-align: left;
              }
      
              th {
                  background-color: #f2f2f2;
              }
      
              .tt {
                  position: absolute;
                  right: 50px;
                  padding: 10px;
                  font-weight: bold;
              }
              .container p{
                  padding-top: 20px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <img src="./public/logo1.jpg" alt="">
              </div>
              <h1>Đặt hàng thành công!</h1>
              Xin chào: <b>${body.user.fullname}</b>  
              <p>Cảm ơn bạn đã đặt hàng tại cửa hàng của chúng tôi. Đơn hàng của bạn đã được xác nhận và đang được xử lý.</p>
              <p>Chi tiết đơn hàng:</p>
              <table>
                  <tr>
                      <th>Sản phẩm</th>
                      <th>Số lượng</th>
                      <th>Đơn giá</th>
                      <th>Tổng cộng</th>
                  </tr>
                 ${productsHTML}
                 
                 
              </table>
              
              <span class="tt"><small>Phí ship:${body.order.ships}đ</small>Tổng tiền : ${body.order.total_price}đ</span>
              <p>Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi. Chúng tôi sẽ thông báo cho bạn khi đơn hàng của bạn được giao.</p>
              <!-- <a href="/localhost:3000/orders" class="button">Xem đơn hàng</a> -->
          </div>
      </body>
      </html>
      `,
  };
  transporter.sendMail(mainOptions, function (err, info) {
    if (err) {
      console.log(err);
      res.redirect("/");
    } else {
      console.log("Message sent: " + info.response);
      res.redirect("/");
    }
  });
});
export default router;
