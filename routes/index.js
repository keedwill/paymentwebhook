var express = require("express");
const { generateBarcode } = require("../utils/barcode");
const { sendReceiptEmail } = require("../utils/sendEmail");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log("hello index ppage");
  res.render("index", { title: "Express" });
});

router.get("/contact", function (req, res, next) {
  res.render("contact", { title: "Contact" });
});

// router.post("/webhook/paystack", async (req, res) => {

//   console.log("Received webhook from Paystack:", req.body);
//    res.status(200)
//   // const event = req.body.event;
//   // const data = req.body.data;

//   // if (event === "charge.success" || event === "transfer.success") {
//   //   console.log("Payment successful:", data);

//   //   const customerEmail = data.customer.email;
//   //   const paymentData = {
//   //     reference: data.reference,
//   //     amount: data.amount,
//   //     paid_at: data.paid_at,
//   //     paymentStatus: data.status,
//   //     firstName: data.customer.first_name,
//   //     lastName: data.customer.last_name,
//   //     email: customerEmail,
//   //     currency: data.currency,
//   //   };

//   //   // Generate the barcode image URL
//   //   const barcodeImageUrl = await generateBarcode(paymentData);

//   //   if (barcodeImageUrl) {
//   //     // Send the receipt email
//   //     const emailSent = await sendReceiptEmail(
//   //       customerEmail,
//   //       paymentData,
//   //       barcodeImageUrl
//   //     );
//   //     if (emailSent) {
//   //       return res
//   //         .status(200)
//   //         .send("Webhook received and email sent successfully.");
//   //     } else {
//   //       return res
//   //         .status(500)
//   //         .send("Webhook received, but failed to send email.");
//   //     }
//   //   } else {
//   //     return res
//   //       .status(500)
//   //       .send("Webhook received, but failed to generate barcode.");
//   //   }
//   // } else {
//   //   // Acknowledge other events if you're handling them
//   //   console.log("Received webhook event:", event);
//   //   return res.status(200).send("Webhook received.");
//   // }
// });

module.exports = router;
