// var createError = require('http-errors');
var express = require("express");
const bodyParser = require("body-parser");
// var path = require('path');
// var cookieParser = require('cookie-parser');
var logger = require("morgan");

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();
const PORT = process.env.PORT || 7000;
app.use(bodyParser.json());
app.use(logger("dev"));

app.post("/webhook/paystack", async (req, res) => {
  try {
    //  // Verify webhook signature first
    //  if (!verifyPaystackWebhook(req)) {
    //    console.error("Invalid webhook signature");
    //    return res.status(401).json({ error: "Invalid webhook signature" });
    //  }

    const event = req.body.event;
    const data = req.body.data;

    if (event === "charge.success" || event === "transfer.success") {
      console.log("Payment successful:", data);

      const customerEmail = data.customer.email;
      const paymentData = {
        reference: data.reference,
        amount: data.amount,
        paid_at: data.paid_at,
        paymentStatus: data.status,
        firstName: data.customer.first_name,
        lastName: data.customer.last_name,
        email: customerEmail,
        currency: data.currency,
      };

      try {
        // Generate the barcode image URL
        const barcodeImageUrl = await generateBarcode(paymentData);

        if (!barcodeImageUrl) {
          throw new Error("Barcode generation failed");
        }

        // Send the receipt email
        await sendReceiptEmail(customerEmail, paymentData, barcodeImageUrl);

        return res.status(200).json({
          success: true,
          message: "Webhook received and email sent successfully.",
        });
      } catch (processingError) {
        console.error("Processing error:", processingError);

        //  // Attempt to send failure notification
        //  try {
        //    await sendErrorNotification(processingError, paymentData);
        //  } catch (notificationError) {
        //    console.error("Failed to send error notification:", notificationError);
        //  }

        return res.status(500).json({
          success: false,
          message: "Webhook received but processing failed",
          error: processingError.message,
        });
      }
    }

    // Acknowledge other events
    console.log("Received webhook event:", event);
    return res.status(200).json({
      success: true,
      message: "Webhook received (unhandled event type)",
    });
  } catch (error) {
    console.error("Unexpected error in webhook handler:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error processing webhook",
      error: error.message,
    });
  }
});
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
