const router=require("express").Router();

const controller=require("../controllers/projectController");


router.get("/",controller.getProjects);

router.post("/",controller.createProject);

router.put("/:id",controller.updateProject);

router.delete("/:id",controller.deleteProject);


module.exports=router;