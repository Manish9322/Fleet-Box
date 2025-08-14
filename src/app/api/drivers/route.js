import { NextResponse } from "next/server";
import _db from "../../../../services/db";
import Driver from "../../../../models/Driver.model";
import Cab from "../../../../models/Cab.model"; // <-- Add this line


await _db();

export async function GET() {
  try {
    const drivers = await Driver.find({})
      .populate({
        path: "cabId",
        select: "model licensePlate",
        strictPopulate: false, // Allow population even if cabId is missing in some documents
      })
      .sort({ createdAt: -1 });
    return NextResponse.json({ drivers }, { status: 200 });
  } catch (error) {
    console.error("Error fetching drivers:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.name || !body.email || !body.phone || !body.status) {
      return NextResponse.json(
        { success: false, message: "Missing required input fields." },
        { status: 400 }
      );
    }

    const driverData = {
      name: body.name,
      email: body.email,
      cabId: body.cabId || null, // Allow cabId to be optional
      phone: body.phone,
      status: body.status,
      avatarUrl: body.avatarUrl || "",
      cabId : body.cabId || "",
    };

    const newDriver = new Driver(driverData);
    await newDriver.save();

    return NextResponse.json(
      {
        success: true,
        message: "New Driver Added Successfully.",
        driver: newDriver,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to add new Driver.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Driver ID is required." },
        { status: 400 }
      );
    }

    // Allow cabId to be optional in updates
    if (updateData.cabId === "") {
      updateData.cabId = null;
    }

    const driver = await Driver.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!driver) {
      return NextResponse.json(
        { success: false, message: "Driver not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Driver updated successfully.",
        driver,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update driver.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Driver ID is required." },
        { status: 400 }
      );
    }
    const driver = await Driver.findByIdAndDelete(id);

    if (!driver) {
      return NextResponse.json(
        { success: false, message: "Driver not found." },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "Driver deleted successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete driver.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}