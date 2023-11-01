// STATIC COMMENTS FOR TESTING
// let commentArray = [
//     {
//         name: `Pandy Fackler`,
//         date: `03/17/2023`,
//         comment: `I was almost in a coma from doing the Bossa Nova. And the Funky Cold Medina.`
//     },
//     {
//         name: `Eddie Dingell`,
//         date: `12/25/2022`,
//         comment: `Won't you tell me what's on your mind? If you'd open your head tell me what would I find. Are you for real? What do you feel?`
//     },
//     {
//         name: `The Stallion`,
//         date: `04/04/2020`,
//         comment: `1. I can drink. 2. I get groomed. 3. I go for a walk. I am The Stallion.`
//     },
// ];

// GET DOM ELEMENTS
const $commentForm = document.getElementById('commentForm');
const $commentDisplay = document.getElementById('commentDisplay');

// REMOVES ERROR CLASS FROM AN ELEMENT
const clearErrorClass = (el) => {
    if (el.classList.contains('error')) {
        el.classList.remove('error');
    }
};

// ADDS ERROR CLASS TO AN ELEMENT
const addErrorClass = (el) => {
    el.classList.add('error');
};

// CONVERTS {MS SINCE EPOCH} DATE INTO SPEC'D FORMAT
const convertTimestampToDate = (timestamp) => {
    const date = timestamp ? new Date(timestamp) : new Date();
    const format = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = date.toLocaleDateString('en-US', format);
    return formattedDate;
};

// ADDS COMMENT FROM INPUT FORM TO OUTPUT AREA
const submitCommentEvent = (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('nameInput');
    const commentInput = document.getElementById('commentInput');

    const nameInputVal = nameInput.value;
    const commentInputVal = commentInput.value;

    clearErrorClass(nameInput);
    clearErrorClass(commentInput);

    if (!nameInputVal) {
        addErrorClass(nameInput);
    }

    if (!commentInputVal) {
        addErrorClass(commentInput);
    }
    if (nameInputVal && commentInputVal) {
        const comment = createComment(nameInputVal, commentInputVal);
        commentArray.unshift(comment);
        renderComments(commentArray);

        e.target.reset();
    }
};

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

// RENDERS ALL COMMENTS IN ARRAY TO DOM
const renderComments = (arr) => {
    $commentDisplay && ($commentDisplay.innerHTML = '');
    arr.forEach(comment => {
        const name = comment.name;
        // const date = comment.date;
        const date = convertTimestampToDate(comment.timestamp);
        const id = comment.id;
        const content = comment.comment;
        const likes = comment.likes;

        createDomElement(name, date, content, id, likes);
    });
};

// CREATES A COMMENT OBJECT FOR ADDING TO AN ARRAY
const createComment = (name, comment) => {

    // const date = convertTimestampToDate();

    return {
        name: name,
        comment: comment,
        // date: date,
    };

};

// CREATES A <LI> ELEMENT FROM AN ARRAY ITEM AND RENDERS IT TO THE DOM
const createDomElement = (name, date, comment, id, likes) => {

    const $listEl = createNewElement('li');
    const $articleEl = createNewElement('article');
    const $asideEl = createNewElement('aside');
    const $aviEl = createNewElement('img', 'avatar');
    const $divEl = createNewElement('div');
    const $topDivEl = createNewElement('div');
    const $midDivEl = createNewElement('div');
    const $btmDivEl = createNewElement('div');
    const $nameEl = createNewElement('p', ['txt', 'comment', 'name'], name);
    const $dateEl = createNewElement('time', ['txt', 'comment', 'date'], date);
    const $commentEl = createNewElement('p', ['txt', 'comment', 'copy'], comment);
    // const $likeBtnEl = createNewElement('button', '', 'like');
    // const $likeBtnEl = createNewElement('button');
    const $likeBtnEl = createNewElement('input');
    $likeBtnEl.setAttribute('type', 'image');
    $likeBtnEl.setAttribute('alt', 'like');
    $likeBtnEl.setAttribute('data-id', id ? id : null);
    $likeBtnEl.src = '../assets/icons/svg/icon-like.svg';

    // const $likeImgEl = createNewElement('img');

    // $likeBtnEl.appendChild($likeImgEl);

    const $likeCounterEl = createNewElement('p', ['txt', 'comment', 'label'], likes && likes === 1 ? `${likes} like` : `${likes} likes`);

    // const $delBtnEl = createNewElement('button', '', 'delete');
    // const $delBtnEl = createNewElement('button');
    const $delBtnEl = createNewElement('input');
    $delBtnEl.setAttribute('type', 'image');
    $delBtnEl.setAttribute('alt', 'delete');
    $delBtnEl.setAttribute('data-id', id ? id : null);

    // const $delImgEl = createNewElement('img');
    $delBtnEl.src = '../assets/icons/svg/icon-delete.svg';

    // $delBtnEl.appendChild($delImgEl);

    $aviEl.src = '../assets/images/0-boognish-avi.png';

    $asideEl.appendChild($aviEl);

    $topDivEl.appendChild($nameEl);
    $topDivEl.appendChild($dateEl);

    $midDivEl.appendChild($commentEl);

    $btmDivEl.appendChild($likeBtnEl);
    $btmDivEl.appendChild($likeCounterEl);
    $btmDivEl.appendChild($delBtnEl);

    $divEl.appendChild($topDivEl);
    $divEl.appendChild($midDivEl);
    $divEl.appendChild($btmDivEl);

    $articleEl.appendChild($asideEl);
    $articleEl.appendChild($divEl);

    $listEl.appendChild($articleEl);

    $commentDisplay.appendChild($listEl);

};

$commentForm.addEventListener('submit', submitCommentEvent);


// API DETAILS FOR FETCH REQUEST
const apiUrl = `https://project-1-api.herokuapp.com`;
const jsonBinUrl = `https://api.jsonbin.io/v3/b/6541e0f912a5d37659934004`;
const jsonBinApiKey = `$2a$10$fW/LUrdAWOy3flNyjCDoFOFMlUyRa.fcxMsLZHlgL4Tl/S5ptSUNK`;
const jsonBinHeaders = { "X-Master-Key": `${jsonBinApiKey}` };

const queryParams = `?api_key=`;
const apiKey = `1636ce99-0ac4-46f6-b625-cac457fb121f`;
const routeComments = `${apiUrl}/comments${queryParams}${apiKey}`;
const postDataTest = {
    name: 'Benny G',
    comment: 'Ween da Best Eva'
};

async function fetchData(apiUrl) {
    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: jsonBinHeaders
        });
        if (response.ok) {
            const data = await response.json();
            renderComments(data.record.comments);
        } else {
            console.log('NOT OK!');
        }
    } catch (error) {
        console.error('Error: ', error);
        throw error;
    }
}

// renderComments(commentArray);

function initialLoad(apiUrl = routeComments) {
    fetchData(apiUrl);
}

initialLoad(jsonBinUrl);


