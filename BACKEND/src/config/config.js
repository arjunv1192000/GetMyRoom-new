import dotenv from "dotenv"
dotenv.config()

export default {

    port: process.env.PORT,
    mongo: {
        uri: "mongodb+srv://arjun:7sf5KTqwBQtfJGFW@cluster0.pa5obeh.mongodb.net/GetMyRoom"
    },
    ACESS_TOKEN_SCERET: process.env.ACESS_TOKEN_SCERET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    S3_ACESS_KEY: process.env.S3_ACESS_KEY,
    S3_SECRET_KEY: process.env.S3_SECRET_KEY,
    EMAIL: process.env.EMAIL_NODEMAILER,
    PASSWORD: process.env.PASSWORD_NODEMAILER,



}