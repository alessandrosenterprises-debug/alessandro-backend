import express from "express";

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/requests", (req, res) => {
  res.json([{ id: 1, customer: "John Doe", request: "Delivery issue" }]);
});

app.get("/messages", (req, res) => {
  res.json([{ id: 1, from: "Jane", message: "Hello Admin!" }]);
});

app.get("/emails", (req, res) => {
  res.json([{ id: 1, subject: "Welcome", body: "Thanks for joining us!" }]);
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
