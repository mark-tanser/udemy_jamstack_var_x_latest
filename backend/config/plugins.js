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
        },
        upload: {
            provider: "aws-s3",
            providerOptions: {
                accessKeyId: env("AWS_ACCESS_KEY_ID"),
                secretAccessKey: env("AWS_ACCESS_SECRET"),
                region: env("AWS_REGION"),
                params: {
                    Bucket: env("AWS_BUCKET_NAME")
                }
            }
        }
    }
);