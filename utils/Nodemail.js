



// 




const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false, 
    auth: {
        user: process.env.Usermail, 
        pass: process.env.Passmail, 
    },
    logger: true, 
    debug: true, 
});

transporter.verify((error, success) => {
    if (error) {
        console.error('Error connecting to SMTP server:', error);
    } else {  
        console.log('Connected to SMTP server successfully!');
    }
});

const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from:"sahilsahil0901@gmail.com",
        to:to,
        subject: subject,
        text: text,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error occurred:', error.message);
    }
};

module.exports = { sendEmail };
