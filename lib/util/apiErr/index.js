
const apiErr = (err) => {
    console.error(err)
    res.status(500).json({
        err: err.message
    })
}

module.exports = apiErr