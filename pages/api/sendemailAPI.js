
export default async function sendEmail(req, res) {
    const nodemailer = require("nodemailer")
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

        let mail = await createEmail(draft)

        const info = await transporter.sendMail(mail);
           res.status(200).json(info)

    } catch (error) {
        res.status(500).json({error: error})
        console.log(error)
    }
    
}

async function createEmail(inputs) {
    const Handlebars = require("handlebars")
    const fsPromises = require("fs/promises");

    // TODO change type of email depending on source
    if (inputs.source === "getQuote") {
        const email = await fsPromises.readFile("./email/quoteemail.handlebars", "utf8");
        const template = Handlebars.compile(email);
        return ({
            from: "dimmerguiden@vadsbo.net",
            to: "dimmerguiden@vadsbo.net",
            subject: "dimmerGuiden Offertbegäran",
            text: `En kund har begärt en offert för projektet ${inputs.url}.`,
            html: template(inputs),
        })
    } else if (inputs.source === "shareProject") {
        const email = await fsPromises.readFile("./email/shareemail.handlebars", "utf8");
        const template = Handlebars.compile(email);
        return ({
            from: "dimmerguiden@vadsbo.net",
            to: inputs.email,
            cc: "dimmerguiden@vadsbo.net",
            subject: "Vadsbo Projekt",
            text: `Jag har skapat ett projekt med Vadsbos dimmerGuide, titta på projektet här: ${inputs.url}.`,
            html: template(inputs),
        })
    }
    
}