import express from "express";
import { addReview, create, deletePrd, getAllPrd, getprdById, updatePrd } from "../controller/productController.js";


const route =express.Router();

route.post("/createPrd",create);
route.get("/getPrd",getAllPrd);
route.get("/getId/:id",getprdById);
route.put("/updatePrd/:id",updatePrd);
route.delete("/deletePrd/:id",deletePrd);
route.post("/:productId/review", addReview);
route.get("/getAll", getAllPrd);

export default route;