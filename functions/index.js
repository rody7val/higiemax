const functions = require('firebase-functions');
const admin = require('firebase-admin');
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