const { Product } = require('../model')
const { serializeErrors } = require('../validator/single-validation-error')

const {
  ERROR_GET_DATA,
  ERROR_STORE_DATA,
  ERROR_UPDATE_DATA,
  ERROR_DELETE_DATA,
  DELETE_PRODUCT_MSG
} = require('../../utils/strings')

const { 
  SERVER_ERROR,
  CREATED,
  ACCEPTED
} = require('../../utils/codes')


class ProductController {

  async index (req, res) {
    try {
      let products = await Product.find().select('-__v')

      return res.json({
        products
      })
    } catch (err) {
      return res.status(SERVER_ERROR).json(await serializeErrors([ERROR_GET_DATA]))
    }
  }

  async show (req, res) {
    try {
      let id = req.params.id
      let product = await Product.findById(id).select('-__v')

      return res.json({
        product
      })
    } catch (err) {
      return res.status(SERVER_ERROR).json(await serializeErrors([ERROR_GET_DATA]))
    }
  } 

  async store (req, res) {
    try {
      let data = req.body
      let product = new Product(data)

      let productSaved = await product.save()
      return res.status(CREATED).json(productSaved)
    } catch (err) {
      return res.status(SERVER_ERROR).json(await serializeErrors([ERROR_STORE_DATA]))
    }
  }

  async update (req, res) {
    try {
      let id = req.params.id, data = req.body

      let productUpdated = await Product.findByIdAndUpdate(id, data, { new: true, runValidators: true })
      return res.status(ACCEPTED).json(productUpdated)
    } catch (err) {
      let error = err.message || ERROR_UPDATE_DATA
      return res.status(SERVER_ERROR).json(await serializeErrors([error]))
    }
  }

  async destroy (req, res) {
    try {
      let id = req.params.id

      await Product.findByIdAndDelete(id)
      return res.json(DELETE_PRODUCT_MSG)
    } catch (err) {
      return res.status(SERVER_ERROR).json(await serializeErrors([ERROR_DELETE_DATA]))
    }
  }

}

module.exports = new ProductController