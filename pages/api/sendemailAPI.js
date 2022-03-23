import sharehtml from "../../email/shareemail";
import quotehtml from "../../email/quoteemail";

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

        let mail = {};
        if (draft.source === "shareProject") {
            mail = {
                from: "dimmerguiden@vadsbo.net",
                to: draft.email,
                cc: "dimmerguiden@vadsbo.net",
                subject: "Vadsbo Projekt",
                text: `Jag har skapat ett projekt med Vadsbos dimmerGuide, titta på projektet här: ${draft.url}.`,
                html: sharehtml(draft),
            }
        } else if (draft.source === "getQuote") {
            mail = {
                from: "dimmerguiden@vadsbo.net",
                to: "dimmerguiden@vadsbo.net",
                subject: "Vadsbo Projekt Quote Request",
                text: `Jag har skapat ett projekt med Vadsbos dimmerGuide, titta på projektet här: ${draft.url}.`,
                html: quotehtml(draft),
            }
        }
        
        const info = await transporter.sendMail(mail);
           res.status(200).json(info)

    } catch (error) {
        res.status(500).json({error: "unable to send"})
        console.log("sendEmail error: " + error)
    }
    
}