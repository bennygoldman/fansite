# Fan Site

## This is a mock fan site for one of my favorite bands

It's built in HTML, CSS, and JS, and is responsive at mobile, tablet, and desktop viewports.

The **Comment** section uses JavaScript to make requests to an external API: `GET`, `PUT`, and `DELETE` existing data, `POST` new data from a front-end form, and render the data to the DOM.

The concept and design are based closely on an assignment I completed for bootcamp, with modifications to further develop my skillset.

Key differences between the original assignment and this "Fansite":

### Original

- Required BEM-style class names for HTML elements.
- Used SASS and @mixin/$variable features to write CSS.
- Used the Axios library to make HTTP requests to an external API

### New

- I used semantic HTML wherever possible, limited class names and kept extraneous wrappers to a minimum, working from a component-focused, scoped-styling structure.
- I wrote vanilla CSS without any pre- or post-processors in order to try new native variable naming and nesting features.
- I used JavaScript's built-in fetch API to interact with the server.

Time permitting, I'll make a few minor improvements to clean it up.

This was a fun challenge and a great personal experience to see how my code has evolved from bootcamp to now.

NOTES: This is the structure for a show:

         <div class="desktop">
                    <p class="txt show label desktop">DATE</p>
                    <p class="txt show label desktop">VENUE</p>
                    <p class="txt show label desktop ">LOCATION</p>
                </div>
                <div>
                    <p class="txt show label mobile">DATE</p>
                    <p class="txt show">Mon Sept 06 2021</p>
                    <p class="txt show label mobile">VENUE</p>
                    <p class="txt show">Ronald Lane</p>
                    <p class="txt show label mobile">LOCATION</p>
                    <p class="txt show">San Francisco, CA</p>
                    <input class="txt show button" type="submit" value="BUY TICKETS">
                </div>

NOTES: This is the structure for a comment:

                    <li>
                        <article>
                            <aside>
                                <img src="./assets/images/0-boognish-avi.png" alt="avatar" class="avatar">
                            </aside>
                            <div>
                                <div>
                                    <p class="txt comment name">Normal Comment</p>
                                    <time class="txt comment date">MM/DD/YYYY</time>
                                </div>
                                <div>
                                    <p class="txt comment copy">Lorem ipsum dolor, sit amet consectetur adipisicing
                                        elit.
                                        Quibusdam
                                        veniam rem a accusantium
                                        cum minus autem aperiam. Placeat, facere obcaecati. Officia iste soluta
                                        consequuntur
                                        porro
                                        voluptatem! Quae repellendus obcaecati eum?</p>
                                </div>
                                <div>
                                    <button>like</button>
                                    <p class="txt comment label">25 likes</p>
                                    <button>delete</button>
                                </div>
                            </div>
                        </article>
                    </li>
