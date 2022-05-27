const Service = require('./users.service')
const Fields = require('./users.fields')

module.exports = {
    loginUser,
    createUser,
    getUsers,
    updateUser,
    deleteUser,
}

async function loginUser(req, res) {
    try {

        const fields = new Fields(req)

        const data = {
            email: fields.email.get(),
            password: fields.password.get(),
        }

        res.$data(await Service.loginUser(data))

    } catch(error) {
        res.$error(error)
    }
}

async function createUser(req, res) {
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

        res.$data(await Service.createUser(data))

    } catch(error) {
        res.$error(error)
    }
}

async function getUsers(req, res) {
    try {

        const query = {
            page: parseInt(req.query.page || 0),
            find: req.query.find,
            status: req.query.status,
        }

        res.$data(await Service.getUsers(query))

    } catch(error) {
        res.$error(error)
    }
}

async function updateUser(req, res) {
    try {

        const data = {
            userId: req.params.userId
        }

        const fields = [
            'firstName',
            'lastName',
            'phone',
            'description',
            'created',
        ]

        fields.forEach(field => req.body[field] && (data[field] = req.body[field]))

        res.$data(await Service.updateUser(data.userId, data))

    } catch(error) {
        res.$error(error)
    }
}

async function deleteUser(req, res) {
    try {

        const data = {
            userId: req.params.userId
        }

        res.$data(await Service.deleteUser(data.userId))

    } catch(error) {
        res.$error(error)
    }
}