const validator = require('../validator')

module.exports = function(req) {

    const props = {...req.headers, ...req.params, ...req.query, ...req.body}

    this.taskId = validator({
        type: 'objectId',
        value: props.taskId,
        name: 'identificador'
    })

    this.teacherId = validator({
        type: 'objectId',
        value: props.teacherId,
        name: 'identificador del maestro'
    })

    this.name = validator({
        type: 'string',
        value: props.name,
        name: 'nombre de la tarea'
    })

    this.hours = validator({
        type: 'number',
        value: props.hours,
        name: 'horas'
    })

    this.description = validator({
        type: 'string',
        value: props.description,
        name: 'descripción'
    })

    this.language = validator({
        type: 'array',
        value: props.language,
        name: 'lista de lenguajes',
        required: false
    })

    return this
}