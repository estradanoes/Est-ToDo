require('dotenv').config()

module.exports = {
    port: process.env.PORT,
    host: process.env.HOST,
    mongodb: process.env.MONGODB,
    salt: process.env.SALT,
}