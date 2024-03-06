const headerEl = document.querySelector('.main-header');
const faqGroup = document.querySelectorAll('.faq-group');
const faqGroupBody = document.querySelectorAll('.faq-group');
let yPos = null;

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
    faqReset();
    const body = group.querySelector('.faq-group-body');
    const closeBtn = group.querySelector('.close-btn');
    body.classList.toggle('open');
    closeBtn.classList.toggle('rotate-btn');
  })
});


function faqReset() {
  document.querySelectorAll('.faq-group-body')
    .forEach(body => {
      body.classList.remove('open');
    })
  document.querySelectorAll('.close-btn')
    .forEach(btn => {
      btn.classList.remove('rotate-btn');
    })
}


VanillaTilt.init(document.querySelectorAll(".card"), {
  max: 25,
  speed: 400,
  glare: true
});

