const validator = require('../validator')

const Fields = function(req) {

    const props = {...req.headers, ...req.params, ...req.query, ...req.body}

    this.sessionId = validator({
        type: 'objectId',
        value: props.sessionId,
        name: 'identificador'
    })

    return this
}

module.exports = Fields