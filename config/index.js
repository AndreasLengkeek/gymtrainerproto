module.exports = {
  db: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  sendgridKey: process.env.SENDGRID_API_KEY,
  facebookAuth: {
      clientID: process.env.FBCLIENT_ID,
      clientSecret: process.env.FBCLIENT_SECRET,
      callbackUrl: process.env.FBCALLBACK_URL
  }
};
