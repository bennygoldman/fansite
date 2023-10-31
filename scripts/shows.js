// STATIC SHOWS FOR TESTING
let showArray = [
    {
        date: `Mon Sept 06 2021`,
        place: `Ronald Lane`,
        location: `San Francisco, CA`,
    },
    {
        date: `Tue Sept 21 2021`,
        place: `Pier 3 East`,
        location: `San Francisco, CA`,
    },
    {
        date: `Fri Oct 15 2021`,
        place: `View Lounge`,
        location: `San Francisco, CA`,
    },
    {
        date: `Sat Nov 06 2021`,
        place: `Hyatt Agency `,
        location: `San Francisco, CA`,
    },
    {
        date: `Fri Nov 26 2021`,
        place: `Moscow Center`,
        location: `San Francisco, CA`,
    },
    {
        date: `Wed Dec 15 2021`,
        place: `Press Club`,
        location: `San Francisco, CA`,
    },
];

const $showListEl = document.querySelector('.show-list');

const createNewElement = (el, classNames, text) => {
    const $el = document.createElement(el);
    if (Array.isArray(classNames)) {
        classNames.forEach(className => $el.classList.add(className));
    } else {
        classNames && ($el.classList.add(classNames));
    }
    text && ($el.textContent = text);
    return $el;
};

const createButton = () => {
    const button = document.createElement('input');
    button.classList.add('txt', 'show', 'button');
    button.setAttribute('type', 'submit');
    button.setAttribute('value', 'BUY TICKETS');
    return button;
};

const renderShows = (arr) => {

    const $desktopDiv = createNewElement('div', 'desktop');
    console.log($desktopDiv);
    const $dateLabel = createNewElement('p', ['txt', 'show', 'label', 'desktop'], 'DATE');
    const $placeLabel = createNewElement('p', ['txt', 'show', 'label', 'desktop'], 'VENUE');
    const $locationLabel = createNewElement('p', ['txt', 'show', 'label', 'desktop'], 'LOCATION');
    $desktopDiv.appendChild($dateLabel);
    $desktopDiv.appendChild($placeLabel);
    $desktopDiv.appendChild($locationLabel);
    $showListEl.appendChild($desktopDiv);

    arr.forEach((show) => {
        const $showRowEl = createNewElement('div');
        const $dateLabel = createNewElement('p', ['txt', 'show', 'label', 'mobile'], 'DATE');
        const $date = createNewElement('time', ['txt', 'show'], show.date);
        const $placeLabel = createNewElement('p', ['txt', 'show', 'label', 'mobile'], 'VENUE');
        const $place = createNewElement('p', ['txt', 'show'], show.place);
        const $locationLabel = createNewElement('p', ['txt', 'show', 'label', 'mobile'], 'LOCATION');
        const $location = createNewElement('p', ['txt', 'show'], show.location);
        const $showButtonEl = createButton();
        $showRowEl.appendChild($dateLabel);
        $showRowEl.appendChild($date);
        $showRowEl.appendChild($placeLabel);
        $showRowEl.appendChild($place);
        $showRowEl.appendChild($locationLabel);
        $showRowEl.appendChild($location);
        $showRowEl.appendChild($showButtonEl);
        $showListEl.appendChild($showRowEl);
    });

};

renderShows(showArray);
