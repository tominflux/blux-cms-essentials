const { 
    createPage, 
    readPage,
    updatePage,
    deletePage: crudDeletePage
} = require("../../util/page/crud")
const apiErr = require('../../util/apiErr')

const postPage = async (req, res, next) => {
    try {
        const id = req.params[0]
        const serialisedState = req.body
        await createPage(id, serialisedState)
        res.status(201).send()
    } catch (err) {
        apiErr(err)
    }
}

const getPage = async (req, res, next) => {    
    try {
        const id = req.params[0]
        const serialisedState = await readPage(id)
        res.json(serialisedState)
    } catch (err) {
        apiErr(err)
    }
}

const putPage = async (req, res, next) => {
    try {
        const id = req.params[0]
        const serialisedState = req.body
        await updatePage(id, serialisedState)
        res.status(204).send()
    } catch (err) {
        apiErr(err)
    }
}

const deletePage = async (req, res, next) => {
    try {
        const id = req.params[0]
        await crudDeletePage(id)
        res.status(204).send()
    } catch (err) {
        apiErr(err)
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