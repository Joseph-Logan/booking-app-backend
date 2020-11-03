const { Project, Membership } = require('../model')
const { serializeErrors } = require('../validator/single-validation-error')
const MembershipController = require('./membership_controller')

const {
  ERROR_GET_DATA, 
  ERROR_STORE_DATA,
  ERROR_MEMBERSHIP_ACTIVE
} = require('../../utils/strings')

const {
  SERVER_ERROR, CREATED
} = require('../../utils/codes')

class ProjectController {

  async index (req, res) {
    try {
      let projects = await Project.find().populate('membership category', '-__v').select('-__v')

      projects = projects.filter(item => item.isEnabled)
      return res.json({
        projects
      })
    } catch (err) {
      console.log(err)
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

  async activeProjectAndMembership (req, res) {
    try {
      let {
        project,
        membership
      } = req.body

      let isMembershipActive = await MembershipController.findMembershipActivated(membership)
      if (isMembershipActive) {
        throw ERROR_MEMBERSHIP_ACTIVE
      }

      let dataMembership = {
        isActive: true,
        updatedAt: new Date()
      }

      let dataProject = {
        membership,
        isEnabled: true,
        updatedAt: new Date()
      }

      await Membership.findByIdAndUpdate(membership, dataMembership)

      let projectUpdated = await Project.findByIdAndUpdate(project, dataProject, {new: true})

      return res.json(projectUpdated)
    } catch (err) {
      return res.status(SERVER_ERROR).json(await serializeErrors([err]))
    }
  }

}

module.exports = new ProjectController