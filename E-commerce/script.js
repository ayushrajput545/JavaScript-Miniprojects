
const menuBtn = document.getElementById('menu-btn');
const navLinks= document.getElementById('nav-links');
const menuBtnIcon = menuBtn.querySelector('i');

menuBtnIcon.addEventListener('click', (e) =>{
    navLinks.classList.toggle('active');

    const isActive = navLinks.classList.contains('active' );
    menuBtnIcon.setAttribute('class' , isActive?'ri-close-line':'ri-menu-line')  //if navlinks class is active then close line icon is visible in the place of menu line icon and vice verse
 
})

navLinks.addEventListener('click' , (e) =>{

    navLinks.classList.remove('active');
    menuBtnIcon.setAttribute('class', 'ri-menu-line')
    
});

const navSearch = document.getElementById('nav-search');
const navSearchIcon= document.getElementById('nav-search-icon');
 

navSearchIcon.addEventListener('click', (e)=>{
    navSearch.classList.toggle('active');
    
} );

const scrollRevealOption ={
    distance:"50px",
    origin:"bottom",
    duration:1000,
}

ScrollReveal().reveal(".header-image img", {
    ...scrollRevealOption,  // using spread operator it is defined above
    origin:"right",

});

ScrollReveal().reveal(".header-content div", {
  duration:1000,
  delay:500  // delay when above animation completed 

});

ScrollReveal().reveal(".header-content h1", {
    ...scrollRevealOption,
    delay:1000,

});

ScrollReveal().reveal(".header-content p", {
    ...scrollRevealOption,
    delay:1500,

});

ScrollReveal().reveal(".deals-card" , {
    ...scrollRevealOption,
    interval:500,
});

ScrollReveal().reveal(".about-images img", {
    ...scrollRevealOption,  // using spread operator it is defined above
    origin:"left",

});

ScrollReveal().reveal(".about-card", {
  duration:1000,
  interval:500,
  delay:500  // delay when above animation completed 

});

const swiper = new Swiper('.swiper', {
    loop: true,
})
 




