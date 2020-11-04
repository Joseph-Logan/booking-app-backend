const axios = require('axios')

const getAccessToken = async () => {
  let data = {
    grant_type: process.env.GRANT_TYPE,
    client_id: process.env.PAYMENTS_CLIENT_ID,
    client_secret: process.env.PAYMENTS_CLIENT_SECRET
  }
  return axios.post(`${process.env.URL_PAYMENTS}/authentication/token/`, JSON.stringify(data))
}

const simplePurchase = async (accessToken, data) => {
  axios.defaults.headers.common['Authorization'] = `${accessToken.token_type} ${accessToken.access_token}`
  return axios.post(`${process.env.URL_PAYMENTS}/v1/charges/simple/create/`, data)
}

const purchaseProcess = async (cardCredentials) => {
  let accessToken = await getAccessToken()
  return await simplePurchase(accessToken.data, cardCredentials)
}

module.exports = {
  getAccessToken,
  simplePurchase,
  purchaseProcess
}