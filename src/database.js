const Mongoose = require('mongoose')
const Config = require('./config')

module.exports = async function() {
    try {

        await Mongoose.connect(Config.mongodb)

        return console.log(`[DATABASE] ${ Config.mongodb }`)

    } catch(error) {
        console.log(`[DATABASE ERROR] ${ Config.mongodb }`)
        throw error
    }
}