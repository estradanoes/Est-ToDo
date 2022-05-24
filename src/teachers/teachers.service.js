const Model = require('./teachers.model')
const Messages = require('./teachers.messages')
const Services = require('../services')
const Encrypt = require('../encrypt')
const Moment = require('moment')
const Methods = require('../methods')

module.exports = {
    loginTeacher,
    createTeacher,
    getTeachers,
    updateTeacher,
    deleteTeacher,
    findTeachersId,
    Model,
    Messages
}

async function loginTeacher(data) {
    try {

        const teacher = await Model.findOne({email: data.email}, '+password')

        if(!teacher)
            throw Messages(data.email).teacherNotFound

        if(!Encrypt.bcryptCompare(data.password, teacher.password))
            throw Messages(data.password).teacherPasswordError

        const sessionData = {
            teacherId: teacher._id,
            token: Encrypt.cryptrString( teacher._id ),
            expired: Moment().add(15, 'days').toDate()
        }

        const session = await Services.Sessions.createSession(sessionData)

        return {
            teacher,
            session
        }

    } catch(error) {
        throw error
    }
}

async function createTeacher(data) {
    try {

        const teacher = new Model(data)

        return teacher.save()

    } catch(error) {
        throw error
    }
}

async function getTeachers(query) {
    try {

        const options = {}
        const page = query.page
        const limit = 3

        if(query.find) {
            const regexp = new RegExp(query.find, 'i')
            options.$or = [
                { name: regexp },
                { phone: regexp },
                { email: regexp },
            ]
        }

        if(query.status)
            options.status = query.status

        const teachers = await Model.find(options)
            .skip(limit * page)
            .limit(limit)
            .sort({created: -1})

        const total = await Model.countDocuments(options)

        return {
            teachers,
            metadata: Methods.metadata(page, limit, total, teachers.length),
            query
        }

    } catch(error) {
        throw error
    }
}

async function getTeacher(teacherId) {
    try {

        const teacher = await Model.findOne({_id: teacherId})

        if(!teacher)
            throw Messages(teacherId).teacherNotFound

        return teacher

    } catch(error) {
        throw error
    }
}

async function updateTeacher(teacherId, data) {
    try {

        const teacher = await getTeacher(teacherId)
        const fields = Object.keys(data)

        fields.forEach(field => teacher[field] = data[field])

        return teacher.save()

    } catch(error) {
        throw error
    }
}

async function deleteTeacher(teacherId) {
    try {

        const teacher = await getTeacher(teacherId)
        await Model.deleteOne({_id: teacherId})

        return teacher

    } catch(error) {
        throw error
    }
}

async function findTeachersId(value) {
    try {

        const regexp = new RegExp(value, 'i')
        const options = {
            $or: [
                {name: regexp}
            ]
        }

        const teachers = await Model.find(options)
            .select({_id: true})

        return teachers.map(teacher => teacher._id)

    } catch(error) {
        throw error
    }
}