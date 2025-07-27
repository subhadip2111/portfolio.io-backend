const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const status = ['pipeline', 'live', 'development', 'ongoing']
const projectSchema = mongoose.Schema(
    {
        name: {
            type: String,
            default: '',
            trim: true,
        },
        description: {
            type: String,
            required: true,
            default: '',
            trim: true,

        },

        status: {
            type: String,
            enum: status,
            default: 'development',
        },
        techStack: {
            type: [String],
            default: [],
        },

        features: {
            type: [String],
            default: [],
        },
        links: {
            type: [
                {
                    type: { type: String, required: true },
                    url: { type: String, required: true },
                }
            ],
            default: [],
        }
        ,
        reasonBehindTheProject: {
            type: String,
            default: ''
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
        ,
        repos: [
            {
                type: { type: String, default: '' },
                url: { type: String, required: true },
                repoName: { type: String, default: '' }
            }
           
        ],
 default:[]
    },
    {
        timestamps: true,
    }
);

projectSchema.plugin(toJSON);
projectSchema.plugin(paginate);



const Projects = mongoose.model('Projects', projectSchema);

module.exports = Projects;
