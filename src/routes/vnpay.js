import express from "express";
import moment from "moment/moment";
import config from "config";
import VnPay from "../models/vnpay";
import Order from "../models/orders";
import qs from "qs"; // Make sure to import qs library

const router = express.Router();

router.post("/create_payment_url", async function (req, res, next) {
  console.log("req", req);

  var ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  var tmnCode = "IPRE6WME";
  var secretKey = "NFPUZEGVZABQIWBVTWEXLBYHRPYHILXY";
  var vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
  // var returnUrl = "https://localhost:3000/vnpay_return";
  var returnUrl = "http://localhost:3000/thanks/" + req.body.orderid;
  // var returnUrl =
  //   `https://localhost:3000/vnpay_checkout_result/` + req.body.orderid;
  var vnp_ReturnUrl2 = "http://localhost:3000/order";

  var date = new Date();
  var createDate = moment(date).format("YYYYMMDDHHmmss");
  var orderId = req.body.orderid;
  var amount = req.body.amount;
  var bankCode = req.body.bankCode;
  var orderInfo = req.body.orderDescription;
  var orderType = req.body.orderType;
  var locale = req.body.language;
  if (locale === null || locale === "") {
    locale = "vn";
  }
  var currCode = "VND";
  var vnp_Params = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  vnp_Params["vnp_Locale"] = locale;
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_TxnRef"] = orderId;
  vnp_Params["vnp_OrderInfo"] = orderInfo;
  vnp_Params["vnp_OrderType"] = orderType;
  vnp_Params["vnp_Amount"] = amount * 100;
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_IpAddr"] = ipAddr;
  vnp_Params["vnp_CreateDate"] = createDate;
  if (bankCode !== null && bankCode !== "") {
    vnp_Params["vnp_BankCode"] = bankCode;
  }

  vnp_Params = sortObject(vnp_Params); // Calling the sortObject function
  var querystring = require("qs");
  var signData = querystring.stringify(vnp_Params, { encode: false });
  var signData = qs.stringify(vnp_Params, { encode: false });
  var crypto = require("crypto");
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
  res.json({
    code: 200,
    vnpUrl,
  });
});
//
router.get("/vnpay_return", function (req, res, next) {
  let vnp_Params = req.query;
  console.log("vnp+Pảeam", vnp_Params);
  let secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);

  let config = require("config");
  let tmnCode = config.get("vnp_TmnCode");
  let secretKey = config.get("vnp_HashSecret");

  let querystring = require("qs");
  let signData = querystring.stringify(vnp_Params, { encode: false });
  let crypto = require("crypto");
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

  if (secureHash === signed) {
    //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

    res.render("success", { code: vnp_Params["vnp_ResponseCode"] });
  } else {
    res.render("success", { code: "97" });
  }
});
router.get("/vnpay_checkout_result/:id", async function (req, res, next) {
  // let vnp_Params = req.query;
  // console.log("vnp_Params", vnp_Params);
  let orderId = req.params.id;
  // let secureHash = vnp_Params["vnp_SecureHash"];
  let vnp_Params = req.query;
  // let secureHash = vnp_Params["vnp_SecureHash"];

  // let orderId = vnp_Params["vnp_TxnRef"];
  let rspCode = vnp_Params["vnp_ResponseCode"];
  let result = false;
  if (rspCode == "00") {
    result = await Order.findOneAndUpdate(
      { _id: orderId },
      { status_payment: 1 }
    ).exec();
  }
  return res.json({
    code: 200,
    result: result,
  });
});
//
router.get("/vnpay_ipn", async function (req, res, next) {
  let vnp_Params = req.query;
  let secureHash = vnp_Params["vnp_SecureHash"];

  let orderId = vnp_Params["vnp_TxnRef"];
  let rspCode = vnp_Params["vnp_ResponseCode"];

  if (rspCode == "00") {
    await Order.findOneAndUpdate(
      { _id: orderId },
      { status_payment: 1 }
    ).exec();
  }
  // return returnUrlThanks;

  // delete vnp_Params["vnp_SecureHash"];
  // delete vnp_Params["vnp_SecureHashType"];

  // vnp_Params = sortObject(vnp_Params);
  // let config = require("config");
  // let secretKey = config.get("vnp_HashSecret");
  // let querystring = require("qs");
  // let signData = querystring.stringify(vnp_Params, { encode: false });
  // let crypto = require("crypto");
  // let hmac = crypto.createHmac("sha512", secretKey);
  // let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

  let status_payment = 0; // Giả sử '0' là trạng thái khởi tạo giao dịch, chưa có IPN. Trạng thái này được lưu khi yêu cầu thanh toán chuyển hướng sang Cổng thanh toán VNPAY tại đầu khởi tạo đơn hàng.
  //let paymentStatus = '1'; // Giả sử '1' là trạng thái thành công bạn cập nhật sau IPN được gọi và trả kết quả về nó
  //let paymentStatus = '2'; // Giả sử '2' là trạng thái thất bại bạn cập nhật sau IPN được gọi và trả kết quả về nó

  let checkOrderId = true; // Mã đơn hàng "giá trị của vnp_TxnRef" VNPAY phản hồi tồn tại trong CSDL của bạn
  let checkAmount = true; // Kiểm tra số tiền "giá trị của vnp_Amout/100" trùng khớp với số tiền của đơn hàng trong CSDL của bạn
  if (secureHash === signed) {
    //kiểm tra checksum
    if (checkOrderId) {
      if (checkAmount) {
        if (status_payment == 0) {
          //kiểm tra tình trạng giao dịch trước khi cập nhật tình trạng thanh toán
          if (rspCode == "00") {
            //thanh cong
            status_payment = 1;
            // Ở đây cập nhật trạng thái giao dịch thanh toán thành công vào CSDL của bạn
            res.status(200).json({ RspCode: "00", Message: "Success" });
          } else {
            //that bai
            status_payment = 2;
            // Ở đây cập nhật trạng thái giao dịch thanh toán thất bại vào CSDL của bạn
            res.status(200).json({ RspCode: "00", Message: "Success" });
          }
        } else {
          res.status(200).json({
            RspCode: "02",
            Message: "This order has been updated to the payment status",
          });
        }
      } else {
        res.status(200).json({ RspCode: "04", Message: "Amount invalid" });
      }
    } else {
      res.status(200).json({ RspCode: "01", Message: "Order not found" });
    }
  } else {
    res.status(200).json({ RspCode: "97", Message: "Checksum failed" });
  }
});
// router.get("/vnpay_return", async function (req, res, next) {
//   console.log("req", req);
//   var vnp_Params = req.query;
//   var secureHash = vnp_Params["vnp_SecureHash"];
//   const exitsTMCODE = await VnPay.findOne({
//     vnp_TxnRef: vnp_Params.vnp_TxnRef,
//   }).exec();
//   const exitsOrder = await Order.findOne({
//     tm_codeorder: vnp_Params.vnp_TxnRef,
//   }).exec();
//   if (exitsTMCODE) {
//     await VnPay.findOneAndUpdate(
//       { vnp_TxnRef: vnp_Params.vnp_TxnRef },
//       vnp_Params
//     );
//   } else {
//     await VnPay(vnp_Params).save();
//   }
//   delete vnp_Params["vnp_SecureHash"];
//   delete vnp_Params["vnp_SecureHashType"];

