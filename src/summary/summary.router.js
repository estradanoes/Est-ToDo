const Router = require('express').Router()
const Hub = require('./summary.hub')

Router.get('/summary', Hub.getSummary)

module.exports = Router