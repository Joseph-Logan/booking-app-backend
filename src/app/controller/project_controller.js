const { Project } = require('../model')
const { serializeErrors } = require('../validator/single-validation-error')

const {
  ERROR_GET_DATA, 
  ERROR_STORE_DATA,
  ERROR_UPDATE_DATA,
  ERROR_DELETE_DATA,
  DELETE_ROLE_MSG
} = require('../../utils/strings')

const {
  SERVER_ERROR, CREATED, OK
} = require('../../utils/codes')

class ProjectController {

  async index (req, res) {
    try {
      let projects = await Project.find().populate('membership category', '-__v').select('-__v')
      return res.json({
        projects
      })
    } catch (err) {
      return res.status(SERVER_ERROR).json(await serializeErrors([ERROR_GET_DATA]))
    }
  }

  async store (req, res) {
    try {
      let data = req.body
      let project = new Project(data)

      let projectSaved = await project.save()

      return res.status(CREATED).json(projectSaved)
    } catch (err) {
      return res.status(SERVER_ERROR).json(await serializeErrors([ERROR_STORE_DATA]))
    }
  }

}

module.exports = new ProjectController