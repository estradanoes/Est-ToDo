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
    require('./users/users.router'),
    require('./tasks/tasks.router'),
    require('./subtasks/subtasks.router'),
    require('./sessions/sessions.router'),
    require('./summary/summary.router')
]