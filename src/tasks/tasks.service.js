const Model = require('./tasks.model')
const Messages = require('./tasks.messages')
const Methods = require('../methods')

module.exports = {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask,
    Model,
    Messages
}

async function createTask(data) {
    try {

        const task = new Model(data)

        return await task.save()

    } catch(error) {
        throw error
    }
}

async function getTasks(query) {
    try {

        const options = {}
        const limit = 100
        const page = query.page

        if(query.find) {

            const regexp = new RegExp(query.find, 'i')

            options.$or = [
                {name: regexp},
                {description: regexp},
                {category: regexp},
                {label: regexp}
            ]

            const Users = require('../users/users.service')
            const usersIds = await Users.findUsersId(query.find)

            options.$or.push({
                userId: {
                    $in: usersIds
                }
            })
        }


        console.log(JSON.stringify(options, null, 4))

        const tasks = await Model.find(options)
            .skip(page * limit)
            .limit(limit)
            .sort({created: -1})
            .populate('user')

        const total = await Model.countDocuments(options)

        return {
            tasks,
            metadata: Methods.metadata(page, limit, total, tasks.length),
            query
        }

    } catch(error) {
        throw error
    }
}

async function getTask(taskId) {
    try {

        const task = await Model.findOne({_id: taskId})

        if(!task)
            throw Messages(taskId).taskNotFound

        return task

    } catch(error) {
        throw error
    }
}

async function updateTask(taskId, data) {
    try {

        const task = await getTask(taskId)
        const keys = Object.keys(data)

        keys.forEach(key => {
            task[key] = data[key]
        })

        return await task.save()

    } catch(error) {
        throw error
    }
}

async function deleteTask(taskId) {
    try {

        await Model.deleteOne({_id: taskId})

        return taskId

    } catch(error) {
        throw error
    }
}