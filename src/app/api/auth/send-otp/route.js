import nodemailer from "nodemailer";

const otpStore = globalThis.otpStore || (globalThis.otpStore = {});

export async function POST(request) {
  const { email } = await request.json();

  if (!email) {
    return new Response(
      JSON.stringify({ success: false, message: "Email is required." }),
      { status: 400 }
    );
  }

  const generatedOTP = Math.floor(100000 + Math.random() * 900000);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${generatedOTP}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    otpStore[email] = generatedOTP;

    return new Response(
      JSON.stringify({ success: true, message: "OTP sent successfully." }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to send OTP." }),
      { status: 500 }
    );
  }
}
