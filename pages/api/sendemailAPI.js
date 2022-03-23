const html = (draft) => {
    const output = `<!DOCTYPE html>
        <html>
        <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>Vadsbo dimmerGuiden</title>
        </head>
        <body>

        <h2>${draft.name} delade sitt projekt på dimmerGUiden med dig.</h2>

            <p>${draft.message}}</p>

        <p>Titta gärna på projektet <a href="${draft.url}" target="_blank">här!</a></p>

        </body>
        </html>`;
    return output;
};

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

        let mail = {
            from: "dimmerguiden@vadsbo.net",
            to: draft.email,
            cc: "dimmerguiden@vadsbo.net",
            subject: "Vadsbo Projekt",
            text: `Jag har skapat ett projekt med Vadsbos dimmerGuide, titta på projektet här: ${draft.url}.`,
            html: html(draft),
        }

        const info = await transporter.sendMail(mail);
           res.status(200).json(info)

    } catch (error) {
        res.status(500).json(error)
        console.log("sendEmail error: " + error)
    }
    
}

// async function createEmail(inputs) {
//     const Handlebars = require("handlebars")
//     const fsPromises = require("fs/promises");
//     const path = require("path");

//     // TODO change type of email depending on source
//     if (inputs.source === "getQuote") {
//         const email = await fsPromises.readFile(path.join("email", "quoteemail.handlebars"), "utf8");
//         const template = Handlebars.compile(email);
//         return ({
//             from: "dimmerguiden@vadsbo.net",
//             to: "dimmerguiden@vadsbo.net",
//             subject: "dimmerGuiden Offertbegäran",
//             text: `En kund har begärt en offert för projektet ${inputs.url}.`,
//             html: template(inputs),
//         })
//     } else if (inputs.source === "shareProject") {
//         const email = await fsPromises.readFile(path.join("email", "shareemail.handlebars"), "utf8");
//         const template = Handlebars.compile(email);
//         return ({
//             from: "dimmerguiden@vadsbo.net",
//             to: inputs.email,
//             cc: "dimmerguiden@vadsbo.net",
//             subject: "Vadsbo Projekt",
//             text: `Jag har skapat ett projekt med Vadsbos dimmerGuide, titta på projektet här: ${inputs.url}.`,
//             html: template(inputs),
//         })
//     }
    
// }