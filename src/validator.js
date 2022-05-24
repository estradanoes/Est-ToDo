const Moment = require('moment')
const ObjectId = require('mongoose').Types.ObjectId

function Validator(options) {

    const $this = new Object()

    $this.options = {
        
        name: options.name,
        type: options.type,
        value: options.value,
        prefix: options.prefix,

        min: options.min,
        max: options.max,
        size: options.size,
        enums: options.enums,
        
        required: options.required != undefined? options.required : true,
    }

    $this.get = (options) => {

        $this.options = {...$this.options, ...options}

        const {min, max, size, enums, name, prefix} = $this.options

        if(prefix)
            $this.options.name = `${prefix}.${name}`

        $type()

        if(min   != undefined) $min()
        if(max   != undefined) $max()
        if(size  != undefined) $size()
        if(enums != undefined) $enums()

        return $this.options.value
    }

    function $type() {

        const {value, type, name, required, min, max, size, enums} = $this.options

        const types = [
            'boolean',
            'string',
            'number',
            'integer',
            'float',
            'array',
            'file',
            'date',
            'object',
            'objectId',
            'constant',

            'email',
            'phone',
        ]

        const exists = (value !== null && value !== undefined && value !== '')

        if(types.indexOf(type) === -1)
            throw error(`${name} no es un tipo de dato valido`)

        if(required && !exists)
            throw error(`${name} es un valor requerido`)

        if(required && exists)
            return validtype()[type]()

        if(!required && !exists)
            return valuedefault()
    }

    function $min() {

        const {value, type, min, name} = $this.options

        switch(type) {

            case 'string':
            case 'email':
                
                if(value.length < min) 
                    throw error(`${name} debe contener mínimo ${min} caracteres`)
                break

            case 'number':
            case 'integer':
            case 'float':
                
                if(value < min) 
                    throw error(`${name} debe ser mayor o igual a ${min}`)
                break

            case 'array':
                
                if(value.length < min) 
                    throw error(`${name} debe contener mínimo ${min} items`)
                break

            case 'date':
                
                if(Moment(value) < Moment(min)) 
                    throw error(`${name} ser mayor o igual a la fecha ${ Moment(min).format('dd mmmm yyyy hh:mm a') }`)
                break
        }
    }

    function $max() {

        const {value, type, max, name} = $this.options

        switch(type) {

            case 'string':
            case 'email':

                if(value.length > max)
                    throw error(`${name} debe contener máximo ${max} caracteres`)
                break

            case 'number':
            case 'integer':
            case 'float':

                if(value > max)
                    throw error(`${name} debe ser menor o igual a ${max}`)
                break

            case 'array':

                if(value.length > max)
                    throw error(`${name} debe contener máximo ${max} items`)
                break

            case 'date':

                if(Moment(value) > Moment(max))
                    throw error(`${name} ser menor o igual a la fecha ${ Moment(max).format('dd mmmm yyyy hh:mm a') }`)
                break
        }
    }

    function $size() {

        const {value, name, type, size} = $this.options

        switch(type) {

            case 'string':
            case 'email':

                if(value.length != size)
                    throw error(`${name} debe contener ${size} caracteres`)
                break

            case 'number':
            case 'integer':
            case 'float':

                if(value != size)
                    throw error(`${name} debe ser igual a ${size}`)
                break

            case 'array':

                if(value.length != size)
                    throw error(`${name} debe contener ${size} items`)
                break

            case 'date':

                if(Moment(value) != Moment(size))
                    throw error(`${name} ser igual a la fecha ${ Moment(size).format('dd mmmm yyyy hh:mm a') }`)
                break
        }
    }

    function $enums() {

        const {value, type, name, enums} = $this.options

        if(type === 'file') {

            let valid = false

            enums.forEach(item => {
                if(value.type.includes(item))
                    valid = true
            })

            if(valid) return

            throw error(`${name} el tipo de archivo no es válido`)
        }

        if(enums.indexOf(value) == -1)
            throw error(`${name} no es una opción valida`)
    }

    function valuedefault() {

        const { type, name } = $this.options

        const texts = ['string', 'email', 'password']

        if(texts.indexOf(type) >= 0) {
            $this.options.value = ''
            return $this.options.value
        }

        const numbers = ['number', 'integer', 'float']

        if(numbers.indexOf(type) >= 0) {
            $this.options.value = 0
            return $this.options.value
        }

        const objs = ['file', 'date', 'object', 'objectId']

        if(objs.indexOf(type) >= 0) {
            $this.options.value = null
            return $this.options.value
        }

        if(type === 'array') {
            $this.options.value = []
            return $this.options.value
        }

        if(type === 'boolean') {
            $this.options.value = false
            return $this.options.value
        }

        throw error(`${ name } no es un tipo de dato valido`)
    }

    function validtype() {

        let {value, name} = $this.options

        return {

            boolean: () => {

                const values = [true, 'true', 'si', false, 'false', 'no', 'SI', 'NO']

                if(typeof value === 'string')
                    value = value.toLocaleLowerCase()

                if(values.indexOf(value) == -1)
                    throw error(`${name} no es un tipo de dato valido, se espera boleano`)

                $this.options.value = (value === true || value === 'true' || value === 'si')
                return $this.options.value
            },

            string: () => {
                $this.options.value = `${value || ''}`
                return $this.options.value
            },

            number: () => {

                if(isNaN(value))
                    throw error(`${name} no es un dato válido, se espera un número`)

                $this.options.value = new Number(value)
                return $this.options.value
            },

            integer: () => {

                if(isNaN(value))
                    throw error(`${name} no es un dato válido, se espera un número entero`)

                $this.options.value = parseInt(value)
                return $this.options.value
            },

            float: () => {

                if(isNaN(value))
                    throw error(`${name} no es un dato válido, se espera un número con punto decimal`)

                $this.options.value = parseFloat(value)
                return $this.options.value
            },

            array: () => {

                if(!(value instanceof Array))
                    throw error(`${name} no es un dato válido, se espera un arreglo de elementos`)

                return $this.options.value
            },

            file: () => {

                if(!value.path)
                    throw error(`${name} no es un dato válido, se espera un archivo`)

                return $this.options.value
            },

            date: () => {

                if(!Moment.isDate(new Date(value)))
                    throw error(`${name} no es un dato válido, se espera una fecha`)

                $this.options.value = Moment(value).toDate()
                return $this.options.value
            },

            object: () => {

                if(!value)
                    throw error(`${name} no es un dato válido, no se han envíado los datos`)

                const keys = Object.keys(value)

                if(!keys.length)
                    throw error(`${name} no es un dato válido, no se han envíado los datos`)

                return $this.options.value
            },

            objectId: () => {

                if(!ObjectId.isValid(value) || ObjectId(value) != value)
                    throw error(`${name} no es un dato válido, se espera un ID`)

                $this.options.value = new ObjectId(value)
                return $this.options.value
            },

            email: () => {

                let regexp = /^[a-za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-za-z0-9](?:[a-za-z0-9-]*[a-za-z0-9])?\.)+[a-za-z0-9](?:[a-za-z0-9-]*[a-za-z0-9])?$/

                if(!regexp.test(value))
                    throw error(`${name} no es un dato válido, se espera un correo`)

                return $this.options.value
            },

            phone: () => {

                value = `${value || ''}`.replace(/ /, '').replace('+52', '').replace('+(52)', '').replace('(', '').replace(')', '').replace('+', '')

                const regexp = /^([0-9]{10})$/g

                if(!regexp.test(value))
                    throw error(`${name} no es un dato válido, se espera un número te teléfono a 10 dígitos`)

                return $this.options.value
            },
        }
    }

    function error(message) {
        return {
            code: 400,
            key: 'badparams',
            message,
            $details: $this.options
        }
    }

    return $this
}

module.exports = Validator