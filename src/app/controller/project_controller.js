const { Project, Membership } = require('../model')
const { serializeErrors } = require('../validator/single-validation-error')
const MembershipController = require('./membership_controller')
const UserController = require('./user_controller')

const {
  ERROR_GET_DATA, 
  ERROR_STORE_DATA,
  ERROR_MEMBERSHIP_ACTIVE,
  ERROR_UPDATE_DATA
} = require('../../utils/strings')

const {
  SERVER_ERROR, CREATED, BAD_REQUEST
} = require('../../utils/codes')

class ProjectController {

  async index (req, res) {
    try {
      let projects = await Project.find({isEnabled: true}).populate('category', '-__v').select('-__v') // populate('membership category', '-__v')

      return res.json({
        projects
      })
    } catch (err) {
      return res.status(SERVER_ERROR).json(await serializeErrors([ERROR_GET_DATA]))
    }
  }

  async projectByCategory (req, res) {
    try {
      let id = req.params.id
      let projects = await Project.find({category: id, isEnabled: true}).populate('category', '-__v').select('-__v')
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
      let { 
        project, 
        user 
      } = req.body

      let projectModel = new Project(project)

      let projectSaved = await projectModel.save()

      let userProject = {
        projectId: projectSaved._id,
        userId: user._id
      }

      await UserController.storeProjectByUserId(userProject)

      return res.status(CREATED).json(projectSaved)
    } catch (err) {
      console.log(err)
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

      let projectUpdated = await Project.findByIdAndUpdate(project, dataProject, {new: true, runValidators: true})

      return res.json(projectUpdated)
    } catch (err) {
      let error = err || ERROR_UPDATE_DATA
      return res.status(BAD_REQUEST).json(await serializeErrors([error]))
    }
  }

}

module.exports = new ProjectController