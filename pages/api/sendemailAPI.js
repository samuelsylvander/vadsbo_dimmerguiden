
export default async function sendEmail(req, res) {
    const nodemailer = require('nodemailer')
    const draft = JSON.parse(req.body)

    try {
        const transporter = nodemailer.createTransport({
            port: 587,
            host: process.env.EMAIL_HOST,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            secure: false,
        });

        let mail = {
            from: 'dimmerguiden@vadsbo.net',
            to: draft.email,
            subject: `Vadsbo Project Link`,
            text: `I created a project using Vadsbo's dimmerGuiden, take a look here: ${draft.link}.`,
            html: await createEmail(draft),
        };
        const info = await transporter.sendMail(mail);
           res.status(200).json(info)

    } catch (error) {
        res.status(500).send("error")
        console.log(error)
    }
    
}

async function createEmail(inputs) {
    const Handlebars = require('handlebars')
    const fsPromises = require("fs/promises");
    const email = await fsPromises.readFile("./email/testemail.handlebars", 'utf8');
    const template = Handlebars.compile(email);
    return template(inputs)
}