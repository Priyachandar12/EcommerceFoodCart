import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "react-router-dom";

const Test = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    amount: "1",
    currency: "INR",
    payee: "7092640515@ybl",
    note: "Payment for Order1234",
    referenceId: "673c1b6fdd5579304235bd24", // Unique reference ID for the order
  });

  const [paymentStatus, setPaymentStatus] = useState("Pending");
  const navigate = useNavigate();

  const generateUPIURL = () => {
    const { payee, amount, note, currency, referenceId } = paymentDetails;
    return `upi://pay?pa=${payee}&pn=Payee Name&am=${amount}&cu=${currency}&tn=${note}&tr=${referenceId}`;
  };

  // Function to poll payment status
  const checkPaymentStatus = async () => {
    try {
      const response = await fetch(`/api/v1/check-payment-status?referenceId=${paymentDetails.referenceId}`);
      const data = await response.json();
      setPaymentStatus(data.status);

      if (data.status === "Success") {
        navigate("/payment-success"); // Navigate to success page
      }
    } catch (error) {
      console.error("Error checking payment status:", error);
    }
  };

  // Poll payment status every 5 seconds
  useEffect(() => {
    if (paymentStatus === "Pending") {
      const interval = setInterval(() => {
        checkPaymentStatus();
      }, 5000);

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [paymentStatus]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>UPI QR Code Payment</h1>
      <p>Status: {paymentStatus}</p>
      <QRCodeCanvas
        value={generateUPIURL()}
        size={200}
        bgColor="#ffffff"
        fgColor="#000000"
        level="H"
      />
    </div>
  );
};

export default Test;
