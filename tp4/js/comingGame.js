let character = document.querySelector(".hero-section-mask");
let gameTitle = document.querySelector(".hero-section-game-title");
let titleCharacterSection = document.getElementById("title-characters-section");
let storyImg = document.querySelectorAll(".story-img");
let storyText = document.querySelectorAll(".story-text");

window.addEventListener('scroll',()=>{
        let scrollY = window.scrollY;
        console.log(scrollY);
        const scrolled = window.pageYOffset;//guardamos el valor del scroll total que realizo el usuario
        const val = scrolled*0.5;
        character.style.transform = `translateX(-${0.30*val}%)`;//agregamos una transformacion al personaje 
        gameTitle.style.transform = `translateX(${0.30*val}%)`;//agregamos una transformacion al titulo del juego
        titleCharacterSection.style.transform = `translateY(${0.28*val}px)`;
        titleCharacterSection.style.opacity = 1;

	//Recorremos todas las imagenes y textos
        storyImg.forEach(function(img){
            img.classList.add("hide-img");
        })
        storyText.forEach(function(text){
            text.classList.add("hide-text");
        })


	// Segun la posicion del scroll vamos removiendo las clases que ocultan el contenido
        if (scrollY > 3365 && scrollY < 3500) {
            storyText[0].classList.remove("hide-text");
            storyImg[0].classList.remove("hide-img");
            storyImg[0].style.opacity = 1;
          }
          else if (scrollY >= 3600 && scrollY < 3900) {
            storyText[1].classList.remove("hide-text");
            storyImg[1].classList.remove("hide-img");
            storyImg[1].style.opacity = 1;
          } else if (scrollY >= 3900 && scrollY < 4100) {
            storyText[2].classList.remove("hide-text")
            storyImg[2].classList.remove("hide-img");
            storyImg[2].style.opacity = 1;
          }

   
})
