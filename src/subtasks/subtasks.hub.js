const Service = require('./subtasks.service')
const Fields = require('./subtasks.fields')

module.exports = {
    createSubtask,
    getSubtasks,
    getSubtask,
    updateSubtask,
    deleteSubtask
}

async function createSubtask(req, res) {
    try {

        const subtasks = new Fields(req)

        const data = {
            userId: req.userId,
            taskId: subtasks.taskId.get(),
            name: subtasks.name.get(),
            status: subtasks.status.get(),
        }

        console.log(data)

        res.$data(await Service.createSubtask(data))

    } catch(error) {
        res.$error(error)
    }
}

async function getSubtasks(req, res) {
    try {

        const subtasks = new Fields(req)

        const query = {
            taskId: req.query.taskId,
            page: parseInt(req.query.page || 0),
            find: req.query.find
        }

        res.$data(await Service.getSubtasks(query))

    } catch(error) {
        res.$error(error)
    }
}

async function getSubtask(req, res) {
    try {

        const subtasks = new Fields(req)

        const data = {
            subtaskId: subtasks.subtaskId.get()
        }

        res.$data(await Service.getSubtask(data.subtaskId))

    } catch(error) {
        res.$error(error)
    }
}

async function updateSubtask(req, res) {
    try {

        const subtasks = new Fields(req)

        let data = {
            subtaskId: subtasks.subtaskId.get()
        }

        const fields = [
            'name',
            'status',
        ]

        fields.forEach(field => req.body[field] && (data[field] = req.body[field]))

        res.$data(await Service.updateSubtask(data.subtaskId, data))

    } catch(error) {
        res.$error(error)
    }
}

async function deleteSubtask(req, res) {
    try {

        const subtasks = new Fields(req)

        const data = {
            subtaskId: subtasks.subtaskId.get()
        }

        res.$data(await Service.deleteSubtask(data.subtaskId))

    } catch(error) {
        res.$error(error)
    }
}