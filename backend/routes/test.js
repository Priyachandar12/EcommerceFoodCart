const express = require("express");
const app = express();

// Dummy database to store payment statuses
const payments = {
  order1234: "Pending",
};

// Webhook to update payment status (called by payment gateway)
app.post("/webhook", (req, res) => {
  const { referenceId, status } = req.body;

  if (payments[referenceId]) {
    payments[referenceId] = status;
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

// API to check payment status
app.get("/api/v1/check-payment-status", (req, res) => {
  const { referenceId } = req.query;

  if (payments[referenceId]) {
    res.json({ status: payments[referenceId] });
  } else {
    res.status(404).json({ status: "Not Found" });
  }
});

app.listen(3000, () => console.log("Server running on port 8000"));
