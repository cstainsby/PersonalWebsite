const express = require("express");
const path = require("path");
const sass = require('node-sass');
const fs = require('fs');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 8080;
const runningIP = "127.0.0.1";


// Use this code snippet in your app.
// If you need more information about configurations or implementing the sample code, visit the AWS docs:
// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started.html

import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

const secret_name = "personal_email_password";

const client = new SecretsManagerClient({
  region: "us-east-2",
});



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


// email endpoint helpers 
function getEmailPassword() {
  // get secret from AWS
  client.send(
    new GetSecretValueCommand({
      SecretId: secret_name,
      VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
    })
  ).then(res => {
    const secret = res.SecretString;
    return secret;
  })
  .catch(err => { throw err });
  // For a list of exceptions thrown, see
  // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
  return null;
}

function sendFormattedEmail(from_name, from_email, message) {
  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    // Specify your email provider details here
    service: 'outlook',
    auth: {
      user: 'c.p.stainsby@outlook.com',
      pass: 
    }
  });

  // Define the email options
  const mailOptions = {
    from: 'c.p.stainsby@outlook.com',
    to: 'c.p.stainsby@outlook.com', 
    subject: 'Message from colestainsby.com',
    text: `Name: ${from_name}\nEmail: ${from_email}\n\nMessage: ${message}`
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Email sent successfully');
    }
  });
}

// email endpoint
app.post("/send-email", (req, res) => {
  const { from_name, from_email, message } = req.body;

  let emailPassword = getEmailPassword()
  if (emailPassword) {
    sendFormattedEmail(from_name, from_email, message);
  }
});

app.get("/*", (req, res) => {
    res.sendFile(path.resolve("index.html"))
});


app.listen(port, runningIP,
    () => console.log("Server has been started..."))

// Compile SCSS on server start
compileSCSS();

// Watch SCSS for changes in development mode
if (process.env.NODE_ENV === 'development') {
  watchSCSS();
}