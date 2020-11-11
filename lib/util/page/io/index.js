const fs = require('fs-extra')
const path = require('path')
const PATHS = require('../../paths')

const getAbsoluteDirectory = (id) => {
    const relativePath = `${id}.json`
    const relativeDirectory = path.dirname(relativePath)
    const absoluteDirectory = path.join(PATHS.STATE, 'page', relativeDirectory)
    return absoluteDirectory
}

const getAbsolutePath = (id) => {
    const relativePath = `${id}.json`
    const absolutePath = path.join(PATHS.STATE, 'page', relativePath)
    return absolutePath
}

//

const pageDirectoryExists = async (id) => {
    const absoluteDirectory = getAbsoluteDirectory()
    try { 
        await fs.access(absoluteDirectory)
        return true
    } catch (err) {
        return false
    }
}

const pageFileExists = async (id) => {
    const absolutePath = getAbsolutePath(id)
    try {
        await fs.access(absolutePath)
        return true
    } catch (err) {
        return false
     }
}

const writePage = async (id, serialisedState) => {
    const absolutePath = getAbsolutePath(id)
    try {
        const json = JSON.stringify(serialisedState)
        await fs.writeFile(absolutePath, json)
    } catch (err) {
        throw new Error(
            `Could not write serialised page state of '${id}'. \n` + 
            `Details: ${err.message}`
        )
    }
}

const readPage = async (id) => {
    const absolutePath = getAbsolutePath(id)
    try {
        const json = (await fs.readFile(absolutePath)).toString()
        const serialisedState = JSON.parse(json)
        return serialisedState
    } catch (err) {
        throw new Error(
            `Could not read serialised page state of '${id}'. \n` + 
            `Details: ${err.message}`
        )
    }
}

const deletePage = async (id) => {
    const absolutePath = getAbsolutePath(id)
    try {
        await fs.unlink(absolutePath)
    } catch (err) {
        throw new Error(
            `Could not delete page '${id}'. \n` + 
            `Details: ${err.message}`
        )
    }
}

module.exports = {
    pageDirectoryExists,
    pageFileExists,
    writePage,
    readPage,
    deletePage,
}