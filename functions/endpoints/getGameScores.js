const Responses = require('../common/API_Responses')
const Dynamo = require('../common/Dynamo')

const tableName = process.env.tableName

exports.handler = async (event) => {
    console.log('event', event)
    if (!event.pathParameters || !event.pathParameters.game) {
        // failed without an game
        return Responses._400({
            message: 'missing game'
        })
    }
    let game = event.pathParameters.game;
    const gamePlayers = await Dynamo.query({ tableName, index: 'game-index', queryKey: 'game', queryValue: game }).catch(err => {
        console.log('error in Dynamodb query ', err)
        return null
    })
    if (!gamePlayers) {
        return Responses._400({
            message: 'failed to get gamePlayers query'
        })
    }
    return Responses._200(gamePlayers)
}
