export default () => ({
    DATABASE_URL: process.env.DATABASE_URL,
    EMAIL_SERVICE: process.env.EMAIL_SERVICE,
    EMAIL_SERVICE_EMAIL: process.env.EMAIL_SERVICE_EMAIL,
    EMAIL_SERVICE_EMAIL_PASSWORD: process.env.EMAIL_SERVICE_EMAIL_PASSWORD,
    EMAIL_SERVICE_INFO: process.env.EMAIL_SERVICE_INFO,
    SECRET_KEY: process.env.SECRET_KEY,
    SALT: process.env.SALT,
});