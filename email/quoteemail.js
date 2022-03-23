const quotehtml = (draft) => {
    return (
        `<!DOCTYPE html>
        <html>
        <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>dimmerGuiden Quote Request</title>
        </head>
        <body>
        
        <h2>Customer Quote Request</h2>
        <p>The following customer has requested a quote for their project.</p>
        <p><a href="${draft.url}" target="_blank">Project Link</a></p>
        <h4>Customer Contact Information</h4>
        <p>Name: ${draft.name}</p>
        <p>Email: ${draft.email}</p>
        <p>Phone: ${draft.phone}</p>
        <p>Customer message: ${draft.message}</p>
        </body>
        </html>`
    )
};

export default quotehtml;