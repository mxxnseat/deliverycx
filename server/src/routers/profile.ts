import express from "express";
import Profile from "../controllers/profile";
import ProfileMiddleware from "../middlewares/profile";

const route = express.Router();
const profile = new Profile();

const middleware = new ProfileMiddleware();

route.post("/login", profile.login.bind(profile));

export default route;