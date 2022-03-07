const nodemailer = require('nodemailer')

export default async function sendEmail(req, res) {
    const draft = JSON.parse(req.body)

    try {
        const transporter = nodemailer.createTransport({port: 465,
            host: process.env.EMAIL_HOST,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            secure: true,
        });

        let mail = {
            from: 'dimmerguiden@vadsbo.net',
            to: draft.email,
            subject: `Vadsbo Project Link`,
            text: `I created a project using Vadsbo's dimmerGuiden, take a look here: ${draft.link}.`,
            html: `<div>I created a project using Vadsbo's dimmerGuiden, take a look here: <a href="${draft.link}">${draft.link}</a>.</div>`
        };

        const info = await transporter.sendMail(mail);
           res.status(200).json(info)

    } catch (error) {
        res.status(500).send("error")
        console.log(error)
    }
}