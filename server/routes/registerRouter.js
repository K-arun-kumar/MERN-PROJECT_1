import express from "express"


import { createRegister, deleteRegister, getAllRegister, getRegisterById, loginRegister, updateRegister } from "../controller/registerController.js";

const route =express.Router();


route.post("/loginReg",loginRegister);
route.post("/createReg",createRegister)
route.get("/getReg",getAllRegister);
route.get("/getIdReg/:id",getRegisterById);
route.put("/updateReg/:id",updateRegister);
route.delete("/deleteReg/:id",deleteRegister);


export default route;