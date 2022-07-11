# Vadsbo dimmerGuiden Web App

Dimmerguiden is an app built for Vadsbo to make it easier for their clients and partners to prospect the needs of dimmers and related components for controlling lights on a project.

## Installation

1. Make sure you have npm installed.
2. Clone this repository to a local folder.
3. Navigate to the folder and install dependencies:

```bash
npm install
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

You access the app by visiting localhost:3000 in your browser.

## To do

The ToDos below are not in priority order.

#### General

Rework New Room flow
Update NewRoom, MoreOptions to dynamically create options based on project template json

#### Bugs

## Future Ideas

Addons are just binary yes/no. Do we need to add the ability to set quantities too?

# Deploy Errors
