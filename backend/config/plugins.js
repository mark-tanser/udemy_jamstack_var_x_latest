module.exports = ({ env }) => (
    {
        email: {
            provider: "sendgrid",
            providerOptions: {
                apiKey: env("SENDGRID_API_KEY")
            },
            settings: {
                defaultFrom: "tanser.mark@gmail.com",
                defaultTo: "tanser.mark@gmail.com"
            }
        }
    }
);