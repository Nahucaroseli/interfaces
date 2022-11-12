"user strict"
document.addEventListener("DOMContentLoaded", () => {

    loader();
    //Loader
    function loader() {
        let percentage = 0;
        const text = document.getElementById('load-percentage');
        if(text){
            const interval = setInterval(()=>{
                if(percentage<100){
                    percentage= percentage + 10;
                    document.getElementById('load-percentage').innerHTML = `${percentage}%`;    
                }
            },450);
            setTimeout(function () {
                clearInterval(interval);
                document.getElementById('loading').style.visibility = "hidden";
                document.getElementById('load-percentage').style.visibility = "hidden";
                document.getElementById('load-bar').style.visibility = "hidden";
                document.getElementById('content').style.visibility = "visible";
            }, 5000);
        }
        }
    
        


    //burger menu
    const profile = document.querySelector(".profile");
    const menuIcon = document.querySelector(".hamburger");
    const burgerMenu = document.querySelector(".burger-menu");
    const close = document.querySelectorAll(".close-icon");
    const userMenu = document.querySelector(".menu-user");
    
    close.forEach(element=>{
        element.addEventListener("click",()=>{
                burgerMenu.classList.remove("active");
                userMenu.classList.remove("active");
        })
    })
   
    profile.addEventListener("click",() =>{
        userMenu.classList.toggle('active');

    })
    menuIcon.addEventListener("click",() =>{
        burgerMenu.classList.toggle('active');
        menuIcon.classList.toggle('is-active');
    })

    //Revelar las cards al hacer scroll
    window.addEventListener('scroll',revealCards);

    function revealCards(){
        let reveals = document.querySelectorAll(".game-card-reveal");// agarramos las cards que queremos revelar

        for(let i =0;i<reveals.length;i++){//recorremos con un for las cards
            let windowHeight = window.innerHeight;
            let revealLeft = reveals[i].getBoundingClientRect().top;
            let revealPoint = 200;//seteamos el punto donde queremos revelar las cards

            if(revealLeft < windowHeight-revealPoint){
                reveals[i].classList.add('card-active');//aplicamos la clase card-active para hacer aparecer las cards
            }else{
                reveals[i].classList.remove('card-active');// removemos la clase si no estamos en el punto de scroll que queremos
            }
        }
    }


    const slider = document.querySelectorAll(".slider-inner");
    const progressbar = document.querySelectorAll(".progress-bar-inner");
    //Carousel slider

    let buttonPrev = document.querySelectorAll("#button-prev");
    let buttonNext = document.querySelectorAll("#button-next");
    
    for(let button1 of buttonPrev){
        button1.addEventListener("click",()=>{
            moveCarouseltoLeft(button1.dataset.button);
        })
    }
    for(let button2 of buttonNext){
        button2.addEventListener("click",()=>{
            moveCarouseltoRight(button2.dataset.button);
        })
    }

    function moveCarouseltoLeft(id){
        slider.forEach(element =>{
                if(id === element.dataset.slider){
                    if(element.parentElement.scrollLeft == 0){

                        return;
                    }
                    else{
                        element.parentElement.scrollLeft -= 270;
                    }
                }
                    

            
        })
    }

    function moveCarouseltoRight(id){
        slider.forEach(element =>{
                if(id ===element.dataset.slider){
                    if(element.parentElement.scrollLeft == 1079){

                        return;
                    }
                    else{
                        element.parentElement.scrollLeft += 270;
                    }
                }
                

            
        })
    }




    //Carousel Main Index
    const buttons = document.querySelectorAll("[data-carousel-button]");

    buttons.forEach(button =>{
        button.addEventListener("click", ()=>{
            const offset = button.dataset.carouselButton === "next" ? 1 : -1
            const offsetText = button.dataset.carouselText === "next" ? 1 : -1
            const slides = button.closest("[data-carousel").querySelector("[data-slides]");
            const texts = button.closest("[data-carousel").querySelector("[data-text]");


            const activeSlide = slides.querySelector("[data-active]");
            const activeText = texts.querySelector("[data-text-active]");


            let newIndex = [...slides.children].indexOf(activeSlide) + offset;
            let newIndexText = [...texts.children].indexOf(activeText) + offsetText;

            if(newIndex < 0 && newIndexText <0){
                newIndex = slides.children.length -1;
                newIndexText = texts.children.length -1;
             
            }
            if(newIndex >=slides.children.length && newIndexText >=texts.children.length)
            {
                newIndex = 0;
                newIndexText = 0;
        }
            slides.children[newIndex].dataset.active = true
            delete activeSlide.dataset.active
            texts.children[newIndexText].dataset.textActive = true
            delete activeText.dataset.textActive
        })
    })



    
    //carousel with progress bar
   
    let slidergrabbed = false;

     slider.forEach(a =>{
    a.parentElement.addEventListener("scroll",(e)=>{
             progressbar.forEach(element=>{
                if(a.dataset.slider === element.dataset.bar){
                    element.style.width = `${(a.parentElement.scrollLeft/(a.parentElement.scrollWidth-a.parentElement.clientWidth))*100}%`;
                }        
            })
         })
     })

    slider.forEach(element=>{
        element.addEventListener("mousedown", (e)=>{
            slidergrabbed = true;
            element.style.cursor = "grabbing";
        })
    })

    slider.forEach(element=>{
        element.addEventListener("mouseup", (e)=>{
            slidergrabbed = false;
            element.style.cursor = "grab";
        })
    })


    slider.forEach(element=>{
        element.addEventListener("mouseleave", (e)=>{
            slidergrabbed = false;
            element.style.cursor = "grab";
        })
    })
    
     slider.forEach(element=>{
        element.addEventListener("mousemove", (e)=>{
           if(slidergrabbed){
            element.parentElement.scrollLeft -= e.movementX;
           }
        })
    })


    //header sticky

    const headerClass = document.querySelector('.headerClass');
    const logo = document.querySelector('.logo');
    let prevY = window.scrollY; //Posicion del scroll al inicio
    //Detecto la posicion del scroll
    window.addEventListener('scroll', function(){
        if(prevY > window.scrollY) { //si sube
            headerClass.classList.remove('reduce')
        } else { //baja el scroll
            headerClass.classList.add('reduce')
        }
        prevY = window.scrollY; //seteo la posicion del scroll
    })
    
})

