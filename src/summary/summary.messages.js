module.exports = function($details, $message) {
    return {

        summaryGetError: {
            code: 503,
            key: 'summaryGetError',
            message: $message || 'Error al obtener el resumen',
            $details
        },

        userNotFound: {
            code: 404,
            key: 'userNotFound',
            message: $message || 'El usuario no fue encontrado',
            $details
        },
    }
}