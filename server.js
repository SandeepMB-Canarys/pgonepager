require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());

// CORS Configuration
const corsOptions = {
    origin: "https://stirring-pony-96b5a1.netlify.app", // Your frontend URL
    methods: "GET,POST,OPTIONS",
    allowedHeaders: "Content-Type",
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight

// Create a transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Route to send email
app.post("/send-email", async (req, res) => {
    const { to, subject, message } = req.body;

    try {
        await transporter.sendMail({
            from: `"Sandeep MB" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html: `<p>${message}</p>` 
        });

        res.json({ message: "Email sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Error sending email." });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
