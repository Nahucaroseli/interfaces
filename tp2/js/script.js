"user strict"
document.addEventListener("DOMContentLoaded", () => {

    loader();
    //Loader
    function loader() {
        setTimeout(function () {
            document.getElementById('spinner').style.visibility = "hidden";
            document.getElementById('loading').style.visibility = "hidden";
            document.getElementById('load-bar').style.visibility = "hidden";
            document.getElementById('content').style.visibility = "visible";
        }, 5000);
    }


    //burger menu
    const profile = document.querySelector(".profile");
    const menuIcon = document.querySelector(".menu");
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

    })


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
            console.log(newIndex);
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
    const slider = document.querySelectorAll(".slider-inner");
    const progressbar = document.querySelectorAll(".progress-bar-inner");


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

    
})