//   vnp_Params = sortObject(vnp_Params);

//   var tmnCode = config.get("vnp_TmnCode");
//   var secretKey = config.get("vnp_HashSecret");
//   var url2 = "http://localhost:3000/orders";
//   var querystring = require("qs");
//   var signData = querystring.stringify(vnp_Params, { encode: false });
//   var crypto = require("crypto");
//   var hmac = crypto.createHmac("sha512", secretKey);
//   var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
//   if (secureHash === signed) {
//     //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

//     const result = {
//       code: "",
//       message: "",
//     };
//     if (vnp_Params["vnp_ResponseCode"] === "00") {
//       result.code = vnp_Params["vnp_ResponseCode"];
//       result.message = "Giao dịch thành công";
//       await Order.findOneAndUpdate(
//         { tm_codeorder: vnp_Params.vnp_TxnRef },
//         { status_payment: 1 }
//       ).exec();
//     } else if (vnp_Params["vnp_ResponseCode"] === "07") {
//       result.code = vnp_Params["vnp_ResponseCode"];
//       result.message =
//         "Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường).";
//     } else if (vnp_Params["vnp_ResponseCode"] === "09") {
//       result.code = vnp_Params["vnp_ResponseCode"];
//       result.message =
//         "Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng.";
//     } else if (vnp_Params["vnp_ResponseCode"] === "10") {
//       result.code = vnp_Params["vnp_ResponseCode"];
//       result.message =
//         "Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần";
//     } else if (vnp_Params["vnp_ResponseCode"] === "11") {
//       result.code = vnp_Params["vnp_ResponseCode"];
//       result.message =
//         "Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch.";
//     } else if (vnp_Params["vnp_ResponseCode"] === "12") {
//       result.code = vnp_Params["vnp_ResponseCode"];
//       result.message =
//         "Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa.";
//     } else if (vnp_Params["vnp_ResponseCode"] === "13") {
//       result.code = vnp_Params["vnp_ResponseCode"];
//       result.message =
//         "Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP). Xin quý khách vui lòng thực hiện lại giao dịch.";
//     } else if (vnp_Params["vnp_ResponseCode"] === "24") {
//       result.code = vnp_Params["vnp_ResponseCode"];
//       result.message =
//         "Giao dịch không thành công do: Khách hàng hủy giao dịch.";
//     } else if (vnp_Params["vnp_ResponseCode"] === "51") {
//       result.code = vnp_Params["vnp_ResponseCode"];
//       result.message =
//         "Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.";
//     } else if (vnp_Params["vnp_ResponseCode"] === "65") {
//       result.code = vnp_Params["vnp_ResponseCode"];
//       result.message =
//         "Giao dịch không thành công do: Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày.";
//     } else if (vnp_Params["vnp_ResponseCode"] === "75") {
//       result.code = vnp_Params["vnp_ResponseCode"];
//       result.message = "Ngân hàng thanh toán đang bảo trì.";
//     } else if (vnp_Params["vnp_ResponseCode"] === "79") {
//       result.code = vnp_Params["vnp_ResponseCode"];
//       result.message =
//         "Giao dịch không thành công do: KH nhập sai mật khẩu thanh toán quá số lần quy định. Xin quý khách vui lòng thực hiện lại giao dịch";
//     } else if (vnp_Params["vnp_ResponseCode"] === "99") {
//       result.code = vnp_Params["vnp_ResponseCode"];
//       result.message =
//         "Các lỗi khác (lỗi còn lại, không có trong danh sách mã lỗi đã liệt kê)";
//     }

//     res.redirect(url2);
//     //  res.json(result)
//   } else {
//     res.redirect(url2);
//     // res.json({code: 400, message: "Sai thông tin!"})
//   }
// });

// // Vui lòng tham khảo thêm tại code demo
function sortObject(obj) {
  var sorted = {};
  var str = [];
  var key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}
export default router;
