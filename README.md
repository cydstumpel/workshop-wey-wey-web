# Workshop Wey Wey Web
This is the boilerplate for the workshop I created for [Wey Wey Web](https://weyweyweb.com/)!


## Running this project
This project is built in CSS, JS and HTML, no bundlers involved. You can either open the index.html in your browser or use a tool like [Live Server](https://open-vsx.org/extension/ritwickdey/LiveServer)

## Generating pages
Updating all the speaker pages or speaker overview data by hand is a lot of work, that's why I created a generate function that generates the index.html with speaker overview and the speaker-detail pages automatically from the people-data.js in the generate-html folder. 

The pages are created by the generate-pages.js script inside the generate-html folder which replaces some strings with the data from people-data.js in the  detail-template.html and index-template.html. Feel free to add your own people!

When you're done editing the template html files run `npm run generate-pages`!