const express = require("express");
const router = express.Router();
const controller = require("./Controller");

router.get("/papers", controller.getPaper);
router.post("/paper", controller.getonePaper);
router.post("/createpaper", controller.addPaper);
router.post("/updatepaper", controller.updatePaper);
router.post("/deletepaper", controller.deletePaper);

module.exports = router;
