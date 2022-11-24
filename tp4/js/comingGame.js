

// Funcion para mostrar las imagenes segun el scroll
let storyCards = document.querySelectorAll(".story-item");
document.querySelector(".story-section").addEventListener('scroll',()=>{
    let scrollposition = document.querySelector(".story-section").scrollTop;
    if(scrollposition>900 && scrollposition<2000){//si la posicion del scroll se encuentra dentro de estos valores, se aplica la clase
        storyCards[0].classList.add("show-story-img");
    }
    if(scrollposition>1000 && scrollposition<3150){
        storyCards[1].classList.add("show-story-img");
    }
    if(scrollposition>3550 && scrollposition<3967){
        storyCards[2].classList.add("show-story-img");
    }
})


let character = document.querySelector(".hero-section-mask");
let gameTitle = document.querySelector(".hero-section-game-title");
let titleCharacterSection = document.getElementById("title-characters-section");

window.addEventListener('scroll',()=>{
        const scrolled = window.pageYOffset;//guardamos el valor del scroll total que realizo el usuario
        const val = scrolled*0.5;
        character.style.transform = `translateX(-${0.30*val}%)`;//agregamos una transformacion al personaje 
        gameTitle.style.transform = `translateX(${0.30*val}%)`;//agregamos una transformacion al titulo del juego
        titleCharacterSection.style.transform = `translateY(${0.28*val}px)`;
        titleCharacterSection.style.opacity = 1;

    
})