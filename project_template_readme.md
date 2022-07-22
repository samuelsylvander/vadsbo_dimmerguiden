# Project Template JSON Readme

All templates, options, and products used in the dimmerGuiden app are pulled dynamically from the project_template.json file.

The file is a json with the following properties:

## project_templates

`project_templates` is an array containing all templates shown on the main app page (index.js)

Each item in the array is a template with the following properties:

-   `id` a number containing the project template id
-   `name` the name of the template, shown on the front page
-   `description` a short description of the template, shown on the front page
-   `photo` the location of the image file displayed for this template. Eg. `/images/office.webp`
-   `icon` the location of the icon image file, currently unused
-   `required_products` any products in this array will automatically be added to the product list, and are not editable or removable by the user. _currently unused_
-   `addons` an array of currently selected addons
-   `rooms` an array of currently added rooms and their details

## room_templates

`room_templates` is an array containing all available room templates, shown when a user adds a new room.

Each item in the array is a room template with the following properties:

-   `room_template_id` a number containing the room template id
-   `name` the name of the template, shown in the list
-   `description` a short description of the template
-   `quantity` how many of these rooms are included in the project
-   `photo` the location of the image file displayed for this template. Eg. `/images/office.webp`
-   `icon` the location of the icon image file, currently unused
-   `products` an array containing the products selected by default for this room.

    Each item in the array is an object with the following properties:

    -   `id` the product id. This will be used to look up the product information
    -   `quantity` the quantity of this product
    -   `required` a boolean which will prevent the user from editing this product _currently unused_

-   `sensor` an object containing information about the selected sensor options

    -   `selected` a boolean indicating whether the user has selected a sensor or not. If `false` then any saved sensor products will not be listed in the products list
    -   `required` a boolean indicating if the user is able to choose whether to have a sensor or not.
    -   `products` an array listing selected sensor products. Follows same structure as `room_templates.products`

-   `environmental_sensor` an object containing information about the selected environmental sensor options

    -   `selected` a boolean indicating whether the user has selected an environmental sensor or not. If `false` then any saved sensor products will not be listed in the products list
    -   `required` a boolean indicating if the user is able to choose whether to have an environmental sensor or not.
    -   `products` an array listing selected environmental sensor products. Follows same structure as `room_templates.products`

## sensor_options

`sensor_options` lists the details of which sensor products are available or required based on the project details.

It is an object containing the following properties:

-   `yes` lists products which are required/available if a sensor is selected
    -   `required_products` an array listing products which are required if a sensor is selected. These products cannot be removed by the user. Note: _not currently used_
    -   `optional_products` an array listing products which the user can choose if a sensor is selected.
-   `no` lists products which are required/available if a sensor is _not_ selected
    -   `required_products` an array listing products which are required if a sensor is not selected. These products cannot be removed by the user. Note: _not currently used_
    -   `optional_products` an array listing products which the user can choose if a sensor is not selected.
-   `environmental` lists products which are required/available if an environmental sensor is selected. Note: this assumes that no products are required if an environmental sensor is NOT selected.
    -   `optional_products` an array listing products which the user can choose if an environmental sensor is selected.

All items in product arrays are objects with two properties: `id` and `quantity`

## products

`products` is an array listing details of all available products

Each item in the array is an object with the following properties:

-   `id` the unique product id. This is used to find the product details.
-   `name` the product name
-   `description` a short description of the product
-   `photo` the location of the image file of the product _currently unused_
-   `icon` the location of the icon image file of the product _currently unused_
-   `options` an **optional** object containing details of any user-selectable product options, such as colors, brands, etc. Each option should be a property in the array containing an array of the available options. For example:

`options: { "brand": [`
` {`
` "id": 101,`
` "name": "Mpress Elko",`
` "color_options": ["white", "black"]`
` },`
` {`
` "id": 102,`
` "name": "Exxact",`
` "color_options": ["white", "black"]`
` }`
` ] }`

## addons

`addons` lists all available addons to a project, such as battery backup, alarms, etc.

Each item in the array is an object with the following properties:

-   `id` the unique id of the addon
-   `name` the name of the addon
-   `description` a short description
-   `photo` the location of the image file of the addon _currently unused_
-   `icon` the location of the icon image file of the addon _currently unused_
