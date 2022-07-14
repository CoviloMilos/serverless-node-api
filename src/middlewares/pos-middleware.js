module.exports.errorHandler = async (err, context) => {
    const error = {
        statusCode: 500,
        body: JSON.stringify(err)
    }

    return error
}