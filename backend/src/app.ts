import express from "express";
import userContoroller from "./controllers/userController";
import authController from './controllers/authController';

const app = express();
app.use(express.json());


app.get("/", (req, res) => {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("Hello express¥n");
})

app.use("/users", userContoroller);
app.use('/auth', authController);

export default app;