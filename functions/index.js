const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.sendContactEmail = functions.https.onCall(async (data, context) => {
  await admin
      .firestore()
      .collection('mail')
      .add({
        to: data.to,
        message: {
          subject: 'Contact Form on Harlyy',
          text: 'Message from ' + data.email + '. Message is: ' + data.message,
        },
      });
});
