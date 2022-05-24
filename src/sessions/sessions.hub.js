const Service = require('./sessions.service')
const Fields = require('./sessions.fields')

module.exports = {
    getSessions,
    getSession,
    deleteSession
}

async function getSessions(req, res) {
    try {

        const query = {
            page: parseInt(req.query.page || 0),
            find: req.query.find
        }

        res.$data(await Service.getSessions(query))

    } catch(error) {
        res.$error(error)
    }
}

async function getSession(req, res) {
    try {

        const sessions = new Fields(req)

        const data = {
            sessionId: sessions.sessionId.get()
        }

        res.$data(await Service.getSession(data.sessionId))

    } catch(error) {
        res.$error(error)
    }
}

async function deleteSession(req, res) {
    try {

        const sessions = new Fields(req)

        const data = {
            sessionId: sessions.sessionId.get()
        }

        res.$data(await Service.deleteSession(data.sessionId))

    } catch(error) {
        res.$error(error)
    }
}