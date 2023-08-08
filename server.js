// -----------------------------------------------------------------------------------------------
//    IMPORTS
// -----------------------------------------------------------------------------------------------
const express = require("express");
const path = require("path");
const sass = require('node-sass');
const fs = require('fs');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
require('dotenv').config();

const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");
const { SESv2Client, SendEmailCommand } = require("@aws-sdk/client-sesv2");
// const { fromBase64 } = require("@aws-sdk/util-base64-node");
// const { fromUtf8 } = require("@aws-sdk/util-utf8-node");


// -----------------------------------------------------------------------------------------------
//    GLOBALS
// -----------------------------------------------------------------------------------------------
const region = 'us-east-2'
const port = 8080;
const runningIP = "127.0.0.1";
const secret_name = "cole_personal";

const app = express();

AWS.config.update({
  region: region
});

const SESClient = new SESv2Client({ 
  region: region 
});
const client = new SecretsManagerClient({
  region: region,
});

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

// var timeout = express.timeout // express v3 and below
// var timeout = require('connect-timeout'); //express v4

// app.use(timeout(120000));
// app.use(haltOnTimedout);


// -----------------------------------------------------------------------------------------------
//    HELPER FUNCTIONS
// -----------------------------------------------------------------------------------------------
async function getEmailPassword() {
  let response;

  try {
    response = await client.send(
      new GetSecretValueCommand({
        SecretId: secret_name,
        VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
      })
    );
  } catch (error) {
    // For a list of exceptions thrown, see
    // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
    throw error;
  }

  const secret = response.SecretString;
  return secret;
} 

async function sendEmail(formattedEmail, sendFromEmail, sendFromEmailPassword) {
  // Create a Nodemailer transporter
  // const transporter = nodemailer.createTransport({
  //   // Specify your email provider details here
  //   service: 'outlook',
  //   port: 587,
  //   auth: {
  //     user: sendFromEmail,
  //     pass: sendFromEmailPassword
  //   }
  // });

  // transporter.verify(function(error, success) {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log('Server is ready to take our messages');

  //     // Send the email
  //     transporter.sendMail(formattedEmail, (error, info) => {
  //       if (error) {
  //         console.error(error);
  //         res.status(500).send('Error sending email');
  //       } else {
  //         console.log('Email sent: ' + info.response);
  //         res.send('Email sent successfully');
  //       }
  //     });
  //   }
  // });

  var params = {
    Destination: {
      ToAddresses: [
        'c.p.stainsby@outlook.com' // my email
      ]
    },
    Message: {
      Body: {
        Text: {
          Charset: "UTF-8",
          Data: message
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'New message from ' + fromName
      }
    },
    Source: fromEmail,
    ReplyToAddresses: [
      fromEmail
    ],
  };
  
  try {
    const command = new SendEmailCommand(params);
    const data = await SESClient.send(command);
    console.log(data.MessageId);
  } catch (err) {
    console.error(err, err.stack);
  }

}

function formatEmail(from_name, from_email, message, sendFromEmail) {
  // Define the email options

  var params = {
    Destination: {
      ToAddresses: [
        'c.p.stainsby@outlook.com' // my email
      ]
    },
    Body: {
      Text: {
        Charset: "UTF-8",
        Data: `New message from Name: ${from_name}\nEmail: ${from_email}\n\nMessage: ${message}`
      }
    },
    Subject: {
      Charset: 'UTF-8',
      Data: 'New message from ' + from_name
    },
    Source: sendFromEmail,
    ReplyToAddresses: [
      sendFromEmail
    ],
  };
  
  return params;
}


// -----------------------------------------------------------------------------------------------
//    ENDPOINTS
// -----------------------------------------------------------------------------------------------
// email endpoint
app.post("/send-email", (req, res) => {
  const { from_name, from_email, message } = req.body;
  const myEmail = "c.p.stainsby@outlook.com";
  getEmailPassword()
    .then(resJson => { 
      const myEmailPassword = JSON.parse(resJson).personal_email_password; 
      
      if (myEmailPassword !== null) {
        const formattedEmail = formatEmail(from_name, from_email, message, myEmail);
        sendEmail(formattedEmail, myEmail, myEmailPassword)
        res.status(200).send("Email Sent");
      } else {
        console.log("Error getting email password from AWS");
        res.status(500).send("Error sending email");
      }
    })
    .catch(err => { throw err; })
});

app.get("/", (req, res) => {
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