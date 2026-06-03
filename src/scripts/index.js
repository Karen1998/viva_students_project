import 'animate.css';
import '@styles/main.css';

const ANIMATE_CLASS = 'animate__animated';
const HIDDEN_CLASS = 'will-animate';

function staggerListItems() {
  document.querySelectorAll('.stack-section__list').forEach((ul) => {
    ul.querySelectorAll('li').forEach((li, i) => {
      li.style.animationDelay = `${i * 0.08}s`;
      li.dataset.animate = 'animate__fadeInUp';
    });
  });
}

function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-animate]');

  elements.forEach((el) => el.classList.add(HIDDEN_CLASS));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const animation = el.dataset.animate;
          el.classList.remove(HIDDEN_CLASS);
          el.classList.add(ANIMATE_CLASS, animation);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.15 },
  );

  elements.forEach((el) => observer.observe(el));
}

const init = () => {
  staggerListItems();
  initScrollAnimations();
};

document.addEventListener('DOMContentLoaded', init);

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
