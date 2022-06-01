const Model = require('./subtasks.model')
const Messages = require('./subtasks.messages')
const Methods = require('../methods')

module.exports = {
    createSubtask,
    getSubtasks,
    getSubtask,
    updateSubtask,
    deleteSubtask,
    Model,
    Messages
}

async function createSubtask(data) {
    try {

        const subtask = new Model(data)

        return await subtask.save()

    } catch(error) {
        throw error
    }
}

async function getSubtasks(query) {
    try {

        const options = {}
        const limit = 100
        const page = query.page

        if(query.find) {

            const regexp = new RegExp(query.find, 'i')

            options.$or = [
                {name: regexp}
            ]

        
        }
        if(query.taskId){
            options.taskId =  query.taskId
        }

        console.log(JSON.stringify(options, null, 4))

        const subtasks = await Model.find(options)
            .skip(page * limit)
            .limit(limit)
            .sort({created: -1})
            .populate('user')

        const total = await Model.countDocuments(options)

        return {
            subtasks,
            metadata: Methods.metadata(page, limit, total, subtasks.length),
            query
        }

    } catch(error) {
        throw error
    }
}

async function getSubtask(subtaskId) {
    try {

        const subtask = await Model.findOne({_id: subtaskId})

        if(!subtask)
            throw Messages(subtaskId).subtaskNotFound

        return subtask

    } catch(error) {
        throw error
    }
}

async function updateSubtask(subtaskId, data) {
    try {

        const subtask = await getSubtask(subtaskId)
        const keys = Object.keys(data)

        keys.forEach(key => {
            subtask[key] = data[key]
        })

        return await subtask.save()

    } catch(error) {
        throw error
    }
}

async function deleteSubtask(subtaskId) {
    try {

        await Model.deleteOne({_id: subtaskId})

        return subtaskId

    } catch(error) {
        throw error
    }
}