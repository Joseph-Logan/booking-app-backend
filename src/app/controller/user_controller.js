const { User, Project } = require('../model')
const { serializeErrors } = require('../validator/single-validation-error')

const {
  ERROR_GET_DATA, 
  ERROR_STORE_DATA,
  ERROR_UPDATE_DATA
} = require('../../utils/strings')

const {
  SERVER_ERROR,
  ACCEPTED
} = require('../../utils/codes')

const {
  checkPassword,
  bcryptPassword
} = require('../../services/password')

class UserController {

  async index (req, res) {
    try {
      let users = await User.find().populate('projects', '-__v').select('-__v')

      return res.json({
        users
      })
    } catch (err) {
      return res.status(SERVER_ERROR).json(await serializeErrors([ERROR_GET_DATA]))
    }
  }

  async getProjectByUserId (req, res) {
    try {
      let projects = []
      let { userId } = req.body

      let users = await User.findById(userId)
      let projectsData = users.projects
     
      for (const item of projectsData) {
        let project = await Project.findById(item).populate('category').select('-__v')
        if (project) projects.push(project)
      }
      return res.json({
        projects 
      })
    } catch (err) {
      return res.status(SERVER_ERROR).json(await serializeErrors([ERROR_GET_DATA]))
    }
  }

  async update (req, res) {
    try {
      let id = req.params.id
      let data = req.body

      let check = await checkPassword(data)
      if (check) {
        data.password = await bcryptPassword(data.password)
      }
      let userUpdated = await User.findByIdAndUpdate(id, data, {new: true, runValidators: true})

      return res.json(userUpdated)
    } catch (err) {
      let error = err.message || ERROR_UPDATE_DATA
      return res.status(SERVER_ERROR).json(await serializeErrors([error]))
    }
  }

  async storeProjectByUserId (data) {
    let { projectId, userId } = data

    let userUpdated = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          projects: projectId
        }
      }, 
      {new: true, runValidators: true}
    )
    return userUpdated
  }
}

module.exports = new UserController
