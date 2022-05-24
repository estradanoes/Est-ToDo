const Schema = require('mongoose').Schema
const ObjectId = require('mongoose').Types.ObjectId
const Model = require('mongoose').model
const Messages = require('./sessions.messages')

const schema = new Schema({

    teacherId: {
        type: ObjectId
    },

    teacher: {
        type: ObjectId,
        ref: 'Teachers'
    },

    token: {
        type: String
    },

    navegador: {
        type: String
    },

    typeSO: {
        type: String
    },

    location: {
        lat: String,
        lng: String,
    },

    expired: {
        type: Date
    },

    created: {
        type: Date,
        default: Date.now
    }
})

schema.pre('save', function(next) {
    next()
})

schema.post('save', function(err, doc, next) {
    if(err) return next(Messages(err).SaveError)
    next()
})

schema.post('remove', function(err, doc, next) {
    if(err) return next(Messages(err).DeleteError)
    next()
})

schema.post('findOne', function(err, doc, next) {
    if(err) return next(Messages(err).GetError)
    next()
})

schema.post('find', function(err, doc, next) {
    if(err) return next(Messages(err).GetError)
    next()
})

module.exports = Model('Sessions', schema)