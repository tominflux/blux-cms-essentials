const { 
    createPage, 
    readPage,
    updatePage,
    deletePage
} = require("../../util/page/crud")

const postPage = async (req, res, next) => {
    const id = req.params[0]
    const serialisedState = req.body
    try {
        await createPage(id, serialisedState)
        res.status(201).send()
    } catch (err) {
        res.status(500).json({
            err: err.message
        })
    }
}

const getPage = async (req, res, next) => {    
    const id = req.params[0]
    try {
        const serialisedState = await readPage(id)
        res.json(serialisedState)
    } catch (err) {
        res.status(500).json({
            err: err.message
        })
    }
}

const putPage = async (req, res, next) => {
    const id = req.params[0]
    const serialisedState = req.body
    try {
        await updatePage(id, serialisedState)
        res.status(204).send()
    } catch (err) {
        res.status(500).json({
            err: err.message
        })
    }
}

const deletePage = async (req, res, next) => {
    const id = req.params[0]
    try {
        await deletePage(id)
        res.status(204).send()
    } catch (err) {
        res.status(500).json({
            err: err.message
        })
    }
}

//

const servePageApi = (router) => {
    router.post(/\/api\/page\/(.*)/, postPage)
    router.get(/\/api\/page\/(.*)/, getPage)
    router.put(/\/api\/page\/(.*)/, putPage)
    router.delete(/\/api\/page\/(.*)/, deletePage)
}

module.exports = {
    servePageApi
}