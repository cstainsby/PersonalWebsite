// -----------------------------------------------------------------------------------------------
//    IMPORTS
// -----------------------------------------------------------------------------------------------
const express = require("express");
const path = require("path");
const sass = require('node-sass');
const fs = require('fs');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
// const AWS = require('aws-sdk');
require('dotenv').config();

const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");
const { fromBase64 } = require("@aws-sdk/util-base64-node");
const { fromUtf8 } = require("@aws-sdk/util-utf8-node");


// -----------------------------------------------------------------------------------------------
//    GLOBALS
// -----------------------------------------------------------------------------------------------
const region = 'us-east-2'
const port = 8080;
const runningIP = "127.0.0.1";
const secret_name = "personal_email_password";

const app = express();
console.log("ACCESS KEY " + process.env.AWS_ACCESS_KEY_ID);
// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: "us-east-2"
// })
const secretManagerClient = new SecretsManagerClient();

// -----------------------------------------------------------------------------------------------
//    SCSS CONFIGURATION
// -----------------------------------------------------------------------------------------------
// SCSS compilation
const compileSCSS = () => {
  const result = sass.renderSync({
    file: 'scss/styles.scss',
    outputStyle: 'compressed' // Change to 'expanded' if you prefer unminified CSS
  });

  fs.writeFileSync('styles.css', result.css);
};

// Watch SCSS files for changes and recompile
const watchSCSS = () => {
  fs.watch('scss', { recursive: true }, (eventType, filename) => {
    if (filename.endsWith('.scss')) {
      compileSCSS();
      console.log(`Compiled ${filename}`);
    }
  });
};

// -----------------------------------------------------------------------------------------------
//    MIDDLEWARE
// -----------------------------------------------------------------------------------------------
// Serve static files from the "public" directory
app.use(express.static('.', {
    setHeaders: (res, path, stat) => {
        if (path.endsWith('.js')) {
          res.set('Content-Type', 'application/javascript');
        }
      }
}));
// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// -----------------------------------------------------------------------------------------------
//    HELPER FUNCTIONS
// -----------------------------------------------------------------------------------------------
// function getSSMParameter(parameterName, isEncrypted) {
//   // get an SSM parameter from AWS
//   const params = {
//     Name: parameterName,
//     WithDecryption: isEncrypted // Set this to true if the parameter value is encrypted
//   };
  
//   ssm.getParameter(params, function (err, data) {
//     if (err) {
//       console.error('Error retrieving parameter:', err);
//       return null;
//     } else {
//       const parameterValue = data.Parameter.Value;
//       console.log('Retrieved parameter value:', parameterValue);
//       // Use the parameter value for your application logic
//       return parameterValue;
//     }
//   });
// }

// email endpoint helpers 
async function getAWSSecret(secretName) {
  try {
    const command = new GetSecretValueCommand({ SecretId: secretName });
    const response = await secretManagerClient.send(command);

    if (response.SecretString) {
      return JSON.parse(response.SecretString);
    } else if (response.SecretBinary) {
      const buff = fromBase64(response.SecretBinary);
      return JSON.parse(fromUtf8(buff));
    } else {
      throw new Error("Invalid secret response");
    }
  } catch (err) {
    console.error("Error retrieving secret:", err);
    throw err;
  }
}

function sendFormattedEmail(from_name, from_email, message, sendFromEmail, sendFromEmailPassword) {
  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    // Specify your email provider details here
    service: 'outlook',
    auth: {
      user: sendFromEmail,
      pass: sendFromEmailPassword
    }
  });

  // Define the email options
  const mailOptions = {
    from: sendFromEmail,
    to: sendFromEmail, 
    subject: 'Message from colestainsby.com',
    text: `Name: ${from_name}\nEmail: ${from_email}\n\nMessage: ${message}`
  };

  // Send the email
  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     console.error(error);
  //     res.status(500).send('Error sending email');
  //   } else {
  //     console.log('Email sent: ' + info.response);
  //     res.send('Email sent successfully');
  //   }
  // });
}


// -----------------------------------------------------------------------------------------------
//    ENDPOINTS
// -----------------------------------------------------------------------------------------------
// email endpoint
app.post("/send-email", (req, res) => {
  const { from_name, from_email, message } = req.body;
  const myEmail = "c.p.stainsby@outlook.com";
  const myEmailPassword = getAWSSecret("personal_email_password")
    .then(secret => { return secret.password; })
    .catch(err => { throw err; })

  console.log("current email " + myEmail);
  if (myEmailPassword !== null) {
    console.log("sending email " + myEmailPassword);
    // sendFormattedEmail(from_name, from_email, message, myEmail, myEmailPassword);
  } else {
    console.log("Error getting email password from AWS");
  }
});

app.get("/*", (req, res) => {
    res.sendFile(path.resolve("index.html"))
});


// -----------------------------------------------------------------------------------------------
//    RUN COMMANDS
// -----------------------------------------------------------------------------------------------
app.listen(port, runningIP,
    () => console.log("Server has been started..."))

// Compile SCSS on server start
compileSCSS();

// Watch SCSS for changes in development mode
if (process.env.NODE_ENV === 'development') {
  watchSCSS();
}