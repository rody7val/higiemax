const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sms = require('telesignsdk');

admin.initializeApp(functions.config().firebase);

exports.helloWorld = functions.https.onRequest((req, res) => {
  res.status(200).send('Hello, World!');
});

exports.contact = functions.https.onCall((data, context) => {
  const contact = {
    name: data.name,
    email: data.email,
    message: data.message
  };
  return admin.database().ref('/messages').push(contact)
    .then(() => {
      return { success: true, contact: contact };
    }).catch(e => {
      return { success: false, contact: contact };
    });
});

exports.sms = functions.firestore
  .document('/message/{id}').onCreate((snap, context) => {
    console.log('data', snap.data());
    const contact = snap.data();
    const client = new sms(
      "B94F8D0D-FC53-4A54-8E26-D60CF4B89F7D", //customerId
      "Kb3FlCtANQwGMTb0WoBCirb9SwcJCfBytA4yhKHo1Epwn+LzyzkqRMf/wBcLglEfPm58zq/Kb2XPtkN9EwIStw==", //apiKey
      "https://rest-api.telesign.com", //rest_endpoint
      10*1000 // 10 secs
    );
    client.sms.message(
      (err, res) => { //callback
        if (err) {
          console.log("err", err);
        } else {
          console.log("success", res);
        }
      },
      "542923699363", //number
      `${contact.name}: ${contact.message}. Email: ${contact.email}`, //message
      "ARN", //messageType
    );
    return true;
  });