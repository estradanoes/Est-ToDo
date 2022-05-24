const Bcrypt = require('bcrypt')
const Cryptr = require('cryptr')
const Config = require('./config')

module.exports = {
    bcryptHash,
    bcryptCompare,
    cryptrString,
    decryptString,
}

function bcryptHash(value) {
    return Bcrypt.hashSync(value, 7)
}

function bcryptCompare(value, hash) {
    return Bcrypt.compareSync(value, hash)
}

function cryptrString(value) {
    const cryptr = new Cryptr(Config.salt)
    return cryptr.encrypt(value)
}

function decryptString(value) {
    const cryptr = new Cryptr(Config.salt)
    return cryptr.decrypt(value)
}