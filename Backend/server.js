import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import database_connect from "./database/db.js";
import { fileURLToPath } from "url";
import path from "path";
import UserRoutes from "./Routes/UserRoutes.js";
import FrindsRoutes from "./Routes/FriendRoutes.js";

dotenv.config();

const port = process.env.PORT;

const app = express();

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

//middleware origin websites
app.use(cors());
const corsOption = {
  origin: "",
  optionsSuccessStatus: true,
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//default Routes
app.get("/", (_, res) => {
  res.status(200).json({ message: "default routes ..", status: 200 });
});

//all Routes others
app.use("/api/user", UserRoutes);
app.use("/api/request", FrindsRoutes);

app.listen(port, () => {
  console.log(`server run on http://localhost:${port}`);
});
