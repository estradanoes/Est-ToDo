module.exports = function($details, $message) {
    return {

        sessionSaveError: {
            code: 503,
            key: 'sessionSaveError',
            message: $message || 'Error al guardar la información de la sesión',
            $details
        },

        sessionGetError: {
            code: 503,
            key: 'sessionGetError',
            message: $message || 'Error al obtener la sesión',
            $details
        },

        sessionNotFound: {
            code: 503,
            key: 'sessionNotFound',
            message: $message || 'El registro de la sesión no fue encontrado',
            $details
        },

        sessionDeleteError: {
            code: 503,
            key: 'sessionDeleteError',
            message: $message || 'Error al borrar la información de la sesión',
            $details
        },
    }
}