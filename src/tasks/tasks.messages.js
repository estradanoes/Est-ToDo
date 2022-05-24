module.exports = function($details, $message) {
    return {

        taskSaveError: {
            code: 503,
            key: 'taskSaveError',
            message: $message || 'Error al guardar la información de la tarea',
            $details
        },

        taskGetError: {
            code: 503,
            key: 'taskGetError',
            message: $message || 'Error al obtener la información de la tarea',
            $details
        },

        taskNotFound: {
            code: 404,
            key: 'taskNotFound',
            message: $message || 'El registro de la tarea no fue encontrado',
            $details
        },

        taskDeleteError: {
            code: 503,
            key: 'taskDeleteError',
            message: $message || 'Error al borrar la información de la tarea',
            $details
        },
    }
}