import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import database_connect from "./database/db.js";
import { fileURLToPath } from "url";
import path from "path";
import UserRoutes from "./Routes/UserRoutes.js";
import FriendsRoutes from "./Routes/FriendRoutes.js";

dotenv.config();

const port = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//middleware origin websites
const corsOption = {
  origin: "*",
  optionsSuccessStatus: true,
};
app.use(cors(corsOption));

let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;

  try {
    const db = await database_connect();
    isConnected = db?.connections?.[0]?.readyState === 1;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("DB connection error:", error);
    throw error;
  }
};

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    return res.status(500).json({ error: "Database connection failed" });
  }
});

//access a static files ssr(server side rendring)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//default Routes
app.get("/", (_, res) => {
  return res
    .status(200)
    .json({ message: "server running successfully ..", status: 200 });
});

//all Routes others
app.use("/api/user", UserRoutes);
app.use("/api/request", FriendsRoutes);

app.listen(port, () => {
  console.log(`server run on http://localhost:${port}`);
});
