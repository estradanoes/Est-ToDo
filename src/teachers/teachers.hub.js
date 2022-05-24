const Service = require('./teachers.service')
const Fields = require('./teachers.fields')

module.exports = {
    loginTeacher,
    createTeacher,
    getTeachers,
    updateTeacher,
    deleteTeacher,
}

async function loginTeacher(req, res) {
    try {

        const fields = new Fields(req)

        const data = {
            email: fields.email.get(),
            password: fields.password.get(),
        }

        res.$data(await Service.loginTeacher(data))

    } catch(error) {
        res.$error(error)
    }
}

async function createTeacher(req, res) {
    try {

        const fields = new Fields(req)

        const data = {
            firstName: fields.firstName.get(),
            lastName: fields.lastName.get(),
            email: fields.email.get(),
            password: fields.password.get(),
            phone: fields.phone.get(),
            description: fields.description.get(),
        }

        res.$data(await Service.createTeacher(data))

    } catch(error) {
        res.$error(error)
    }
}

async function getTeachers(req, res) {
    try {

        const query = {
            page: parseInt(req.query.page || 0),
            find: req.query.find,
            status: req.query.status,
        }

        res.$data(await Service.getTeachers(query))

    } catch(error) {
        res.$error(error)
    }
}

async function updateTeacher(req, res) {
    try {

        const data = {
            teacherId: req.params.teacherId
        }

        const fields = [
            'firstName',
            'lastName',
            'phone',
            'description',
            'created',
        ]

        fields.forEach(field => req.body[field] && (data[field] = req.body[field]))

        res.$data(await Service.updateTeacher(data.teacherId, data))

    } catch(error) {
        res.$error(error)
    }
}

async function deleteTeacher(req, res) {
    try {

        const data = {
            teacherId: req.params.teacherId
        }

        res.$data(await Service.deleteTeacher(data.teacherId))

    } catch(error) {
        res.$error(error)
    }
}