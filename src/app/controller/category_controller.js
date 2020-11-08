const { Category } = require('../model')
const { serializeErrors } = require('../validator/single-validation-error')

const {
  ERROR_GET_DATA, 
  ERROR_STORE_DATA,
  ERROR_UPDATE_DATA,
  ERROR_DELETE_DATA,
  DELETE_CATEGORY_MSG
} = require('../../utils/strings')

const {
  SERVER_ERROR, CREATED
} = require('../../utils/codes')
class CategoryController {
  
  async index (req, res) {
    try {
      let categories = await Category.find().select('-__v')

      return res.json({
        categories
      })
    } catch (err) {
      return res.status(SERVER_ERROR).json(await serializeErrors([ERROR_GET_DATA]))
    }
  }

  async show (req, res) {
    try {
      let id = req.params.id

      let category = await Category.findById(id)

      return res.json({
        category
      })
    } catch (err) {
      return res.status(SERVER_ERROR).json(await serializeErrors([ERROR_GET_DATA]))
    }
  }

  async store (req, res) {
    try {
      let data = req.body

      let category = new Category(data)
      let categorySaved = await category.save()
      return res.status(CREATED).json(categorySaved)
    } catch (err) {
      return res.status(SERVER_ERROR).json(await serializeErrors([ERROR_STORE_DATA]))
    }
  }

  async update (req, res) {
    try {
      let id = req.params.id
      let data = req.body

      let categoryUpdated = await Category.findByIdAndUpdate(id, data, {new: true, runValidators: true})
      return res.json(categoryUpdated)
    } catch (err) {
      let error = err.message || ERROR_UPDATE_DATA
      return res.status(SERVER_ERROR).json(await serializeErrors([error]))
    }
  }

  async destroy (req, res) {
    try {
      let id = req.params.id

      await Category.findByIdAndDelete(id)
      return res.json(DELETE_CATEGORY_MSG)
    } catch (err) {
      return res.status(SERVER_ERROR).json(await serializeErrors([ERROR_DELETE_DATA]))
    }
  }

}


module.exports = new CategoryController