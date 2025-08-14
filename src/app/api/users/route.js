import { NextResponse } from "next/server";
import _db from "../../../../services/db";
import User from "../../../../models/User.model";

await _db();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      // Handle GET /api/users/:id
      const user = await User.findById(id);
      if (!user) {
        return NextResponse.json(
          { success: false, message: "User not found." },
          { status: 404 }
        );
      }
      return NextResponse.json(
        {
          success: true,
          user: {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            isAdmin: user.isAdmin,
          },
        },
        { status: 200 }
      );
    } else {
      // Handle GET /api/users
      const users = await User.find({}).sort({ createdAt: -1 });
      return NextResponse.json({ users }, { status: 200 });
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or unreadable request body.",
          error: error.message,
        },
        { status: 400 }
      );
    }

    if (
      !body.fullName ||
      !body.email ||
      !body.gender ||
      !body.phone ||
      !body.password
    ) {
      return NextResponse.json(
        { success: false, message: "Missing input field." },
        { status: 400 }
      );
    }

    const userData = {
      fullName: body.fullName,
      email: body.email,
      gender: body.gender,
      phone: body.phone,
      password: body.password, // Note: In production, hash the password before saving
    };

    const newUser = new User(userData);
    await newUser.save();

    return NextResponse.json(
      {
        success: true,
        message: "New User Added Successfully.",
        user: newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to add new User.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or unreadable request body.",
          error: error.message,
        },
        { status: 400 }
      );
    }

    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "User ID is required." },
        { status: 400 }
      );
    }

    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "User updated successfully.",
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update user.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or unreadable request body.",
          error: error.message,
        },
        { status: 400 }
      );
    }

    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "User ID is required." },
        { status: 400 }
      );
    }
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "User deleted successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete user.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
