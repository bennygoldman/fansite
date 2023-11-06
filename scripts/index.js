// DOM ACTIONS
const domActionFactory = () => {

    // CLEARS THE COMMENTS FROM THE DOM
    const clearComments = () => {
        const $commentDisplay = document.getElementById('commentDisplay');
        $commentDisplay && ($commentDisplay.innerHTML = '');
    };

    // CREATES AN ELEMENT OF ANY TYPE WITH OPTIONAL CLASSES AND INNER TEXT
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

    // CREATES A <LI> ELEMENT FROM AN ARRAY ITEM AND RENDERS IT TO THE DOM
    const createCommentListItem = (name, date, comment, id, likes) => {

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
        const $likeBtnEl = createNewElement('input');
        $likeBtnEl.setAttribute('type', 'image');
        $likeBtnEl.setAttribute('alt', 'like');
        $likeBtnEl.setAttribute('data-id', id ? id : null);
        $likeBtnEl.src = './assets/icons/svg/icon-like.svg';
        $likeBtnEl.addEventListener('click', e => {
            const commentId = e.target.getAttribute('data-id');
            likeCommentById(commentId);
        });

        const $likeCounterEl = createNewElement('p', ['txt', 'comment', 'label'], likes && likes === 1 ? `${likes} like` : `${likes} likes`);

        const $delBtnEl = createNewElement('input');
        $delBtnEl.setAttribute('type', 'image');
        $delBtnEl.setAttribute('alt', 'delete');
        $delBtnEl.setAttribute('data-id', id ? id : null);
        $delBtnEl.addEventListener('click', e => {
            const commentId = e.target.getAttribute('data-id');
            deleteCommentById(commentId);
        });

        $delBtnEl.src = './assets/icons/svg/icon-delete.svg';

        $aviEl.src = './assets/images/0-boognish-avi.png';

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

        return $listEl;

    };

    // CONVERTS {MS SINCE EPOCH} DATE INTO SPEC'D FORMAT
    const convertTimestampToDate = timestamp => {
        const date = timestamp ? new Date(timestamp) : new Date();
        const format = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDate = date.toLocaleDateString('en-US', format);
        return formattedDate;
    };

    // FORMATS COMMENT OBJS FOR RENDERING TO DOM
    const renderComments = (arr) => {
        clearComments();

        arr.forEach(comment => {
            const name = comment.name;
            const date = convertTimestampToDate(comment.timestamp);
            const id = comment.id;
            const content = comment.comment;
            const likes = comment.likes;
            const $listItemEl = createCommentListItem(name, date, content, id, likes);
            const $commentDisplay = document.getElementById('commentDisplay');
            $commentDisplay.appendChild($listItemEl);
        });

    };

    // DELETE A COMMENT
    const deleteCommentById = id => {
        const commentApi = fetchActionFactory();
        commentApi.deleteComment(id, 'delete');
    };

    // LIKE A COMMENT
    const likeCommentById = id => {
        const commentApi = fetchActionFactory();
        commentApi.likeComment(id, 'like');
    };

    return { renderComments };
};

// FETCH ACTIONS
const fetchActionFactory = () => {
    const commentsBaseUrl = `https://project-1-api.herokuapp.com/comments`;
    const apiKey = `?api_key=1636ce99-0ac4-46f6-b625-cac457fb121f`;
    const allCommentsRoute = `${commentsBaseUrl}${apiKey}`;
    const commentActionsRoute = (id, action) => {
        if (action === 'like') {
            return `${commentsBaseUrl}/${id}/${action}${apiKey}`;
        }
        else { return `${commentsBaseUrl}/${id}${apiKey}`; }
    };

    const getComments = async () => {
        let data;
        try {
            const response = await fetch(allCommentsRoute);
            if (response.ok) {
                const domMethods = domActionFactory();
                data = await response.json();
                const sortedData = [...data].sort((a, b) => b.timestamp - a.timestamp);
                domMethods.renderComments(sortedData);
            }
            else { console.log('NOT OK!'); }
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
        return data;
    };

    const postComment = async comment => {
        let data;
        try {
            const headersList = {
                "Content-Type": "application/json"
            };

            const bodyContent = JSON.stringify({
                "name": comment.name,
                "comment": comment.comment
            });

            const response = await fetch(allCommentsRoute, {
                method: "POST",
                body: bodyContent,
                headers: headersList
            });
            if (response.ok) {
                data = await response.json();
                console.log(data);
                getComments();
            }
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    const likeComment = async (commentId, commentAction) => {
        const route = commentActionsRoute(commentId, commentAction);

        try {
            let response = await fetch(route, {
                method: "PUT",
            });

            let data = await response.json();
            console.log(data);
            getComments();
        } catch (error) {
            console.error('Error liking comment:', error);
        }
    };

    const deleteComment = async commentId => {
        const route = commentActionsRoute(commentId);
        try {
            id = commentId;
            let response = await fetch(route, {
                method: "DELETE",
            });

            let data = await response.json();
            console.log(data);
            getComments();
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    return { getComments, postComment, likeComment, deleteComment };
};

// FORM ACTIONS
const initalizeForm = () => {
    const $commentForm = document.getElementById('commentForm');

    // REMOVES ERROR CLASS FROM AN ELEMENT
    // const clearErrorClass = (el) => {
    //     if (el.classList.includes('error')) {
    //         el.classList.remove('error');
    //     }
    // };

    // ADDS ERROR CLASS TO AN ELEMENT
    // const addErrorClass = (el) => {
    // el.classList.add('error');
    // };

    // const checkError = el => {

    // };

    const submitCommentEvent = e => {
        e.preventDefault();
        const name = e.target.nameInput.value;
        const comment = e.target.commentInput.value;

        if (name && comment) {
            const commentApi = fetchActionFactory();
            // CREATES A COMMENT OBJECT FOR ADDING TO AN ARRAY
            const createCommentObj = (name, comment) => {

                return {
                    name: name,
                    comment: comment
                };

            };
            const commentObj = createCommentObj(name, comment);
            commentApi.postComment(commentObj);
            e.target.reset();
        }
    };

    $commentForm.addEventListener('submit', submitCommentEvent);

};

// INITIAL PAGE LOAD
const loadPage = () => {
    // VARIABLES FOR DOM ELEMENTS
    const commentsApi = fetchActionFactory();
    commentsApi.getComments();
    initalizeForm();
};

loadPage();