// import jwt from "jsonwebtoken";
// import Register from "../model/registerModel.js";

// export const adminAuth = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1]; 
//     if (!token) return res.status(401).json({ message: "No token provided" });

//     const decoded = jwt.verify(token, "secretKey");
//     const user = await Register.findById(decoded.id);

//     // if (user.role !== "admin") {
//     //   return res.status(403).json({ message: "Access Denied - Not Admin" });
//     // }

//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Invalid Token" });
//   }
// };
