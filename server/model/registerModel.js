// import mongoose from "mongoose";

// const regSchema=new mongoose.Schema({
//     name:{
//         type:String,
//         required:true
//     },
//      email:{
//         type:String,
//         required:true
//     },
//      password:{
//         type:String,
//         required:true
//     }
// })

// export default mongoose.model("Register",regSchema)

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
    enum: ["user", "admin"],
    default: "user"
  },
  
//   cart: [
//   {
   
// user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
//   quantity: { type: Number, default: 1 }
//   }
//  ]

});

export default mongoose.model("Register", registerSchema);
