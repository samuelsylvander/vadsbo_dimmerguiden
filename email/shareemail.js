const sharehtml = (draft) => {
  const output = `<!DOCTYPE html>
      <html>
      <head>
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <title>Vadsbo dimmerGuiden</title>
      </head>
      <body>

      <h2>${draft.name} delade sitt projekt på dimmerGuiden med dig.</h2>

      <p>${draft.message}</p>

      <p>Titta gärna på projektet <a href="${draft.url}" target="_blank">här!</a></p>

      </body>
      </html>`;
  return output;
};

export default sharehtml;