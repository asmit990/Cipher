import { timeStamp } from "console";
import { Router } from "express"



const r: Router = Router();


r.get("/health", (req, res) => {

    res.status(200).json({ status: " ok", timeStamp: new Date().toISOString() });




})




export default r;
