'use strict';

const aws = require('aws-sdk');
const ses = new aws.SES();

function generateResponse(code, payload) {
  return {
    statusCode: code,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'https://ebelleon.de',
      'Access-Control-Allow-Headers': 'x-requested-with',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(payload)
  }
}

function generateError(code, err) {
  console.log(err);
  return {
    statusCode: code,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'https://ebelleon.de',
      'Access-Control-Allow-Headers': 'x-requested-with',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(err.message)
  }
}

function generateEmailParams(body) {
  const {email, name, message} = JSON.parse(body);
  if (!(email && name && message)) {
    throw new Error('Gehen Sie sicher dass Sie folgende Parameter ausgefüllt haben \'email\', \'name\', \'content\'.')
  }

  return {
    Source: 'kontakt@ebelleon.de',
    ReplyToAddresses: [email],
    Destination: {
      ToAddresses: ['kontakt@ebelleon.de']
    },
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: `Name: ${name}\nE-Mail: ${email}\n\n${message}`
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Neue Nachricht von ebelleon.de'
      }
    }
  };
}

module.exports.staticSiteMailer = async (event) => {
  try {
    const emailParams = generateEmailParams(event.body);
    const data = await ses.sendEmail(emailParams).promise();
    return generateResponse(200, data);
  } catch (err) {
    return generateError(500, err);
  }
};
