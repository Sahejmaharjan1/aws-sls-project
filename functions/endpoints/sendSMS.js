const Responses = require('../common/API_Responses')

const AWS = require('aws-sdk');

const SNS = AWS.SNS({
    apiVersion: '2010-03-31'
})

exports.handler = async (event) => {
    console.log('event', event)
    const body = JSON.parse(event.body)
    if (!body || !body.phoneNumber || !body.message) {
        return Responses._400({ message: 'missing phoneNumber or message' })
    }
    const AttributeParams = {
        attributes: {
            DefaultSMSType: 'Promotional'
        }
    };
    const messageParams = {
        Message: body.message,
        PhoneNumber: body.phoneNumber
    }
    try {

        await SNS.setSMSAttributes(AttributeParams).promise()
        await SNS.publish(messageParams).promise()
        return Responses._200({ message: 'text has been sent' })
    }
    catch (e) {
        console.log('error', e)
        return Responses._400({ message: 'text failed to send' })
    }
}