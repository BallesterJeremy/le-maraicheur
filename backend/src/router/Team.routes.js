const express = require("express");

const { TeamController } = require("../controllers");

const router = express.Router();

router.get("/", TeamController.browse);
router.get("/:id", TeamController.read);
router.post("/upload", TeamController.uploadTeam, TeamController.add);
router.put("/:id", TeamController.edit);
router.delete("/:id", TeamController.delete);

module.exports = router;
