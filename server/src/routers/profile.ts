import express from "express";
import Profile from "../controllers/profile";
import authCheck from "../middlewares/authCheck";

const route = express.Router();
const profile = new Profile();


route.post("/login", authCheck, profile.login.bind(profile));
route.post("/register", profile.register.bind(profile));
route.post("/getProfile",authCheck, profile.getProfile.bind(profile));
route.post("/update",authCheck, profile.updateProfile.bind(profile));

export default route;