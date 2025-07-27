const httpStatus = require('http-status');
const { User, Projects } = require('../models');
const ApiError = require('../utils/ApiError');
const createNewProject = async (data) => {
const project=await Projects.create(data);
return project;
}

const getProjectDetails = async (projectId) => {
    const project = await Projects.findById(projectId);
    if (!project) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
    }
    return project
}

const getAllProject = async (query) => {
  const { status, keyword, page = 1, pageSize = 10 } = query;

  const skip = (page - 1) * pageSize;
  const limit = parseInt(pageSize);

  const filter = {};

  // Only add status filter if status is not 'all' and is provided
  if (status && status !== 'all') {
    filter.status = status;
  }

  // Add keyword search to filter
  if (keyword) {
    const regex = new RegExp(keyword, 'i');
    filter.$or = [
      { name: regex },
      { description: regex },
      { techStack: { $in: [regex] } }
    ];
  }

  // Now always use the filter (with or without status)
  const countDocs = await Projects.countDocuments(filter);
  const projects = await Projects.find(filter)
    .skip(skip)
    .limit(limit)
    .populate({ path: 'user', select: 'fullName' })
    .sort({ 'createdAt': -1 });

  return {
    total: countDocs,
    projects,
  };
};

const updateProjectById = async (projectId, updateBody) => {
    const findProject = await getProjectDetails(projectId);
    if (!findProject) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
    }
    Object.assign(findProject, updateBody)

    await findProject.save();
    return findProject;
}
module.exports = {
    createNewProject,
    getProjectDetails,
    getAllProject,
    updateProjectById

}