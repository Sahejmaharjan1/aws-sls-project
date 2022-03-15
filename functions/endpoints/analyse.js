const Responses = require('../common/API_Responses')

const AWS = require('aws-sdk');


const Comprehend = new AWS.Comprehend()

exports.handler = async (event) => {
    const body = JSON.parse(event.body)
    if (!body || !body.text) {
        return Responses._400({ message: 'no text field on the body' })
    }

    const text = body.text
    const params = {
        LanguageCode: 'en',
        TextList: [text]
    }
    try {
        const entityResults = await Comprehend.batchDetectEntities(params).promise()
        const entities = entityResults.ResultList[0]

        const sentimentResults = await Comprehend.batchDetectSentiment(params).promise()
        const sentiments = sentimentResults.ResultList[0]

        const responseData = {
            entities,
            sentiments
        }
        return Responses._200(responseData)
    }
    catch (e) {
        console.log('error', e)
        return Responses._400({ message: 'Failed to work with comprehend' })
    }
}