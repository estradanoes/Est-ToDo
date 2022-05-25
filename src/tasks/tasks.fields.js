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

    this.category = validator({
        type: 'string',
        value: props.category,
        name: 'categoria'
    })

    return this
}