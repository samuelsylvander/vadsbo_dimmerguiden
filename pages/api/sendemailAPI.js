const nodemailer = require('nodemailer')

export default async function (req, res) {
    const draft = JSON.parse(req.body)

    try {
        const transporter = nodemailer.createTransport({port: 465,
            host: "smtp.gmail.com",
            auth: {
                user: 'samuelreed01@gmail.com',
                pass: process.env.GMAIL,
            },
            secure: true,
        });

        let mail = {
            from: 'samuelreed01@gmail.com',
            to: draft.email,
            subject: `Message From ${draft.name}`,
            text: `I created a project using Vadsbo's dimmerGuiden, take a look here: ${draft.link}.\n${draft.message}`,
            html: `<div><p>I created a project using Vadsbo's dimmerGuiden, take a look here: <a href="${draft.link}">${draft.link}</a>.</p><p>${draft.message}</p><p>HTML Message</p></div>`
        };

        const info = await transporter.sendMail(mail);
           res.status(200).json(info)

    } catch (error) {
        res.status(500).send("error")
        console.log(error)
    }
}