import mongoose from "mongoose";

const CabSchema = new mongoose.Schema(
  {
    model: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    licensePlate: {
      type: String,
      required: true,
      trim: true,
      match: [
        /^[A-Z]{2}[0-9]{2}-[A-Z]{2}-[0-9]{4}$/,
        "Please enter a valid license plate (e.g., MH43-AD-1234).",
      ],
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Available", "Booked", "Maintenance"],
      required: true,
      default: "Available",
    },
    imageUrl: {
      type: String,
      trim: true,
      default: "https://placehold.co/64x64.png",
    },
  },
  { timestamps: true }
);

const CabModel = mongoose.models.Cab || mongoose.model("Cab", CabSchema);
export default CabModel;
