// In your app.js or a separate email configuration file
const nodemailer = require("nodemailer");

// Configure your email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  // host: "smtp.gmail.com",
  // port: 465,
  // secure: true,
  auth: {
    user: "princewill.owoh@almlgroup.com",
    pass: "prppnnecmjudnath",
  },
});

// Function to send the email
async function sendReceiptEmail(recipientEmail, paymentData, barcodeImageUrl) {
  const mailOptions = {
    from: "princewill.owoh@almlgroup.com",
    to: recipientEmail,
    subject: "Payment Receipt",
    html: `
      <p>Dear Customer,</p>
      <p>Thank you for your payment!</p>
      <p>Here are your payment details:</p>
      <ul>
        <li>Reference: ${paymentData.reference}</li>
        <li>Amount: ${paymentData.currency} ${paymentData.amount / 100} </li>
        <li>Transaction Date: ${new Date(
          paymentData.paid_at
        ).toLocaleDateString()}</li>
        </ul>
      <p>Attached is a barcode containing your payment information.</p>
      <img src="${barcodeImageUrl}" alt="Payment Barcode">
    `,
    attachments: [
      {
        filename: "payment_barcode.png",
        path: barcodeImageUrl,
        cid: "barcode", // Content-ID for embedding in HTML
      },
    ],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}

module.exports = { sendReceiptEmail };
