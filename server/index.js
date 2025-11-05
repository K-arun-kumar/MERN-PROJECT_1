
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import route from "./routes/userRoute.js";
import routes from "./routes/prdRoute.js";
import Regroute from "./routes/registerRouter.js";
import cors from "cors";
import cartRoutes from "./routes/cartRoutes.js"; // ✅ correct import
import wishlistRoutes from "./routes/wishlistRoutes.js";


const app = express();
 process.env.DOTENV_CONFIG_QUIET = "true";

dotenv.config();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// ✅ Register routes BEFORE DB connection
app.use("/api", route);     // User API
app.use("/prd", routes);    // Product API
app.use("/reg", Regroute);  // Register API
app.use("/cart", cartRoutes);

app.use("/wishlist", wishlistRoutes);



const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

// ✅ DB Connection + Server Listen
mongoose.connect(MONGOURL)
  .then(() => {
    console.log("DB connected successfully.");
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
