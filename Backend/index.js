import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./Routes/user.routes";
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("<h2>Welcome to Todo-API</h2>");
})

app.use(router);

app.listen(process.env.PORT, () => {
    console.log(`The server is running on port ${process.env.PORT}`);
})