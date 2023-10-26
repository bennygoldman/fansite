// STATIC COMMENTS FOR TESTING
let commentArray = [
    {
        name: `Eddie Dingell`,
        date: `12/25/2022`,
        comment: `Won't you tell me what's on your mind? If you'd open your head tell me what would I find. Are you for real? What do you feel?`
    },
    {
        name: `Pandy Fackler`,
        date: `03/17/2023`,
        comment: `I was almost in a coma from doing the Bossa Nova. And the Funky Cold Medina.`
    },
    {
        name: `The Stallion`,
        date: `04/04/2020`,
        comment: `1. I can drink. 2. I get groomed. 3. I go for a walk. I am The Stallion.`
    },
];

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

// RENDERS ALL COMMENTS IN ARRAY TO DOM
const renderComments = (arr) => {
    $commentDisplay && ($commentDisplay.innerHTML = '');
    arr.forEach(comment => {
        const name = comment.name;
        const date = comment.date;
        const content = comment.comment;

        createDomElement(name, date, content);
    });
};

// CREATES A COMMENT OBJECT FOR ADDING TO AN ARRAY
const createComment = (name, comment) => {

    const date = convertTimestampToDate();

    return {
        name: name,
        comment: comment,
        date: date,
    };

};

// CREATES A <LI> ELEMENT FROM AN ARRAY ITEM AND RENDERS IT TO THE DOM
const createDomElement = (name, date, comment) => {
    const $listEl = document.createElement('li');
    const $aviEl = document.createElement('img');
    const $divEl = document.createElement('div');
    const $nameEl = document.createElement('p');
    const $dateEl = document.createElement('p');
    const $commentEl = document.createElement('p');

    $aviEl.src = '../assets/images/0-boognish-avi.png';
    $nameEl.textContent = name;
    $dateEl.textContent = date;
    $commentEl.textContent = comment;

    $listEl.appendChild($aviEl);
    $divEl.appendChild($nameEl);
    $divEl.appendChild($dateEl);
    $divEl.appendChild($commentEl);
    $listEl.appendChild($divEl);
    $commentDisplay.appendChild($listEl);

};

renderComments(commentArray);