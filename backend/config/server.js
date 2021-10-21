module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env("", "https://db4f-2400-2411-4c0-76f0-bc4c-99d0-21bc-4b55.ngrok.io"),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '16824c0bbada9bdf8c548d536562410c'),
    },
  },
});
