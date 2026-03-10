const SibApiV3Sdk = require("sib-api-v3-sdk");

const sendEmail = async (toEmail, subject, message) => {

    const client = SibApiV3Sdk.ApiClient.instance;

    const apiKey = client.authentications["api-key"];
    apiKey.apiKey = process.env.SMTP_PASSWORD;

    const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

    const sender = {
        email: process.env.SENDER_EMAIL,
        name: "FolioFlow"
    };

    const receivers = [
        {
            email: toEmail
        }
    ];

    await emailApi.sendTransacEmail({
        sender,
        to: receivers,
        subject: subject,
        textContent: message
    });

};

module.exports = sendEmail;