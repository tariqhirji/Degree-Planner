import nodemailer from 'nodemailer';

export async function sendEmail(to, html){
    // let testAccount = await nodemailer.createTestAccount();
    // console.log('test account', testAccount);

    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: { // generated from test account
            user: 'xiruovfvmnpapmoa@ethereal.email',
            pass: '3mfmXQya6rA5Y8YFEC'
        }
    });

    let info = await transporter.sendMail({
        from: '"Degree Planner" <degree_planner@email.com>',
        to,
        subject: 'Change password',
        html
    });

    console.log('Message sent %s', info.messageId);
    console.log('Preview URL %s', nodemailer.getTestMessageUrl(info));
}