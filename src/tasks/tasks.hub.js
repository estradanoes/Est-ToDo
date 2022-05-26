const Service = require('./tasks.service')
const Fields = require('./tasks.fields')

module.exports = {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask
}

async function createTask(req, res) {
    try {

        const tasks = new Fields(req)

        const data = {
            teacherId: req.teacherId,
            name: tasks.name.get(),
            duedate: tasks.duedate.get(),
            description: tasks.description.get(),
            category: tasks.category.get(),
            status: tasks.status.get()
        }

        console.log(data)

        res.$data(await Service.createTask(data))

    } catch(error) {
        res.$error(error)
    }
}

async function getTasks(req, res) {
    try {

        const tasks = new Fields(req)

        const query = {
            page: parseInt(req.query.page || 0),
            find: req.query.find
        }

        res.$data(await Service.getTasks(query))

    } catch(error) {
        res.$error(error)
    }
}

async function getTask(req, res) {
    try {

        const tasks = new Fields(req)

        const data = {
            taskId: tasks.taskId.get()
        }

        res.$data(await Service.getTask(data.taskId))

    } catch(error) {
        res.$error(error)
    }
}

async function updateTask(req, res) {
    try {

        const tasks = new Fields(req)

        let data = {
            taskId: tasks.taskId.get()
        }

        const fields = [
            'name',
            'duedate',
            'description',
            'category',
            'status'
        ]

        fields.forEach(field => req.body[field] && (data[field] = req.body[field]))

        res.$data(await Service.updateTask(data.taskId, data))

    } catch(error) {
        res.$error(error)
    }
}

async function deleteTask(req, res) {
    try {

        const tasks = new Fields(req)

        const data = {
            taskId: tasks.taskId.get()
        }

        res.$data(await Service.deleteTask(data.taskId))

    } catch(error) {
        res.$error(error)
    }
}