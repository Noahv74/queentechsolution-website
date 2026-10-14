/* Queen Tech accounts – settings.
   Until "firebase" is filled in, the free tools stay open to everyone.

   1. firebase: paste the config object from Firebase console →
      Project settings → General → Your apps → Web app → "firebaseConfig".
   2. sheetUrl: paste the Web app URL of the Google Apps Script that saves
      new sign-ups to your Google Sheet (ends with /exec).
   3. requireVerifiedEmail: true = customers must click the link in the
      verification email before the tools open.
*/
window.QT_AUTH = {
  firebase: null,
  sheetUrl: "",
  requireVerifiedEmail: true
};
