const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());
app.use(cors());

// Create a transporter
const transporter = nodemailer.createTransport({
    service: "gmail", // Use your email provider (Gmail, Outlook, etc.)
    auth: {
        user: "your-email@gmail.com", // Replace with your email
        pass: "your-app-password" // Replace with an app password
    }
});

// Route to send email
app.post("/send-email", async (req, res) => {
    const { to, subject, message } = req.body;

    try {
        await transporter.sendMail({
            from: '"Your Name" <your-email@gmail.com>',
            to,
            subject,
            html: `<p>${message}</p>` // Send HTML email content
        });

        res.json({ message: "Email sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Error sending email." });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
