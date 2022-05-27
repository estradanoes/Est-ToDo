const validator = require('../validator')

module.exports = function(req) {

    const props = {...req.headers, ...req.params, ...req.query, ...req.body}

    this.firstName = validator({
        type: 'string',
        name: 'nombre',
        value: props.firstName
    })

    this.lastName = validator({
        type: 'string',
        name: 'apellido',
        value: props.lastName
    })

    this.phone = validator({
        type: 'string',
        name: 'teléfono',
        value: props.phone,
        size: 10
    })

    this.email = validator({
        type: 'email',
        name: 'correo',
        value: props.email
    })

    this.password = validator({
        type: 'string',
        name: 'contraseña',
        value: props.password
    })

    this.description = validator({
        type: 'string',
        name: 'descripción',
        value: props.description,
        required: false
    })

    return this
}