
module.exports = {
    metadata
}

function metadata(page, limit, total, items) {

    const pages = Math.ceil(total/limit)
    const next = ((page+1) * limit) < total? page+1 : null
    const previous = page > 0? page-1 : null

    return {
        page,
        limit,
        total,
        items,
        pages,
        next,
        previous
    }
}