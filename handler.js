'use strict';

const aws = require('aws-sdk');
const ses = new aws.SES();

function sendEmail(formData, callback) {
  const emailParams = {
    Source: 'kontakt@ebelleon.de',
    ReplyToAddresses: [formData.email],
    Destination: {
      ToAddresses: ['kontakt@ebelleon.de']
    },
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: `${formData.message}\n\nName: ${formData.name}\nE-Mail: ${formData.email}`
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Neue Nachricht von ebelleon.de'
      }
    }
  };

  ses.sendEmail(emailParams, callback);
}

module.exports.staticSiteMailer = (event, context, callback) => {
  const formData = JSON.parse(event.body);

  sendEmail(formData, (err, data) => {
    const response = {
      statusCode: err ? 500 : 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://ebelleon.de',
      },
      body: JSON.stringify({
        message: err ? err.message : data
      })
    };

    callback(null, response);
  });
};
