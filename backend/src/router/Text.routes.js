const express = require("express");

const { TextController } = require("../controllers");

const router = express.Router();

<<<<<<< HEAD
router.get("/", TextController.Browse);
=======
router.get("/", TextController.browse);
>>>>>>> dev
router.get("/:id", TextController.read);
router.post("/", TextController.add);
router.put("/:id", TextController.edit);
router.delete("/:id", TextController.delete);

module.exports = router;
