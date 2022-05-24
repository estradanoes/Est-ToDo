const Router = require('express').Router()
const Hub = require('./teachers.hub')

Router.post('/teachers/login', Hub.loginTeacher)

Router.post('/teachers', Hub.createTeacher)

Router.get('/teachers', Hub.getTeachers)

Router.put('/teachers/:teacherId', Hub.updateTeacher)

Router.delete('/teachers/:teacherId', Hub.deleteTeacher)

module.exports = Router