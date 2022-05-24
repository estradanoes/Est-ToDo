
module.exports = {
    $data,
    $error,
    $file,
    $html,
    $redirect
}

async function $data(data, res) {
    res.status(200).send({
        success: true,
        data
    })
}

async function $error(error, res) {

    if(error.stack)
        console.log(error.stack)
    else
        console.log(error)

    res.status(error.code).send({
        success: false,
        error
    })
}

async function $file(data, res) {
    res.setHeader('Content-Type', data.contentType)
    res.send(data.file)
}

async function $html(data, res) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.send(data)
}

async function $redirect(url, res) {
    res.redirect(url)
}