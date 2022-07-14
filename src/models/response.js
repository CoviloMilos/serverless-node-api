module.exports = (statusCode, message) => {
    return {
        statusCode,
        body: JSON.stringify(message)
    }
}