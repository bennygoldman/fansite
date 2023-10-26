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

const createNewElement = (el, className, text) => {
    const $el = document.createElement(el);
    className && ($el.classList.add(className));
    text && ($el.textContent = text);
    return $el;
};

const createButton = () => {
    const button = document.createElement('input');
    button.setAttribute('type', 'submit');
    button.setAttribute('value', 'BUY TICKETS');
    return button;
};

const renderShows = (arr) => {

    const $desktopDiv = createNewElement('div', 'desktop');
    const $dateLabel = createNewElement('p', 'label-desktop', 'DATE');
    const $placeLabel = createNewElement('p', 'label-desktop', 'VENUE');
    const $locationLabel = createNewElement('p', 'label-desktop', 'LOCATION');
    $desktopDiv.appendChild($dateLabel);
    $desktopDiv.appendChild($placeLabel);
    $desktopDiv.appendChild($locationLabel);
    $showListEl.appendChild($desktopDiv);

    arr.forEach((show) => {
        const $showRowEl = createNewElement('div');
        const $dateLabel = createNewElement('p', 'label-mobile', 'DATE');
        const $date = createNewElement('p', '', show.date);
        const $placeLabel = createNewElement('p', 'label-mobile', 'VENUE');
        const $place = createNewElement('p', '', show.place);
        const $locationLabel = createNewElement('p', 'label-mobile', 'LOCATION');
        const $location = createNewElement('p', '', show.location);
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