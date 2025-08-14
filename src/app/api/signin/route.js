import { NextResponse } from "next/server";
import _db from "../../../../services/db";
import User from "../../../../models/User.model";

await _db();

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required." },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }

    // In production, use bcrypt to compare hashed passwords
    if (user.password !== password) {
      return NextResponse.json(
        { success: false, message: "Invalid password." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Sign-in successful.",
        user: { _id: user._id, fullName: user.fullName, email: user.email },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to sign in.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}