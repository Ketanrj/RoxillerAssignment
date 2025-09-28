import { createTransport } from 'nodemailer'
import { EMAIL_HOST, EMAIL_PASS, EMAIL_PORT, EMAIL_USER } from '../secrets'

type mailOptions = {
    email: string,
    subject: string,
    message: string
}

export const sendEmail = async ({email, subject, message} : mailOptions) => {
    const transporter = createTransport({
        host: EMAIL_HOST,
        port: Number(EMAIL_PORT),
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS
        }
    })

    const mailOptions  = {
        from: '"StoreListings Support" <support@storeListings.com>',
        to: email,
        subject: subject,
        text: message,
    }

    await transporter.sendMail(mailOptions);
}