
const QRCode = require("qrcode");

async function generateBarcode(paymentData) {
  try {
    // Stringify the relevant payment data to encode in the barcode
    const dataToEncode = JSON.stringify({
      reference: paymentData.reference,
      amount: paymentData.amount,
      transactionDate: paymentData.paid_at,
      paymentStatus: paymentData.paymentStatus,
      firstName: paymentData.firstName,
      lastName: paymentData.lastName,
      email: paymentData.email,
      currency: paymentData.currency
    });

    // Generate the QR code as a data URL (base64 encoded image)
    const imageUrl = await QRCode.toDataURL(dataToEncode);
    return imageUrl;
  } catch (error) {
    console.error("Error generating barcode:", error);
    return null;
  }
}

module.exports = { generateBarcode };
