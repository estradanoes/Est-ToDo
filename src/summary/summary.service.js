const Messages = require('./summary.messages')
const Services = require('../services')
const Methods = require('../methods')
const Model = require('../tasks/tasks.model')


module.exports = {
    getSummary,
    Messages
}

async function getSummary(userId) {
    try {

        const suma = await Model.aggregate([{ $match: { userId: userId } },
                                             { $group: { _id: '$status',
                                                         total: { $sum: 1} }}
                                            ]);
        if(!suma)
            throw Messages(userId).userNotFound

        return{
            suma
        } 
            
   
    } catch(error) {
        throw error
    }
}
