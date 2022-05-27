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

    this.duedate = validator({
        type: 'date',
        value: props.duedate,
        name: 'fecha de termino'
    })

    this.description = validator({
        type: 'string',
        value: props.description,
        name: 'descripcion'
    })

    this.category = validator({
        type: 'string',
        value: props.category,
        name: 'categoria'
    })

    this.label = validator({
        type: 'string',
        value: props.label,
        name: 'etiqueta'
    })

    this.status = validator({
        type: 'boolean',
        value: props.status,
        name: 'estatus',
        default: false,
        required: false
    })

    // required: false
    return this
}