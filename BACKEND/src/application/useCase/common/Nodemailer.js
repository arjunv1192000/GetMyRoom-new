import nodemailer from 'nodemailer';
import config from '../../../config/config.js';

const Nodemailer = (fullname, email,message, useremail, propertyname, location,name) => {

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            auth: {
                user: config.EMAIL,
                pass: config.PASSWORD,
            },
        });


        let subject = '';

        let messageBody = '';


       subject = `New Property Inquiry(GetMyRoom): ${propertyname}`;

       messageBody = ` <p>Dear ${name},</p>
       <p>Inquiry regarding the property "${propertyname}" located in ${location}.</p>
       <p>Message details:</p>
       <ul>
         <li>Name: ${fullname}</li>
         <li>Email: ${email}</li>
         <li>Message: ${message}</li>
       </ul>
       <p>We look forward to assisting you with your property needs.</p>
       <p>Best regards,<br/>GetMyRoom</p>`;



        const mailOptions = {
            from:config.EMAIL,
            to:useremail,
            subject:subject,
            html: messageBody,
        };

        //--------- Send the email-----------------\\
        return new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                    reject(error);
                } else {
                    console.log('Email sent:',info.response);
                    resolve(true);
                }
            });
        });
    } catch (error) {

    }
}

export default Nodemailer;
