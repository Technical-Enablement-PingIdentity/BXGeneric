# Hello BXGeneric!

This project includes a sample application to get started with your BXGeneric App. Please leave SHOW_REMIX_BUTTON env variable false in your remixes, while it is possible to remix bxgeneric remixes this is not recommended and not supported by the demo team.

This project includes a Node.js server script and a web page that connects to it. The front-end page presents a form the visitor can use to submit a color name, sending the submitted value to the back-end API running on the server. The server returns info to the page that allows it to update the display with the chosen color. π¨

[Node.js](https://nodejs.org/en/about/) is a popular runtime that lets you run server-side JavaScript. This project uses the [Fastify](https://www.fastify.io/) framework and explores basic templating with [Handlebars](https://handlebarsjs.com/).

## What you Need to Change

You'll get best use out of this project if you're familiar with basic JavaScript. If you've written JavaScript for client-side web pages this is a little different because it uses server-side JS, but the syntax is the same!

## What's in this project?

β `README.md`: Thatβs this file, where you can tell people what your cool website does and how you built it.

β `.env`: You need to update the following variables: **SK_API_HOSTNAME** **SK_COMPANY_ID** **SK_API_KEY**

β `server.js`: The **Node.js** server script for your new site. The JavaScript defines the endpoints in the site back-end, one to return the homepage and one to update with the submitted color. Each one sends data to a Handlebars template which builds these parameter values into the web page the visitor sees.

β `public/widget.js`: Update with your flow values for your Hello, Register and Authenticate variables

β `src/`: This folder holds the site template along with some basic data files.

β `src/index.hbs`: This is the main page template for your site. The template receives parameters from the server script, which it includes in the page HTML. The page sends the user submitted color value in the body of a request, or as a query parameter to choose a random color.
