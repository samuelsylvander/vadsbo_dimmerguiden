# Vadsbo dimmerGuiden Web App
Dimmerguiden is an app built for Vadsbo to make it easier for their clients and partners to prospect the needs of dimmers and related components for controlling lights on a project.

## Installation
1. Make sure you have npm installed.
2. Clone this repository to a local folder.
3. Navigate to the folder and install next:
```bash
npm i next
```

### Environment variables

Create a file called .env.local
Set the following environment variables
```bash
MONGODB_URI
EMAIL_HOST
EMAIL_USER
EMAIL_PASS
```

### Run the app
Start your terminal and navigate to the project folder then run the following commands (depending on your needs) to start the server:
```bash
npm run dev                         //for development build
npm run build && npm run start      //to build and run an optimised version.
```

You acces the app by visiting localhost:3000 in your browser.

## To do
- Make Project Name required
- Display project name on summary page as <h1>
- Make sure bootstrap is used properly: https://medium.com/nextjs/how-to-add-bootstrap-in-next-js-de997371fd9c
- We should use bootstrap toasts for certain info displayed to the user after an action, not the popup we are using now. For example when copying the project link, when the project is saved (remove the save button). Please read this documentation: https://getbootstrap.com/docs/5.0/components/toasts/
- Code Consistancy. It is important to use the same technique thoughout the project. In some places you use form elements like in GetQuote.jsx and in some you use "Text" as in NewRoom.jsx. We should stick to how we do it in GetQuote.jsx
- Remove the "saved/saveing/loading" button on the summary page and instead show a toast when the project is saved.
- In the sidebar "Plocklista", the heading "Tillval" should only be visible if any options has been chosen.
- Room details on the summery page. We should use bootstrap built in toggle collapsed for handling, show/not show, room details.
- Summary page: Decrease and increase of rooms, should be saved instantly onChange.