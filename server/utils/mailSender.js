// const nodemailer = require("nodemailer");

// // Create transporter using Gmail SMTP
// const transporter = nodemailer.createTransport({
//     host: process.env.MAIL_HOST, // smtp.gmail.com
//     port: process.env.MAIL_PORT, // 587
//     secure: false, // false for port 587
//     auth: {
//         user: process.env.MAIL_USER, // your Gmail
//         pass: process.env.MAIL_PASS, // app password
//     },
// });
// transporter.verify((err, success) => {
//     if (err) console.error("❌ SMTP connection failed:", err);
//     else console.log("✅ SMTP connection successful");
// });

// // Mail sender function
// const mailSender = async (email, title, body) => {
//     try {
//         const mailOptions = {
//             from: `"PORTFOLIO BUILDER 🧑‍💻🌐" <${process.env.MAIL_USER}>`,
//             to: email,
//             subject: title,
//             html: body,
//         };

//         await transporter.sendMail(mailOptions);
//         console.log("✅ Email sent to:", email);
//     } catch (error) {
//         console.error("❌ Gmail SMTP Mail Error:", error.message);
//         throw error;
//     }
// };

// module.exports = mailSender;

const nodemailer = require("nodemailer");

// Create transporter using Brevo SMTP
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST, // smtp-relay.brevo.com
    port: process.env.MAIL_PORT, // 587
    secure: false, // false for 587
    auth: {
        user: process.env.MAIL_USER, // Brevo login email
        pass: process.env.MAIL_PASS, // Brevo SMTP password
    },
});

// Verify SMTP connection
transporter.verify((err, success) => {
    if (err) console.error("❌ Brevo SMTP connection failed:", err);
    else console.log("✅ Brevo SMTP connection successful");
});

// Mail sender function
const mailSender = async (email, title, body) => {
    try {
        const mailOptions = {
            from: `"PORTFOLIO BUILDER 🧑‍💻🌐" <${process.env.MAIL_USER}>`,
            to: email,
            subject: title,
            html: body,
        };

        await transporter.sendMail(mailOptions);
        console.log("✅ Email sent to:", email);
    } catch (error) {
        console.error("❌ Brevo SMTP Mail Error:", error.message);
        throw error;
    }
};

module.exports = mailSender;