const Router = require('express').Router()

Router.get('/', async(req, res) => {
    res.send({
        success: true,
        data: {
            message: 'Tareas API'
        }
    })
})

module.exports = [
    Router,
    require('./teachers/teachers.router'),
    require('./tasks/tasks.router'),
    require('./sessions/sessions.router'),
]