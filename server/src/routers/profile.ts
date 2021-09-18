import express from "express";
import Profile from "../controllers/profile";
import authCheck from "../middlewares/authCheck";

const route = express.Router();
const profile = new Profile();

route.post("/login", profile.login.bind(profile));
route.post("/checkSelectedAddress", authCheck, profile.checkSelectedAddress.bind(profile));
route.post("/update", authCheck, profile.updateProfile.bind(profile));

export default route;