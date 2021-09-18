import express from "express";
import Profile from "../controllers/profile";
import authCheck from "../middlewares/authCheck";
import ProfileMiddleware from "../middlewares/profile";

const route = express.Router();
const profile = new Profile();

route.post("/login", profile.login.bind(profile));

export default route;