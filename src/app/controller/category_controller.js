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
      let categories = await Category.find()

      res.json({
        categories
      })
    } catch (err) {
      res.status(SERVER_ERROR).json(await serializeErrors([ERROR_GET_DATA]))
    }
  }

  async show (req, res) {
    try {
      let id = req.params.id

      let category = await Category.findById(id)

      res.json({
        category
      })
    } catch (err) {
      res.status(SERVER_ERROR).json(await serializeErrors([ERROR_GET_DATA]))
    }
  }

  async store (req, res) {
    try {
      let data = req.body

      let category = new Category(data)
      let categorySaved = await category.save()
      res.status(CREATED).json(categorySaved)
    } catch (err) {
      res.status(SERVER_ERROR).json(await serializeErrors([ERROR_STORE_DATA]))
    }
  }

  async update (req, res) {
    try {
      let id = req.params.id
      let data = req.body

      let categoryUpdated = await Category.findByIdAndUpdate(id, data, {"new": true})
      res.json(categoryUpdated)
    } catch (err) {
      res.status(SERVER_ERROR).json(await serializeErrors([ERROR_UPDATE_DATA]))
    }
  }

  async destroy (req, res) {
    try {
      let id = req.params.id

      await Category.findByIdAndDelete(id)
      res.json(DELETE_CATEGORY_MSG)
    } catch (err) {
      res.status(SERVER_ERROR).json(await serializeErrors([ERROR_DELETE_DATA]))
    }
  }

}


module.exports = new CategoryController