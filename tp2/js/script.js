"user strict"
document.addEventListener("DOMContentLoaded", () => {

    loader();

    function loader() {
        setTimeout(function () {
            document.getElementById('spinner').style.visibility = "hidden";
            document.getElementById('content').style.visibility = "visible";
        }, 1000); //cambiar!!!
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

    

})

