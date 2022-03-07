// Select the toggle button
var el = document.querySelector('.navbar-toggler');
var el2 = document.querySelector('.navbar-collapse');

el.onclick = function () {
    el2.classList.toggle('show')
} 