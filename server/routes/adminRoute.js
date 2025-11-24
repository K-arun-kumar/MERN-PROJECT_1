import jwt from "jsonwebtoken";

app.get("/generate-admin-token", (req, res) => {
  const adminId = "676f9e9f9f9f9f9f9f9f9f9f";  

  const token = jwt.sign(
    { id: adminId, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

 res.json({
  user: { ...user._doc, role: user.role || "user" },
  token,
});

});
