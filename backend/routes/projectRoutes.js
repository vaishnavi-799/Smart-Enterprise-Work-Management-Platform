const router=require("express").Router();

const controller=require("../controllers/projectController");

const {protect}=require("../middleware/authMiddleware");


router.use(protect);


router.get("/",controller.getProjects);

router.post("/",controller.createProject);

router.put("/:id",controller.updateProject);

router.delete("/:id",controller.deleteProject);


module.exports=router;