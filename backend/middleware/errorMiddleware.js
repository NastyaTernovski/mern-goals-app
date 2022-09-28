const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500

    res.status(statusCode)

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack //If I'm in development mode, it will show me the entire stack of information, and if I'm in production mode, then it won't show anything
    })
}

module.exports = {
    errorHandler
}