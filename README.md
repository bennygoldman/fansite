# Fan Site

## This is a mock fan site for one of my favorite bands

It's built in HTML, CSS, and JS, and is responsive at mobile, tablet, and desktop viewports.

See it live here: <https://bennygoldman.github.io/fansite/>

The **Comment** section uses JavaScript to make requests to an external API: `GET`, `PUT`, and `DELETE` existing data, `POST` new data from a front-end form, and render the data to the DOM.

The concept and design are based closely on an assignment I completed for bootcamp, with modifications to further develop my skillset.

Key differences between the original assignment and this "Fansite":

### Original

- Required BEM-style class names for HTML elements.
- Used SASS and @mixin/$variable features to write CSS.
- Used the Axios library to make HTTP requests to an external API

### New

- HTML is semantic wherever possible. I limited class names and kept extraneous wrappers to a minimum, working from a component-focused, scoped-styling structure.
- CSS is vanilla without any pre- or post-processors. I wanted to to try native variable naming and new nesting features.
- JavaScript uses built-in fetch API to interact with the server.

This was a fun challenge and a great personal experience to see how my code has evolved from bootcamp to now.
