// app/api/admin/signin/route.js
import { NextResponse } from "next/server";
import _db from "../../../../../services/db";
import User from "../../../../../models/User.model";

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
        { success: false, message: "Admin not found." },
        { status: 404 }
      );
    }

    if (!user.isAdmin) {
      return NextResponse.json(
        { success: false, message: "Not authorized as admin." },
        { status: 403 }
      );
    }

    if (user.password !== password) {
      return NextResponse.json(
        { success: false, message: "Invalid password." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Admin sign-in successful.",
        user: { _id: user._id.toString(), fullName: user.fullName, email: user.email },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Admin sign-in error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to sign in as admin.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}