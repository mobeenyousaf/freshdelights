document.querySelector('#search-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const searchText = document.querySelector('#search-box').value.toLowerCase();
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
      if (section.textContent.toLowerCase().includes(searchText)) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
      }
  });
});
let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('header .flex .navbar');

menu.onclick = () =>{
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
}

let section = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header .navbar a');

window.onscroll = () =>{

  menu.classList.remove('fa-times');
  navbar.classList.remove('active');

  section.forEach(sec =>{

    let top = window.scrollY;
    let height = sec.offsetHeight;
    let offset = sec.offsetTop - 150;
    let id = sec.getAttribute('id');

    if(top >= offset && top < offset + height){
      navLinks.forEach(links =>{
        links.classList.remove('active');
        document.querySelector('header .navbar a[href*='+id+']').classList.add('active');
      });
    };

  });

}

document.querySelector('#search-icon').onclick = () =>{
  document.querySelector('#search-form').classList.toggle('active');
}

document.querySelector('#close').onclick = () =>{
  document.querySelector('#search-form').classList.remove('active');
}

var swiper = new Swiper(".home-slider", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  loop:true,
});

var swiper = new Swiper(".review-slider", {
  spaceBetween: 20,
  centeredSlides: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  loop:true,
  breakpoints: {
    0: {
        slidesPerView: 1,
    },
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

function loader(){
  document.querySelector('.loader-container').classList.add('fade-out');
}

function fadeOut(){
  setInterval(loader, 1000);
}

window.onload = fadeOut;

document.addEventListener("DOMContentLoaded", () => {
  const cartItems = [];
  const cartElement = document.querySelector(".cart-items");
  const cartTotalElement = document.querySelector(".cart-total");

  function updateCart() {
      cartElement.innerHTML = "";
      let total = 0;
      cartItems.forEach((item, index) => {
          const itemElement = document.createElement("li");
          itemElement.classList.add("cart-item");
          itemElement.innerHTML = `
              <span>${item.name}</span>
              <span>$${item.price.toFixed(2)}</span>
              <span>Quantity: ${item.quantity}</span>
              <button onclick="updateQuantity(${index}, 1)">+</button>
              <button onclick="updateQuantity(${index}, -1)">-</button>
          `;
          cartElement.appendChild(itemElement);
          total += item.price * item.quantity;
      });
      cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
  }

  function addToCart(name, price) {
      const existingItemIndex = cartItems.findIndex(item => item.name === name);
      if (existingItemIndex >= 0) {
          cartItems[existingItemIndex].quantity += 1;
      } else {
          cartItems.push({ name, price, quantity: 1 });
      }
      updateCart();
  }

  window.updateQuantity = (index, delta) => {
      cartItems[index].quantity += delta;
      if (cartItems[index].quantity <= 0) {
          cartItems.splice(index, 1);
      }
      updateCart();
  }

  document.querySelectorAll(".btn").forEach(button => {
      button.addEventListener("click", () => {
          const name = button.parentElement.querySelector("h3").textContent;
          const price = parseFloat(button.parentElement.querySelector("span").textContent.replace('$', ''));
          addToCart(name, price);
      });
  });
});