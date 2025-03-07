const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Use middleware
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));

const corsOptions = {
  origin: "https://etpim-camera.netlify.app/", // Replace with your frontend URL if needed
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOptions));

// Create transporter using your Gmail credentials
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sornwisetthanyapat@gmail.com", // Replace with your Gmail email
    pass: "lnpm bjdx oklg zsoz", // Replace with your Gmail app-specific password
  },
});

// API route to send email
app.post("/senttext", async (req, res) => {
  const { email, text } = req.body;

  try {
    const info = await transporter.sendMail({
      from: "sornwisetthanyapat@gmail.com", // Replace with your Gmail email
      to: email,
      subject: "ข้อความจากระบบ",
      text: text || "helloworld", // Default text if nothing provided
    });

    res.status(200).send({ message: "Text email sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to send text email" });
  }
});

// Start server
const PORT = 8080;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
