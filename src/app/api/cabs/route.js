import { NextResponse } from "next/server";
import _db from "../../../../services/db";
import Cab from "../../../../models/Cab.model";

await _db();

export async function GET() {
  try {
    const cabs = await Cab.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ cabs }, { status: 200 });
  } catch (error) {
    console.error("Error fetching cabs:", error);
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

    if (!body.model || !body.licensePlate || !body.location || !body.status) {
      return NextResponse.json(
        { success: false, message: "Missing input field." },
        { status: 400 }
      );
    }

    const cabData = {
      model: body.model,
      licensePlate: body.licensePlate,
      location: body.location,
      status: body.status,
      imageUrl: body.imageUrl || "https://placehold.co/64x64.png",
    };

    const newCab = new Cab(cabData);
    await newCab.save();

    return NextResponse.json(
      {
        success: true,
        message: "New Cab Added Successfully.",
        cab: newCab,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to add new Cab.",
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
        { success: false, message: "Cab ID is required." },
        { status: 400 }
      );
    }

    const cab = await Cab.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!cab) {
      return NextResponse.json(
        { success: false, message: "Cab not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Cab updated successfully.",
        cab,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update cab.",
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
        { success: false, message: "Cab ID is required." },
        { status: 400 }
      );
    }
    const cab = await Cab.findByIdAndDelete(id);

    if (!cab) {
      return NextResponse.json(
        { success: false, message: "Cab not found." },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "Cab deleted successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete cab.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
