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