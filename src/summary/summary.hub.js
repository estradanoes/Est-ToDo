const Service = require('./summary.service')
const Fields = require('../tasks/tasks.fields')

module.exports = {
    getSummary
}
async function getSummary(req, res) {
    try {
        
        const tasks = new Fields(req)

        const data = {
            userId: tasks.userId.get()
        }

        res.$data(await Service.getSummary(data.userId))

    } catch(error) {
        res.$error(error)
    }
}


