import express from "express"

import { create, deleteUser, getAllUsers, getUserById,login,update } from "../controller/userController.js"

const route =express.Router();

route.post("/createUser",create)
route.post("/loginUser",login);

route.get("/getUser",getAllUsers);
route.get("/getUser/:id",getUserById);
route.put("/updateUser/:id",update);
route.delete("/deleteUser/:id",deleteUser);


export default route;