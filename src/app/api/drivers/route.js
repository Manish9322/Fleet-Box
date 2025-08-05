import { NextResponse } from "next/server";
import _db from "../../../../services/db";
import Driver from "../../../../models/Driver.model";

await _db;

export async function GET() {
  try {
    const drivers = await Driver.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ drivers }, { status: 200 });
  } catch (error) {
    console.error("Error fetching drivers:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (
      !body.name ||
      !body.email ||
      !body.vehicle ||
      !body.phone ||
      !body.status
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing input field.",
        },
        { status: 400 }
      );
    }

    const driverData = {
      name: body.name,
      email: body.email,
      vehicle: body.vehicle,
      phone: body.phone,
      status: body.status,
      avatarUrl: body.avatarUrl || "",
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
