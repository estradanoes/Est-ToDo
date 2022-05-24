
module.exports = function($details, $message) {
    return {

        serverError: {
            code: 503,
            key: 'serverError',
            message: $message || 'Error en el servidor',
            $details
        },

        serverNotFound: {
            code: 404,
            key: 'serverNotFound',
            message: $message || 'Recurso no encontrado',
            $details
        },

        tokenRequiredError: {
            code: 404,
            key: 'tokenRequiredError',
            message: $message || 'Se require el token de acceso',
            $details
        },

        tokenNotFound: {
            code: 404,
            key: 'tokenNotFound',
            message: $message || 'El token no es valido',
            $details
        },

        tokenExpiredError: {
            code: 400,
            key: 'tokenExpiredError',
            message: $message || 'El token ha expirado',
            $details
        },
    }
}