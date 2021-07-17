import express from "express";

const authRouter = express.Router();

authRouter.get("/", (req, res) => {
    res.send("Hello world!");
});

authRouter.post("/login", (req, res) => {
    res.send("/login POST");
});

authRouter.post("/signup", (req, res) => {
    res.send("/signup POST");
});

export default authRouter;