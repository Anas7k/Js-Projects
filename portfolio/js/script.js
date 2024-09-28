const header = document.querySelector('.navbar')
let menu = document.querySelector('.menu');
let navbar = document.querySelector('.navbar ul');

// Initially hide the navbar by setting maxHeight to 0px
navbar.style.maxHeight = "0px";

menu.addEventListener('click', () => {
    // Toggle between showing and hiding
    if (navbar.style.maxHeight === "0px" || navbar.style.maxHeight === "") {
        navbar.style.maxHeight = "300px"; // Adjust the height as per your content
    } else {
        navbar.style.maxHeight = "0px";
    }
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('navbar-scrolled')
    }else if (window.scrollY <= 50) {
        header.classList.remove('navbar-scrolled')
    }
})
