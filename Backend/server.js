import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import database_connect from "./database/db.js";
import UserRoutes from "./Routes/UserRoutes.js";

dotenv.config();
await database_connect();
const port = process.env.PORT;

const app = express();

//middleware origin websites
app.use(cors());
const corsOption = {
  origin: "https://facebook-clone-psi-nine.vercel.app/",
  optionsSuccessStatus: true,
};

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//default Routes
app.get("/", (_, res) => {
  res.status(200).json({ message: "default routes ..", status: 200 });
});

//all Routes others
app.use("/api/user", UserRoutes);

app.listen(port, () => {
  console.log(`server is running on - http://localhost:${port}`);
});
