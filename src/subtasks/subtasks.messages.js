module.exports = function($details, $message) {
    return {

        subtaskSaveError: {
            code: 503,
            key: 'subtaskSaveError',
            message: $message || 'Error al guardar la información de la subtarea',
            $details
        },

        subtaskGetError: {
            code: 503,
            key: 'subtaskGetError',
            message: $message || 'Error al obtener la información de la subtarea',
            $details
        },

        subtaskNotFound: {
            code: 404,
            key: 'subtaskNotFound',
            message: $message || 'El registro de la subtarea no fue encontrado',
            $details
        },

        subtaskDeleteError: {
            code: 503,
            key: 'subtaskDeleteError',
            message: $message || 'Error al borrar la información de la subtarea',
            $details
        },
    }
}