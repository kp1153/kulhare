import Razorpay from "razorpay";
import { NextResponse } from "next/server";

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Order
export async function POST(request) {
  try {
    const {
      amount,
      currency = "INR",
      receipt,
      customer,
    } = await request.json();

    // Validate required fields
    if (!amount || !receipt) {
      return NextResponse.json(
        { error: "Amount and receipt are required" },
        { status: 400 }
      );
    }

    // Create Razorpay order
    const options = {
      amount: amount * 100, // Amount in paise
      currency: currency,
      receipt: receipt,
      payment_capture: 1, // Auto capture
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Payment order creation failed:", error);
    return NextResponse.json(
      { error: "Failed to create payment order" },
      { status: 500 }
    );
  }
}

// Verify Payment
export async function PUT(request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await request.json();

    // Create signature for verification
    const crypto = require("crypto");
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    // Verify signature
    if (generated_signature === razorpay_signature) {
      return NextResponse.json({
        success: true,
        message: "Payment verified successfully",
      });
    } else {
      return NextResponse.json(
        { error: "Payment verification failed" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Payment verification failed:", error);
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 500 }
    );
  }
}

// Get Payment Details
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const paymentId = searchParams.get("paymentId");

    if (!paymentId) {
      return NextResponse.json(
        { error: "Payment ID is required" },
        { status: 400 }
      );
    }

    const payment = await razorpay.payments.fetch(paymentId);

    return NextResponse.json({
      success: true,
      payment: {
        id: payment.id,
        amount: payment.amount / 100, // Convert back to rupees
        currency: payment.currency,
        status: payment.status,
        method: payment.method,
        captured: payment.captured,
        created_at: payment.created_at,
      },
    });
  } catch (error) {
    console.error("Failed to fetch payment details:", error);
    return NextResponse.json(
      { error: "Failed to fetch payment details" },
      { status: 500 }
    );
  }
}
