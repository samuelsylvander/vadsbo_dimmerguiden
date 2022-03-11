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
The ToDo's below are not in priority order.

#### General
- Design: Samuel will do the design of margins etc. so don't spend time on that
- Implement ENV variables
- Setup production ENV variables
- X Rebuild page structure to properly use bootstrap grid
- Pages should be in the pages folder rather than the components folder
- X Make sure bootstrap is used properly: https://medium.com/nextjs/how-to-add-bootstrap-in-next-js-de997371fd9c
- X We should use bootstrap toasts for certain info displayed to the user after an action, not the popup we are using now. For example when copying the project link, when the project is saved (remove the save button). Please read this documentation: https://getbootstrap.com/docs/5.0/components/toasts/
- Code Consistancy. It is important to use the same technique thoughout the project. In some places you use form elements like in GetQuote.jsx and in some you use "Text" as in NewRoom.jsx. We should stick to how we do it in GetQuote.jsx

#### 1. Home.jsx
- X Make Project Name required

#### 2. Sidebar.jsx
- X The heading "Tillval" should only be visible if any options has been chosen.
- X Each "product" should have an info icon. When clicked it should show a bootstrap modal with info. 

#### 3. NewRoom.jsx
- Make sure to use bootstrap toggle instead of switch as we do now.

#### 4. Summary.jsx
- X Display project name on summary page as h1 tag
- X Remove the "saved/saveing/loading" button and instead show a toast when the project is saved, in general, saves should be done automatically when something changes
- X Room details should use bootstrap built in toggle collapsed for handling, show/not show, room details.
- X Decrease and increase of rooms, should be saved instantly onChange.
- X Rooms shold show details as default (remove collapse class) if the number of rooms are 5 or less. If else, they shold be set to collapse
- X If you click the delete room icon, a bootstrap modal should show and and "Are you sure" to confirm before deletaion.

#### 5. SharePopup.jsx
- X This should be a bootstrap modal and be handled as such.
- X The form to share should include the following fields: name, email, message, box for privacy policy. All fields are "required".
- X A link to the following privacy policy should open in a new window if clicked: https://www.vadsbo.net/integritetspolicy/
- A copy of the email should be sent to dimmerguiden@vadsbo.net
- X When sent, a toast should appear telling that the message was sent.

#### 6. GetQuote.jsx
- X This should be a bootstrap modal and be handle as such.
- X A link to the following privacy policy should open in a new window if clicked: https://www.vadsbo.net/integritetspolicy/
- X When sent, a toast should appear telling that the message was sent.