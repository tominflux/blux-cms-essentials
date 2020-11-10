const { servePageApi } = require("./api/page")

/////////////

const genEssentialsMiddleware = () => {
    // Initialise router.
    const essentialsMiddleware = express.Router()

    // Serve APIs
    servePageApi(essentialsMiddleware)

    // Return router
    return essentialsMiddleware
}

/////////////

module.exports = genEssentialsMiddleware