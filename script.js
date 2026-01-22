document.addEventListener("DOMContentLoaded", function () {

  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  document.querySelectorAll('.scroll-image_text-block__buttons .text-block_button_white').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.scroll-image_text-block__buttons .text-block_button_white').forEach(btn => {
        btn.classList.remove('active');
      });
      button.classList.add('active');
    });
  });

  const burger = document.getElementById('burger');
  const nav = document.querySelector('.header-navigation');

  if (burger && nav) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      nav.classList.toggle('active');
    });
  }

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

  const phoneInputs = document.querySelectorAll("input[name='phone']");
  const phoneMasks = [];

  phoneInputs.forEach(input => {
    const maskOptions = {
      mask: '+{7}(000)000-00-00'
    };
    const mask = IMask(input, maskOptions);
    phoneMasks.push(mask);
  });

  const submitBtn = document.getElementById("submitBtn");
  if (submitBtn) {
    submitBtn.addEventListener("click", function () {
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
          const unmaskedValue = input._imask?.unmaskedValue;
          if (unmaskedValue && unmaskedValue.length < 10) {
            errors.push("Введите корректный телефон (минимум 10 цифр).");
            input.classList.add("error");
          }
        }
      });

      if (errors.length > 0) {
        errorDiv.innerHTML = "<ul><li>" + errors.join("</li><li>") + "</li></ul>";
      }
    });
  }

  const modalOverlay = document.getElementById('modalOverlay');
  const openButtons = document.querySelectorAll('.open-modal-btn');
  const closeBtn = document.getElementById('closeModalBtn');

  if (modalOverlay && openButtons && closeBtn) {
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
  }

  document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email')
    };

    emailjs.send('service_prcic2n', 'template_qymd0d5', data, 'TAc3O3TjZgNtm1Lg6')
      .then(function(response) {
        alert('Сообщение успешно отправлено!');
        modalOverlay.style.display = 'none';
        document.getElementById('contactForm').reset();
      }, function(error) {
        alert('Ошибка при отправке: ' + JSON.stringify(error));
      });
  });
});