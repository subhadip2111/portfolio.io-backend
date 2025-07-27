const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { projectService } = require('../services');


const addNewProject = catchAsync(async (req, res) => {
  req.body.user=  req.user._id
    const project = await projectService.createNewProject(req.body);
    return res.status(httpStatus.CREATED).json({ data: project });
})

const getProject = catchAsync(async (req, res) => {
    const project = await projectService.getProjectDetails(req.params.id);
    if (!project) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');

    }
    return res.status(httpStatus.OK).json({ data: project })

})


const getAllProjects = catchAsync(async (req,res) => {
    const { projects, total } = await projectService.getAllProject(req.query)
    return res.status(httpStatus.OK).json({ data: projects, total: total })

})


const updateProject=catchAsync(async(req,res)=>{
    const project=await projectService.updateProjectById(req.params.id,req.body);
    return res.status(httpStatus.OK).json({data:project})   

})


module.exports={
    addNewProject,
    getProject,
    getAllProjects,
    updateProject
}