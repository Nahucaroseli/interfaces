"user strict"
document.addEventListener("DOMContentLoaded", () => {

    loader();

    function loader() {
        setTimeout(function () {
            document.getElementById('spinner').style.visibility = "hidden";
            document.getElementById('content').style.visibility = "visible";
        }, 1000);
    }



    const burger = document.querySelector(".menu");
    const close = document.querySelector(".close-icon");
    const userMenu = document.querySelector(".menu-user");
    
    close.addEventListener("click", () =>{
        userMenu.classList.remove('active');
    })
   
    burger.addEventListener("click",() =>{
        userMenu.classList.toggle('active');
    })

    

    const slider = document.querySelector(".slider-inner");
    const progressbar = document.querySelector(".progress-bar-inner");

    let slidergrabbed = false;

    slider.parentElement.addEventListener("scroll", (e) =>{
        progressbar.style.width = `${getScrollPercentage()}%`;
    })

    slider.addEventListener("mousedown", (e) =>{
        slidergrabbed = true;
        slider.style.cursor = "grabbing";

    })
    slider.addEventListener("mouseup", (e) =>{
        slidergrabbed = false;
        slider.style.cursor = "grab";
        
    })

    slider.addEventListener("mouseleave", (e) =>{
        slidergrabbed = false;
        slider.style.cursor = "grab";
        
    })
    
    slider.addEventListener("mousemove", (e) =>{
        if(slidergrabbed){
            slider.parentElement.scrollLeft -= e.movementX;
        }
        
    })

    function getScrollPercentage(){
        return ((slider.parentElement.scrollLeft/(slider.parentElement.scrollWidth - slider.parentElement.clientWidth)) *100);
    }


})

