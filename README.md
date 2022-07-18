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

### Completed

Added project templates, room templates

Rewrote every component to dynamically present options and products based on project_template.json

Centralized all project data into one component

Add cards, project name modal to landing page

### Still to do

Cosmetic work

Add more test data

Add back button to go back a step

### Changes to project_template.json

-   add `room_templates` to be able to easily generate new rooms

-   rename `"project types"` to `project_templates`, partly to remove the space so we can use dot notation

-   `sensor.options.yes/no` --> does this need to be nested inside rooms? We need to be able to access the options with/without a sensor easily.
    Will there be different sensor requirements for different templates? If not, we can just have one central set of rules regarding sensors.

-   `sensor.options` --> can this be an object instead of array? Then we can address it with `options.yes` instead of `options[1]`

-   add `sensor.selected` flag for projects with/without sensor

-   rename `sensor.optional` to `sensor.required` for consistency

-   `"project types".products` --> could this be renamed to `required_products` to make it clearer? Alternatively, maybe just have a `required: true` flag inside products which are added by template.

-   I don't really know what environmental sensors are, but I added them as a separate type of sensor: `environmental_sensor`

-   added some products, just for testing

### Bugs

## Questions

Addons are just binary yes/no. Do we need to add the ability to set quantities too?

# Deploy Errors
