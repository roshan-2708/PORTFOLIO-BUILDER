exports.resetPasswordTemplate = (resetUrl, firstName) => {
    return `
  <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px; border:1px solid #eee; border-radius:8px;">
    
    <h2 style="color:#333;">Password Reset Request</h2>

    <p>Hi <b>${firstName}</b>,</p>

    <p>You recently requested to reset your password.</p>

    <p>Click the button below to set a new password:</p>

    <div style="margin:25px 0;">
        <a href="${resetUrl}" 
           style="
             background:#4CAF50;
             color:white;
             padding:12px 20px;
             text-decoration:none;
             border-radius:6px;
             font-weight:bold;
             display:inline-block;">
           Reset Password
        </a>
    </div>

    <p>This link will expire in <b>15 minutes</b>.</p>

    <p>If the button doesn’t work, copy and paste this link into your browser:</p>

    <p style="word-break:break-all;">${resetUrl}</p>

    <hr style="margin:30px 0"/>

    <p style="color:#777;font-size:14px;">
      If you did not request a password reset, you can safely ignore this email.
    </p>

    <p style="color:#333;">
      Thanks,<br/>
      <b>Portfolio Builder Team</b>
    </p>

  </div>
  `;
};