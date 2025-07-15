document.addEventListener('DOMContentLoaded', function () {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
});

document.querySelectorAll('.scroll-image_text-block__buttons .text-block_button_white').forEach(button => {
  button.addEventListener('click', () => {

    document.querySelectorAll('.scroll-image_text-block__buttons .text-block_button_white').forEach(btn => {
      btn.classList.remove('active');
    });

    button.classList.add('active');
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const burger = document.getElementById('burger');
  const nav = document.querySelector('.header-navigation');

  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    nav.classList.toggle('active');
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.navigation-list li');
  const logo = document.querySelector('.header-logo');

  function setActiveLink() {
    const currentUrl = window.location.href;

    navLinks.forEach(link => {
      const linkHref = new URL(link.closest('a').href, window.location.origin).href;

      if (currentUrl === linkHref) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  setActiveLink();

  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      navLinks.forEach(li => li.classList.remove('active'));

      this.classList.add('active');
    });
  });

  if (logo) {
    logo.addEventListener('click', function () {
      navLinks.forEach(li => li.classList.remove('active'));
    });
  }
});

const phoneInput = document.querySelector("input[name='phone']");
const maskOptions = {
  mask: '+{7}(000)000-00-00'
};
const phoneMask = IMask(phoneInput, maskOptions);

document.getElementById("submitBtn").addEventListener("click", function () {
  const inputs = document.querySelectorAll(".scroll-image_text-block__inputs input");
  const errorDiv = document.getElementById("errorMessages");
  let errors = [];

  errorDiv.innerHTML = "";
  inputs.forEach(input => input.classList.remove("error"));

  inputs.forEach(input => {
    const value = input.value.trim();
    const name = input.getAttribute("name");

    if (!value || (name === 'phone' && value === '+7()___-__-__')) {
      errors.push(`Поле "${input.placeholder}" не может быть пустым.`);
      input.classList.add("error");
    }

    if (name === 'phone') {
      const unmaskedValue = phoneMask.unmaskedValue;
      if (unmaskedValue.length < 10) {
        errors.push("Введите корректный телефон (минимум 10 цифр).");
        input.classList.add("error");
      }
    }
  });

  if (errors.length > 0) {
    errorDiv.innerHTML = "<ul><li>" + errors.join("</li><li>") + "</li></ul>";
  } else {

  }
});


document.addEventListener("DOMContentLoaded", function () {
  // Получаем элементы
  const modalOverlay = document.getElementById('modalOverlay');
  const openButtons = document.querySelectorAll('.open-modal-btn');
  const closeBtn = document.getElementById('closeModalBtn');

  openButtons.forEach(button => {
    button.addEventListener('click', () => {
      modalOverlay.style.display = 'flex';
    });
  });

  closeBtn.addEventListener('click', () => {
    modalOverlay.style.display = 'none';
  });

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.style.display = 'none';
    }
  });
});