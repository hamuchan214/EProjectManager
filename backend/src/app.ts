import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("Hello express¥n");
})

export default app;