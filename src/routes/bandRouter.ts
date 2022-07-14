import express from "express"; 
import { BandController } from "../controller/BandController";

//import BandController from ..... 

export const bandRouter = express.Router(); 

const bandController = new BandController(); 

bandRouter.post("/signup", bandController.signup)