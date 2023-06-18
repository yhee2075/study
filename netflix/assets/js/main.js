const moBtn = document.getElementById('moBtn');

moBtn.addEventListener('click', () => {
  const nav = document.querySelector('nav');
  nav.classList.toggle('on');
});

const list = document.querySelectorAll('nav ul li');
