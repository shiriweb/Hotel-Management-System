import express from "express";
import { registerController } from "../controllers/User.js";
import { loginController } from "../controllers/User.js";
import { isAdmin, requireSignIn } from "../middlewares/Auth.js";
const app = express.Router();

app.post("/register", registerController);
app.post("/login", loginController);

// Protected routes for the user
app.get('/user-auth', requireSignIn, (req,res)=>{
    res.status(200).send({
        ok:true
    })
})

app.get('/is-admin', requireSignIn,isAdmin, (req,res)=>{
    res.status(200).send({
        ok:true
    })
})

export default app;
