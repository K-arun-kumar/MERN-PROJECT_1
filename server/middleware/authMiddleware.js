import jwt from "jsonwebtoken";
import Register from "../model/registerModel.js";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let user = await Register.findById(decoded.id).select("-password");

    if (!user) {
      
      user = {
        _id: decoded.id,
        email: decoded.email || "admin@gmail.com",
        role: decoded.role || "admin",
      };
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};
