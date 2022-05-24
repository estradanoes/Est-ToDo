const Express = require('express')
const Compression = require('compression')
const Morgan = require('morgan')
const Cors = require('cors')

const Router = require('./src/router')
const Config = require('./src/config')
const Database = require('./src/database')
const Responses = require('./src/responses')
const Middlewares = require('./src/middlewares')

const App = Express()

App.use(Cors())
App.use(Compression())
App.use(Express.static('public'))
App.use(Morgan('dev'))
App.use(Express.json())

App.use((req, res, next) => {
    res.$data = data => Responses.$data(data, res)
    res.$html = html => Responses.$html(html, res)
    res.$file = file => Responses.$file(file, res)
    res.$error = error => Responses.$error(error, res)
    res.$redirect = redirect => Responses.$redirect(redirect, res)
    next()
})

App.use(Router)
App.use(Middlewares.notFound)
App.use(Middlewares.serverError)

Database()
    .then(() => {
        App.listen(Config.port, () => {
            console.log(`[APP] ${Config.host}:${Config.port}`)
        })
    })
    .catch(error => {
        console.log(error)
        process.exit(0)
    })