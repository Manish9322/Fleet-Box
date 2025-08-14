import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
      required: true,
    },
    cabId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cab",
      required: true,
    },
    pickup: {
      type: String,
      required: true,
      trim: true,
    },
    dropoff: {
      type: String,
      required: true,
      trim: true,
    },
    fare: {
      type: String,
      required: true,
      match: [
        /^₹\d+(\.\d{1,2})?$/,
        "Please enter a valid fare amount (e.g., ₹350.00)",
      ],
    },
    status: {
      type: String,
      enum: ["Scheduled", "In Progress", "Completed", "Cancelled"],
      required: true,
      default: "Scheduled",
    },
  },
  { timestamps: true }
);

const BookingModel =
  mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
export default BookingModel;
