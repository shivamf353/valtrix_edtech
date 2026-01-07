module.exports = function generateOtpTemplate(otp) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>OTP Verification</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background: #f0f4f8;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      }

      .container {
        max-width: 600px;
        margin: 40px auto;
        background: #ffffff;
        border-radius: 12px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
        overflow: hidden;
      }

      .header {
        background: linear-gradient(135deg, #4a00e0, #8e2de2);
        color: #ffffff;
        text-align: center;
        padding: 30px 20px;
      }

      .header h1 {
        margin: 0;
        font-size: 24px;
        font-weight: bold;
        letter-spacing: 1px;
      }

      .content {
        padding: 30px 20px;
        text-align: center;
        color: #333;
      }

      .content h2 {
        font-size: 20px;
        margin-bottom: 10px;
        color: #4a00e0;
      }

      .otp-box {
        display: inline-block;
        margin: 20px 0;
        padding: 15px 30px;
        background: #f5f5f5;
        border: 2px dashed #8e2de2;
        border-radius: 8px;
        font-size: 28px;
        font-weight: bold;
        letter-spacing: 4px;
        color: #4a00e0;
      }

      .message {
        font-size: 14px;
        color: #666;
        margin-top: 10px;
      }

      .footer {
        font-size: 12px;
        color: #999;
        padding: 20px;
        text-align: center;
        border-top: 1px solid #eee;
      }

      @media (max-width: 600px) {
        .otp-box {
          font-size: 24px;
          padding: 12px 20px;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Stream by Shivam Gupta</h1>
      </div>
      <div class="content">
        <h2>Your One-Time Password (OTP)</h2>
        <div class="otp-box">${otp}</div>
        <p class="message">This OTP is valid for the next 5 minutes. Please do not share it with anyone.</p>
      </div>
      <div class="footer">
        © 2025 Stream by Shivam Gupta. All rights reserved.
      </div>
    </div>
  </body>
  </html>
  `;
};
