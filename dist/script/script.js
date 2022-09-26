const burgerMenu = document.querySelector('.mobile-menu-icon');
const navMenu = document.querySelector('.lp-nav-menu');
console.log(burgerMenu);

burgerMenu.addEventListener('click', function (event) {
    let target = event.target.closest('div');
   
    if(target) {
      navMenu.classList.toggle('active');
        burgerMenu.classList.toggle('close-icon');
    }
});
