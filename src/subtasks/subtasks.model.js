const Schema = require('mongoose').Schema
const ObjectId = require('mongoose').Types.ObjectId
const Model = require('mongoose').model
const Messages = require('./subtasks.messages')

const schema = new Schema({

    userId: {
        type: ObjectId
    },

    user: {
        type: ObjectId,
        ref: 'Users'
    },

    taskId: {
        type: ObjectId
    },

    task: {
        type: ObjectId,
        ref: 'Tasks'
    },


    name: {
        type: String
    },

    status: {
        type: Boolean
    },

    created: {
        type: Date,
        default: Date.now
    }

})

schema.pre('save', function(next) {

    this.user = this.userId
    this.task = this.taskId



    next()
})

schema.post('save', function(err, doc, next) {
    if(err) return next(Messages(err).subtaskSaveError)
    next()
})

schema.post('remove', function(err, doc, next) {
    if(err) return next(Messages(err).subtaskDeleteError)
    next()
})

schema.post('findOne', function(err, doc, next) {
    if(err) return next(Messages(err).subtaskGetError)
    next()
})

schema.post('find', function(err, doc, next) {
    if(err) return next(Messages(err).subtaskGetError)
    next()
})

module.exports = Model('Subtasks', schema)