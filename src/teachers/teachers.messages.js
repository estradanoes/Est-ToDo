
module.exports = function($details, $message) {
    return {

        teacherGetError: {
            code: 503,
            key: 'teacherGetError',
            message: $message || 'Error al obtener la información del maestro',
            $details
        },

        teacherSaveError: {
            code: 503,
            key: 'teacherSaveError',
            message: $message || 'Error al guardar la información del maestro',
            $details
        },

        teacherDeleteError: {
            code: 503,
            key: 'teacherDeleteError',
            message: $message || 'Error al borrar la información del maestro',
            $details
        },

        teacherNotFound: {
            code: 404,
            key: 'teacherNotFound',
            message: $message || 'El maestro no fue encontrado',
            $details
        },

        teacherPasswordError: {
            code: 400,
            key: 'teacherPasswordError',
            message: $message || 'Contraseña incorrecta',
            $details
        },
    }
}