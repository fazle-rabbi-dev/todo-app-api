const otherErrorHandler = (error, req, res, next) => {
    res.status(500).json({
        message: "Internal server error",
        reason: error.message
    })
}

module.exports = otherErrorHandler