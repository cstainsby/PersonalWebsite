import type Email from "../templates/Email";

let AWS = require('aws-sdk')

AWS.config.update({region: "us-west-2"})

function sendEmailViaSES(email: Email) {

    
}

export {
    sendEmailViaSES
}