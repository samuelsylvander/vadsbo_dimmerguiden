Vadsbo dimmerGuiden Web App
Built with next.js

To initialize this project and to run for the first time:
    Install next to the project: # npm i next
    Create a file called .env.local
    Set the following environment variables
    - MONGODB_URI
    - EMAIL_HOST
    - EMAIL_USER
    - EMAIL_PASS

To start app:
    From project folder, run 'npm run dev' for development build, or 'npm run build' 'npm run start' to build and run an optimised version.
    Access running app at localhost:3000

________________________________
Things to do and comments from Samuel:
    Project name required
    Bootstrap in a next project: https://medium.com/nextjs/how-to-add-bootstrap-in-next-js-de997371fd9c
    - This will require us to spend some time to rebuild the app so we use bootstrap as it should be used.
    We should use bootstrap toasts for certain info displayed to the user after an action, like copying the project link etc. Please read this documentation: https://getbootstrap.com/docs/5.0/components/toasts/
    We should have a more centralized way of adding new requirements from Vadsbo like "options" for a project, or evan in the future "room types". This is just a note for you to think about.
    Consistancy. It is important to use the same technique thoughout the project. In some places you use form elements like in GetQuoute.jsx and in some you use "Text" as in NewRoom.jsx
    Change the "saved/saveing/loading" button on the summary page to a toast, that shows "Saved" when saved.
    In "Plocklista", the heading "Tillval" should only be visible if any options has been chosen.
    Toggle of options and room details to use bootstrap built in handler instead.

To do:
    Animations on page change/reflow?
    hash of the project id
        --necessary?
    Make all layouts responsive

Done:
    Button to share at the bottom of summary, with copy link
    Room Details in Summary defaults to closed
    Link in navbar automatically copies to clipboard
    Update New Room logic - if app, no switches
    Add images and logos
    Add options in basket
    dynamically save
    Add confirmation when saved
    Add loading notice on new project creation
    Share by Email
    Add "Get Quote" page
    Add "More Options" page
    Component quantity calculation on Summary page
    Access project by url
    Add clickable information icons
    Dynamic flow in "New Room" page
    Flow in More Options
    
Need:
    Email address to send emails from
    Email template
    Assets - Vadsbo, Dali and dimmerGuiden logo
