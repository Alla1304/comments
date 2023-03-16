'use strict';

let form = document.forms[0];
let formUsername = document.querySelector('.form__username');
let formComment = document.querySelector('.form__comment');
let commentList = document.querySelector('.comment-list');

form.addEventListener('submit', function () {
    event.preventDefault();

    if (!form.username.value && !form.username.nextElementSibling) {
        let nameError = document.createElement('span');
        nameError.textContent = 'Имя не заполнено'
        nameError.classList.add('error');
        formUsername.append(nameError);
    };
    if (!form.comment.value && !form.comment.nextElementSibling) {
        let commentError = document.createElement('span');
        commentError.textContent = 'Комментарий не заполнен';
        commentError.classList.add('error');
        formComment.append(commentError);
    };
    if (form.username.value && form.comment.value) {
        createComment(this);
        this.username.value = '';
        this.comment.value = '';
        this.date.value = '';
    };

});

function createComment(form) {
    let todayDate = new Date();
    let commentDate = createDate(form, todayDate);
    let time = createTime(todayDate);
    let newComment = document.createElement('li');
    newComment.innerHTML = `<p class="username">${form.username.value}</p><p class="usercomment">${form.comment.value}</p><p class="date">${commentDate}, ${time}</p>`;
    let delButton = document.createElement('button');
    delButton.classList.add('del-button');
    delButton.innerHTML = `<img src='img/delete.svg' width = "20px">`;
    let likeButton = document.createElement('button');
    likeButton.classList.add('like');
    let likeCounter = document.createElement('span');
    let count = 0;
    likeCounter.classList.add('counter');
    newComment.append(likeButton);
    newComment.append(likeCounter);
    newComment.append(delButton);
    commentList.prepend(newComment);
    delButton.onclick = function () {
        newComment.remove();
    };
    likeButton.onclick = function () {
        this.classList.toggle('active');

        if (this.classList.contains('active')) {
            count++;
            likeCounter.textContent = count;
        } else {
            count--;
            likeCounter.textContent = count;
        };
        if (count <= 0) {
            likeCounter.textContent = '';
        };
    };
};

function createDate(form, date) {
    let yesterdayDate = new Date(new Date().setDate(new Date().getDate() - 1));
    let commentDate;
    let day;
    let month;
    let year;

    if (!form.date.value) {
        commentDate = date;
    } else {
        commentDate = new Date(`${form.date.value}`);
    };

    if (commentDate.getFullYear() == date.getFullYear() && commentDate.getMonth() == date.getMonth() && commentDate.getDate() == date.getDate()) {
        commentDate = 'сегодня';
    } else if (commentDate.getFullYear() == yesterdayDate.getFullYear() && commentDate.getMonth() == yesterdayDate.getMonth() && commentDate.getDate() == yesterdayDate.getDate()) {
        commentDate = 'вчера';
    } else {

        if (commentDate.getDate() < 10) {
            day = '0' + commentDate.getDate();
        } else {
            day = commentDate.getDate();
        };

        if ((commentDate.getMonth() + 1) < 10) {
            month = '0' + (commentDate.getMonth() + 1);
        } else {
            month = commentDate.getMonth() + 1;
        }

        year = commentDate.getFullYear();
        commentDate = `${day}.${month}.${year}`;
    };

    return commentDate;
};

function createTime(date) {
    let hours;
    let minutes;
    let time;
    if (date.getHours() < 10) {
        hours = '0' + date.getHours();
    } else {
        hours = date.getHours();
    };

    if (date.getMinutes() < 10) {
        minutes = '0' + date.getMinutes();
    } else {
        minutes = date.getMinutes();
    };

    time = `${hours}:${minutes}`;
    return time;
};

function delErr() {
    if (this.nextElementSibling && this.nextElementSibling.classList.contains('error')) {
        this.nextElementSibling.remove();
    };
};

form.username.onfocus = delErr;
form.comment.onfocus = delErr;

