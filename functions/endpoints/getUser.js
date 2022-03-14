const Responses = require('../common/API_Responses')

exports.handler = async (event) => {
    console.log('event', event)
    if (!event.pathParameters || !event.pathParameters.ID) {
        // failed without an ID
        return Responses._400({
            message: 'missing id'
        })
    }
    let ID = event.pathParameters.ID;
    if (data[ID]) {
        // return the data
        return Responses._400(
            data[ID]
        )
    }

    return Responses._400({
        message: 'no result found'
    })
}

const data = {
    123: { name: 'Sahej Maharjan', age: 23 },
    1234: { name: 'Maharjan Sahej', age: 23 }
}