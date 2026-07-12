const express = require("express");
const router = express.Router();

const controller = require("../controllers/taskController");
const {protect} = require("../middleware/authMiddleware");


router.get("/", protect, controller.getTasks);

router.post("/", protect, controller.createTask);

router.get("/:id", protect, controller.getTaskById);

router.put("/:id", protect, controller.updateTask);

router.delete("/:id", protect, controller.deleteTask);

router.post("/:id/comments", protect, controller.addComment);


module.exports = router;