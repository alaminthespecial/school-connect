// admin.js
import { initializeApp, credential as _credential, messaging as _messaging } from 'firebase-admin';

// Replace with the path to your downloaded JSON file
import serviceAccount from './schoolconnect-f9aae-firebase-adminsdk-el1db-a7258669b5.json';

initializeApp({
  credential: _credential.cert(serviceAccount),
});
// Example FCM notification sending (remove before deploying)

// Replace with your actual code and logic
// messaging.send({
//   token: adminToken,
//   notification: {
//     title: 'Example notification',
//     body: 'This is a test notification from your server.',
//   },
// })
// .then((response) => {
//   console.log('Notification sent successfully:', response);
// })
// .catch((error) => {
//   console.error('Error sending notification:', error);
// });
// Access the admin token (for demonstration purposes only)s
const messaging = _messaging();
const adminToken = messaging.getToken(YOUR_ADMIN_DEVICE_TOKEN); // Replace with your actual device token
console.log('Admin token:', adminToken);
