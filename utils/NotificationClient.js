const nodemailer = require('nodemailer')

const sendEmail = (emailIds, subject, html, text) => {
    const reqEmailsString = emailIds.reduce((acc, email) => acc + (acc ? ", " : "") + (email), "");

    let mailTransporter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : 'crm.notification.service.provider@gmail.com', // Used this email Id
            pass : 'antobdvhmlnstefp'
        }
    });

    let mailDetails = {
        from : 'crm.notification.service.provider@gmail.com',
        to : reqEmailsString,
        subject : subject
    };

    if(html){
        mailDetails.html = html;
    }

    if(text){
        mailDetails.text = text;
    }

    mailTransporter.sendMail(mailDetails, function(err, data){
        if(err){
            console.log('Error Occurred' +err);
        }
        else{
            console.log('Email sent successfully!');
        }
    });
}

module.exports = {
    sendEmail
}