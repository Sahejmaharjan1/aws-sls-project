const Responses = require('../common/API_Responses')
const Dynamo = require('../common/Dynamo')

const tableName = process.env.tableName

exports.handler = async (event) => {
    console.log('event', event)
    if (!event.pathParameters || !event.pathParameters.ID) {
        // failed without an ID
        return Responses._400({
            message: 'missing id'
        })
    }
    let ID = event.pathParameters.ID;
    const { score } = JSON.parse(event.body);
    const res = await Dynamo.update(
        {
            TableName: tableName, primaryKey: 'ID', primaryKeyValue: ID, updateKey: 'score', updateValue: score
        }
    ).catch(err => {
        console.log('error in Dynamodb update ', err)
        return null
    })
    if (!res) {
        return Responses._400({
            message: 'failed to update user'
        })
    }
    return Responses._200({ res })
}
