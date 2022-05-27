const Messages = require('./messages')
const Services = require('./services')

module.exports = {
    auth,
    notFound,
    serverError
}

async function auth(req, res, next) {
    try {

        const token = req.headers.token
    
        if(!token)
            res.$error( Messages().tokenRequiredError )
    
        const session = await Services.Sessions.findSession(token)

        if(!session)
            res.$error( Messages().tokenNotFound )

        if(new Date() > session.expired)
            res.$error( Messages().tokenExpiredError )

        req.userId = session.userId
    
        next()

    } catch(error) {
        res.$error(error)
    }
}

async function notFound(req, res) {

    res.$error(Messages().serverNotFound)

}

async function serverError(error, req, res, next) {

    res.$error(Messages().serverError)

}