const otpStore = globalThis.otpStore || (globalThis.otpStore = {});

export async function POST(request) {
  const { email, otp } = await request.json();

  if (!email || !otp) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Email and OTP are required.",
      }),
      { status: 400 }
    );
  }

  const storedOtp = otpStore[email];

  if (!storedOtp) {
    return new Response(
      JSON.stringify({ success: false, message: "OTP expired or invalid." }),
      { status: 400 }
    );
  }

  if (parseInt(otp) !== storedOtp) {
    return new Response(
      JSON.stringify({ success: false, message: "Invalid OTP." }),
      { status: 400 }
    );
  }

  delete otpStore[email];

  return new Response(
    JSON.stringify({ success: true, message: "OTP verified successfully." }),
    { status: 200 }
  );
}
