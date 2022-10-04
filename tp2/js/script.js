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

    

    const slider = document.querySelectorAll(".slider-inner");
    //const progressbar = document.querySelectorAll(".progress-bar-inner");


    let slidergrabbed = false;

    // slider.forEach(a =>{
    //     a.parentElement.addEventListener("scroll",(e)=>{
    //         progressbar.forEach(element=>{
    //                 element.style.width = `${(a.parentElement.scrollLeft/(a.parentElement.scrollWidth-a.parentElement.clientWidth))*100}%`;
    //         })
    //     })
    // })

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

