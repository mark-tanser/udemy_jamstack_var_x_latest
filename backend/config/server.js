module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  cron: { enabled: true },
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '16824c0bbada9bdf8c548d536562410c'),
    },
  },
});
