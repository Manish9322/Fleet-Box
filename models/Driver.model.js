// models/Driver.model.js
import mongoose from "mongoose";

const DriverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address."],
    },
    vehicle: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return /\d{10,15}/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
      required: [true, "User phone number required"],
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "On-leave"],
      required: true,
      default: "Active",
    },
    avatarUrl: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

const DriverModel =
  mongoose.models.Driver || mongoose.model("Driver", DriverSchema);
export default DriverModel; // Export the model, not the schema