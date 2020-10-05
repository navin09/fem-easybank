const body = document.querySelector('body');
const btnHamburger = document.querySelector('#btnHamburger');
const header = document.querySelector('.header');
const overlay = document.querySelector('.overlay');
const fadeElems = document.querySelectorAll('.has-fade');

btnHamburger.addEventListener('click', (event) => {
    console.log('click hamburger');
    if(header.classList.contains('open')) { // close hamburger menu
        header.classList.remove('open');
        fadeElems.forEach((element) => {
            element.classList.add('fade-out');
            element.classList.remove('fade-in');
        });
        body.classList.remove('noscroll');
    } else { // Open hamburger menu
        header.classList.add('open');
        fadeElems.forEach((element) => {
            element.classList.remove('fade-out');
            element.classList.add('fade-in');
        });
        body.classList.add('noscroll');
    }
});