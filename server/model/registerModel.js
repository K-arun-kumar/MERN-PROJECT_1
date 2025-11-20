

import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["user"],
    default: "user"
  },
  

});

export default mongoose.model("Register", registerSchema);
