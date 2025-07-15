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

  // Функция для установки активного пункта
  function setActiveLink() {
    const currentUrl = window.location.href;

    navLinks.forEach(link => {
      const linkHref = new URL(link.closest('a').href, window.location.origin).href;

      // Сравниваем полные URL
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