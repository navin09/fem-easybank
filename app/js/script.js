const btnHamburger = document.querySelector('#btnHamburger');
const header = document.querySelector('.header');
const overlay = document.querySelector('.overlay');

btnHamburger.addEventListener('click', (event) => {
    console.log('click hamburger');
    if(header.classList.contains('open')) { // close hamburger menu
        header.classList.remove('open');
        overlay.classList.add('fade-out');
        overlay.classList.remove('fade-in');
    } else { // Open hamburger menu
        header.classList.add('open');
        overlay.classList.remove('fade-out');
        overlay.classList.add('fade-in');
    }
});