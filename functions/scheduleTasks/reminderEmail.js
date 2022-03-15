const Responses = require('../common/API_Responses')

const AWS = require('aws-sdk');


const SES = new AWS.SES()

exports.handler = async () => {
    const message = 'This is an reminder email'
    const params = {
        Destination: {
            ToAddresses: ['sahejmaharjan@gmail.com']
        },
        Message: {
            Subject: {
                Data: 'reminder email'
            },
            Body: {
                Text: { Data: message }
            }
        },
        Source: 'sahejmaharjan@gmail.com'
    }
    try {
        await SES.sendEmail(params).promise()
        return Responses._200({ message: 'email sent' })
    }
    catch (e) {
        console.log('error', e)
        return Responses._400({ message: 'Failed to send reminder email' })
    }
}