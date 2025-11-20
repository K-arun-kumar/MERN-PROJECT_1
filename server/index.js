import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import route from "./routes/userRoute.js";
import routes from "./routes/prdRoute.js";
import Regroute from "./routes/registerRouter.js";
import cors from "cors";
import cartRoutes from "./routes/cartRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();
//Global middlewares
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes
app.use("/api", route);
app.use("/prd", routes);
app.use("/reg", Regroute);
app.use("/cart", cartRoutes);
app.use("/wishlist", wishlistRoutes);
app.use("/orders", orderRoutes);

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("DB connected successfully.");
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
