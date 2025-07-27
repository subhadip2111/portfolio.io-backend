const express = require('express');
const { projectController } = require('../../controllers');
const auth = require('../../middlewares/auth');
const router = express.Router();

router.post('/add',auth(),projectController.addNewProject)
router.get('/all',projectController.getAllProjects)
router.get('/:id',projectController.getProject)
router.patch('/:id',projectController.updateProject)


module.exports=router