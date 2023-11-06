const showdateActionFactory = () => {
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

    const convertTimestampToDate = (timestamp) => {
        const date = timestamp ? new Date(timestamp) : new Date();
        const formattedDate = date.toDateString();
        return formattedDate;
    };

    const renderShows = (arr) => {
        const $showListEl = document.querySelector('.show-list');

        const $desktopDiv = createNewElement('div', 'desktop');
        const $dateLabel = createNewElement('p', ['txt', 'show', 'label', 'desktop'], 'DATE');
        const $placeLabel = createNewElement('p', ['txt', 'show', 'label', 'desktop'], 'VENUE');
        const $locationLabel = createNewElement('p', ['txt', 'show', 'label', 'desktop'], 'LOCATION');
        $desktopDiv.appendChild($dateLabel);
        $desktopDiv.appendChild($placeLabel);
        $desktopDiv.appendChild($locationLabel);
        $showListEl.appendChild($desktopDiv);

        arr.forEach((show) => {
            const $showRowEl = createNewElement('div');
            $showRowEl.setAttribute('data-showrow', '');
            const $dateLabel = createNewElement('p', ['txt', 'show', 'label', 'mobile'], 'DATE');
            const $date = createNewElement('time', ['txt', 'show'], convertTimestampToDate(show.date));
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

    return { renderShows };
};

const fetchActionFactory = () => {
    const commentsBaseUrl = `https://project-1-api.herokuapp.com/showdates`;
    const apiKey = `?api_key=1636ce99-0ac4-46f6-b625-cac457fb121f`;
    const allShowdatesRoute = `${commentsBaseUrl}${apiKey}`;

    const getShowdates = async () => {
        let data;
        try {
            const response = await fetch(allShowdatesRoute);
            if (response.ok) {
                data = await response.json();
                const domMethods = showdateActionFactory();
                // console.log(domMethods);
                domMethods.renderShows(data);
                // domMethods.renderShows(data);
            }
            else { console.log('NOT OK!'); }
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
        return data;
    };


    return { getShowdates };
};

const initalLoad = fetchActionFactory();
initalLoad.getShowdates();