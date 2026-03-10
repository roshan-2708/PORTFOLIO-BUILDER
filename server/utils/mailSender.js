const nodemailer = require("nodemailer");

// Create transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST, // smtp.gmail.com
    port: process.env.MAIL_PORT, // 587
    secure: false,
    auth: {
        user: process.env.SMTP_USER, // your Gmail
        pass: process.env.SMTP_PASSWORD, // app password
    },
});
transporter.verify((err, success) => {
    if (err) console.error("❌ SMTP connection failed:", err);
    else console.log("✅ SMTP connection successful");
});
module.exports = transporter;

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

// const { Resend } = require('resend');

// // Resend instance initialize karein
// const resend = new Resend(process.env.RESEND_API_KEY);

// const mailSender = async (email, title, body) => {
//     try {
//         // Resend ka official method use karein
//         const data = await resend.emails.send({
//             from: 'onboarding@resend.dev', // Jab tak domain verify na ho, yahi rahega
//             to: email,
//             subject: title,
//             html: body,
//         });

//         console.log("✅ Email sent successfully via Resend:", data.id);
//         return data;
//     } catch (error) {
//         // Yahan ReferenceError ab nahi aayega kyunki humne 'transporter' hata diya hai
//         console.error("❌ Resend Email Error:", error.message);
//         throw error;
//     }
// };

// module.exports = mailSender;