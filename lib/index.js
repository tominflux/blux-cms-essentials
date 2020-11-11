const express = require("express")
const { servePageApi } = require("./api/page")

/////////////

const genEssentials = () => {
    console.log("~ Using blux-cms essentials ~")
    
    // Initialise router.
    const essentialsMiddleware = express.Router()

    // Serve APIs
    servePageApi(essentialsMiddleware)

    // Return router
    return essentialsMiddleware
}

/////////////

module.exports = genEssentials