import jwt from "jsonwebtoken";

const token = jwt.sign(
  {
    id: "676f9e9f9f9f9f9f9f9f9f9f",  // EXACT admin _id
    role: "admin"
  },
  "supersecretjwtkey123",          // your JWT_SECRET
  { expiresIn: "30d" }
);

console.log(token);
