const validator = require('../validator')

module.exports = function(req) {

    const props = {...req.headers, ...req.params, ...req.query, ...req.body}

    this.subtaskId = validator({
        type: 'objectId',
        value: props.subtaskId,
        name: 'identificador'
    })

    this.taskId = validator({
        type: 'objectId',
        value: props.taskId,
        name: 'identificador'
    })

    this.userId = validator({
        type: 'objectId',
        value: props.userId,
        name: 'identificador del usuario'
    })

    this.name = validator({
        type: 'string',
        value: props.name,
        name: 'nombre de la subtarea'
    })
   
    this.status = validator({
        type: 'boolean',
        value: props.status,
        name: 'estatus',
        default: false,
        required: false
    })

    return this
}