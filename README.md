Vadsbo dimmerGuiden Web App
Built with next.js

To start app:
    From project folder, run 'npm run dev' for development build, or 'npm run build' 'npm run start' to build and run an optimised version.
    Access running app at localhost:3000

Things to know:
    I've mostly tried to use utility classes for setting the CSS layout, but there are a few things still set in the "custom_theme.scss" file. Please look there to change the colours for almost all elements. Most margins, paddings, spacings etc have been set with Bootstrap utility classes like m-1, pt-5, etc. So to change those you will have to find the specific elements.

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
