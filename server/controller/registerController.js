
// CREATE (Register user)
import Register from "../model/registerModel.js";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

// LOGIN
// export const loginRegister = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const userExist = await Register.findOne({ email });
//     if (!userExist) {
      
//      res.status(400).json({ message: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(password, userExist.password);
//     if (!isMatch) {
//       res.status(400).json({ message: "Wrong password" });
//     }

//     // generate token
//     const token = jwt.sign({ id: userExist._id }, "secretKey", { expiresIn: "1d" });

//    res.status(200).json({
//   message: "Login Successful",
//   token,
//   user: {
//     _id: userExist._id,
//     name: userExist.name,
//     email: userExist.email,
//     role: userExist.role // ✅ send role
//   }
// });

//   } catch (err) {
//     res.status(500).json({ errorMessage: err.message });
//   }
// };

// LOGIN
// LOGIN
export const loginRegister = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await Register.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, userExist.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    // ✅ generate token with same secret used by middleware
   const token = jwt.sign(
  { id: userExist._id },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);

    return res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        _id: userExist._id,
        name: userExist.name,
        email: userExist.email,
        role: userExist.role,
      },
    });
  } catch (err) {
    res.status(500).json({ errorMessage: err.message });
  }
};

// CREATE REGISTER
export const createRegister = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;


    // Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email already exists
    const existingUser = await Register.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save to DB
   const newUser = await Register.create({
  name,
  email,
  password: hashedPassword,
  role: role || "user"   // ✅ If role not given → default user
});


    res.status(201).json({ 
      message: "User registered successfully!", 
      user: { id: newUser._id, name: newUser.name, email: newUser.email } 
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// READ ALL
export const getAllRegister = async (req, res) => {
  try {
    const regData = await Register.find();
    if (!regData || regData.length === 0) {
      return res.status(404).json({ message: "Register data not found." });
    }
    res.status(200).json(regData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// READ BY ID
export const getRegisterById = async (req, res) => {
  try {
    const id = req.params.id;
    const regExist = await Register.findById(id);
    if (!regExist) {
      return res.status(404).json({ message: "Register not found." });
    }
    res.status(200).json(regExist);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// UPDATE
export const updateRegister = async (req, res) => {
  try {
    const id = req.params.id;
    const regExist = await Register.findById(id);
    if (!regExist) {
      return res.status(404).json({ message: "Register not found." });
    }
    await Register.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: "Register Updated successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// DELETE  ✅ <-- PASTE THIS HERE
export const deleteRegister = async (req, res) => {
  try {
    const id = req.params.id;
    const regExist = await Register.findById(id);
    if (!regExist) {
      return res.status(404).json({ message: "Register not found." });
    }
    await Register.findByIdAndDelete(id);
    res.status(200).json({ message: "Register deleted successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
