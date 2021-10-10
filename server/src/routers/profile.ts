import express from "express";
import Profile from "../controllers/profile";
import authCheck from "../middlewares/authCheck";

const route = express.Router();
const profile = new Profile();

route.post("/login", profile.login.bind(profile));
route.post("/register", authCheck, profile.register.bind(profile));
route.post("/getProfile", authCheck, profile.getProfile.bind(profile));
route.post("/update", profile.updateProfile.bind(profile));

export default route;