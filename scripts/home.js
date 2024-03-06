const headerEl = document.querySelector('.main-header');
const faqGroup = document.querySelectorAll('.faq-group');
const mobileBtn = document.querySelector('.js-mobile-btn');
const faqGroupBody = document.querySelectorAll('.faq-group');
const navLinks = document.querySelectorAll('.nav-link');
let yPos = scrollY;

document.addEventListener('scroll', () => {
  yPos = scrollY;
  if (yPos > 60) {
    headerEl.classList.add('on-scroll');
  } else {
    headerEl.classList.remove('on-scroll');
  }
})

if (yPos > 60) {
  headerEl.classList.add('on-scroll');
} else {
  headerEl.classList.remove('on-scroll');
}

faqGroup.forEach((group) => {
  group.addEventListener('click', () => {
    const body = group.querySelector('.faq-group-body');
    const closeBtn = group.querySelector('.close-btn');
    body.classList.toggle('open');
    closeBtn.classList.toggle('rotate-btn');
  })
});


VanillaTilt.init(document.querySelectorAll(".card"), {
  max: 25,
  speed: 400,
  glare: true
});
// mobile
mobileBtn.addEventListener('click', () => {
  headerEl.classList.toggle('mobile');
  headerEl.classList.toggle('on-scroll');
})
navLinks.forEach(btn => {
  btn.addEventListener('click', () => headerEl.classList.remove('mobile'))
})
