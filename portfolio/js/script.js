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

function random(min, max) {
    return min + Math.random() * (max - min);
  }
  
  const body = document.querySelector('body');
  let numberOfStars;
  const screenWidth = window.innerWidth;

  if (screenWidth < 576) {
      numberOfStars = 30; // For small screens
  } else if (screenWidth < 768) {
      numberOfStars = 60; // For medium screens
  } else if (screenWidth < 968) {
    numberOfStars = 90;
  }else if (screenWidth < 1500) {
    numberOfStars = 120;
  }
//   else if (screenWidth >= 1400) {
//     numberOfStars = 120;
//   }
  else {
      numberOfStars = 150; // For large screens
  }
  const shineChance = 0.8; // 30% chance to be shining
  
  for (let i = 0; i < numberOfStars; i++) {
    // Set up random elements
    let xPos = random(0, 100);
    let yPos = random(0, 100);
    let alpha = random(0.5, 1);
    let size = random(1, 3); // Size range for stars
      
    // Create an <i> element for the star and set styles
    const star = document.createElement('i');
    star.classList.add('fa', 'fa-star');  // Add FontAwesome star classes
    star.style.position = 'fixed';  // Absolute positioning for free placement
    star.style.left = xPos + '%';
    star.style.top = yPos + '%';
    star.style.opacity = alpha;
    star.style.fontSize = size + 'px';  // Use em for size, making it responsive
    star.style.color = '#ffffff';  // Set star color
    star.style.zIndex = '-1';  // Ensure stars are on top of other content
  
    // Randomly apply shining class with random delay
    if (Math.random() < shineChance) {
      const randomDelay = random(0, 9); // Random delay between 0 and 1.5 seconds
      star.classList.add('shining'); // Apply shining animation
      star.style.animationDelay = randomDelay + 's'; // Set the delay for animation
    }
  
    document.body.appendChild(star);
  }
  
