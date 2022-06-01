const Router = require('express').Router()
const Hub = require('./subtasks.hub')
const Middlewares = require('../middlewares')

Router.post('/subtasks', Middlewares.auth, Hub.createSubtask)

Router.get('/subtasks', Middlewares.auth, Hub.getSubtasks)

Router.get('/subtasks/:subtaskId', Middlewares.auth, Hub.getSubtask)

Router.put('/subtasks/:subtaskId', Middlewares.auth, Hub.updateSubtask)

Router.delete('/subtasks/:subtaskId', Middlewares.auth, Hub.deleteSubtask)

module.exports = Router