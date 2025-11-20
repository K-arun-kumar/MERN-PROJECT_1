// import express from "express"


// import { createRegister, deleteRegister, getAllRegister, getRegisterById, loginRegister, updateRegister } from "../controller/registerController.js";

// const route =express.Router();


// route.post("/loginReg",loginRegister);
// route.post("/createReg",createRegister);
// route.get("/getReg",getAllRegister);
// route.get("/getIdReg/:id",getRegisterById);
// route.put("/updateReg/:id",updateRegister);
// route.delete("/deleteReg/:id",deleteRegister);


// export default route;

import express from "express";
import {
  createRegister,
  deleteRegister,
  getAllRegister,
  getRegisterById,
  loginRegister,
  updateRegister
} from "../controller/registerController.js";

import { protect } from "../middleware/authMiddleware.js";

const route = express.Router();

route.post("/loginReg", loginRegister);
route.post("/createReg", createRegister);
route.get("/getReg", getAllRegister); 

route.get("/getIdReg/:id", protect, getRegisterById);
route.put("/updateReg/:id", protect, updateRegister);
route.delete("/deleteReg/:id", protect, deleteRegister);

export default route;
