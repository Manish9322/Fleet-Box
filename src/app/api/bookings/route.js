import { NextResponse } from "next/server";
import _db from "../../../../services/db";
import Booking from "../../../../models/Booking.model";
import Driver from "../../../../models/Driver.model";

await _db();

export async function GET() {
  try {
    const bookings = await Booking.find({})
      .populate("customerId", "fullName")
      .populate("driverId", "name")
      .populate("cabId", "model licensePlate")
      .sort({ createdAt: -1 });
    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookings:", error);
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
      !body.customerId ||
      !body.driverId ||
      !body.cabId ||
      !body.pickup ||
      !body.dropoff ||
      !body.fare ||
      !body.status
    ) {
      return NextResponse.json(
        { success: false, message: "Missing input field." },
        { status: 400 }
      );
    }

    const bookingData = {
      customerId: body.customerId,
      driverId: body.driverId,
      cabId: body.cabId,
      pickup: body.pickup,
      dropoff: body.dropoff,
      fare: body.fare,
      status: body.status,
    };

    const newBooking = new Booking(bookingData);
    await newBooking.save();

    return NextResponse.json(
      {
        success: true,
        message: "New Booking Added Successfully.",
        booking: newBooking,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to add new Booking.",
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
        { success: false, message: "Booking ID is required." },
        { status: 400 }
      );
    }

    const booking = await Booking.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Booking not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Booking updated successfully.",
        booking,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update booking.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
