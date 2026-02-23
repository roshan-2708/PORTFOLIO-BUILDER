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

const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const mailSender = async (email, title, body) => {
    try {
        await resend.emails.send({
            from: "Portfolio-Builder.io <onboarding@resend.dev>",
            to: email,
            subject: title,
            html: body,
        });
        await transporter.sendMail(mailOptions);
        console.log("✅ Email sent via Resend to:", email);
    } catch (error) {
        console.error("❌ Resend Email Error:", error);
        throw error;
    }
};

module.exports = mailSender;