import express from "express";
import dbConnection from "./Config/db.js"
import dotenv from "dotenv";
import cors from "cors";
import router from "./Routes/user.routes.js";
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
dbConnection();
app.get("/", (req, res) => {
    res.send("<h2>Welcome to Todo-API</h2>");
})

app.use("/api/user",router);

app.listen(process.env.PORT, () => {
    console.log(`The server is running on port ${process.env.PORT}`);
})