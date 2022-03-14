const Responses = {
    _200(data = {}) {
        return {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origins': '*',
            },
            statusCode: 200,
            body: JSON.stringify(data)
        }
    },
    _400(data = {}) {
        return {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origins': '*',
            },
            statusCode: 400,
            body: JSON.stringify(data)
        }
    }
}

module.exports = Responses