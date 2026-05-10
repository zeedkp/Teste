/* ============================================================
FocusFlow – script.js
Comportamentos: nav scroll, hamburger menu, fade-in reveal,
parallax discreto em cards de produto.
Tudo vanilla JS, sem dependências.
============================================================ */

/* ─── Nav: sombra ao rolar ──────────────────────────────── */
(function initNav() {
const nav = document.getElementById(‘nav’);
if (!nav) return;

const onScroll = () => {
nav.classList.toggle(‘scrolled’, window.scrollY > 40);
};

window.addEventListener(‘scroll’, onScroll, { passive: true });
onScroll(); // estado inicial
})();

/* ─── Hamburger / Mobile menu ───────────────────────────── */
(function initHamburger() {
const btn  = document.getElementById(‘hamburger’);
const menu = document.getElementById(‘mobileMenu’);
if (!btn || !menu) return;

btn.addEventListener(‘click’, () => {
const open = menu.classList.toggle(‘open’);
btn.setAttribute(‘aria-expanded’, open);
});

// Fechar ao clicar em link do menu mobile
menu.querySelectorAll(‘a’).forEach(link => {
link.addEventListener(‘click’, () => {
menu.classList.remove(‘open’);
btn.setAttribute(‘aria-expanded’, ‘false’);
});
});
})();

/* ─── Reveal: fade-in ao entrar no viewport ─────────────── */
(function initReveal() {
const els = document.querySelectorAll(’.reveal’);
if (!els.length) return;

const observer = new IntersectionObserver(
(entries) => {
entries.forEach((entry, i) => {
if (entry.isIntersecting) {
// Delay escalonado por posição no grupo de irmãos
const siblings = Array.from(entry.target.parentElement.querySelectorAll(’.reveal’));
const index = siblings.indexOf(entry.target);
const delay = Math.min(index * 80, 400); // max 400ms de delay

```
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);

      observer.unobserve(entry.target);
    }
  });
},
{
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
}
```

);

els.forEach(el => observer.observe(el));
})();

/* ─── Parallax discreto nos cards de produto ────────────── */
(function initParallax() {
const cards = document.querySelectorAll(’[data-parallax]’);
if (!cards.length) return;

// Desativar em dispositivos touch (performance + irrelevância)
const prefersReducedMotion = window.matchMedia(’(prefers-reduced-motion: reduce)’).matches;
const isTouchDevice = ‘ontouchstart’ in window || navigator.maxTouchPoints > 0;
if (prefersReducedMotion || isTouchDevice) return;

const onScroll = () => {
const scrollY = window.scrollY;

```
cards.forEach(card => {
  const rect    = card.getBoundingClientRect();
  const factor  = parseFloat(card.dataset.parallax) || 0.05;
  const centerY = rect.top + rect.height / 2 - window.innerHeight / 2;
  const shift   = centerY * factor;

  // Aplicar apenas quando visível
  if (rect.bottom > 0 && rect.top < window.innerHeight) {
    card.style.transform = `translateY(${shift}px)`;
  }
});
```

};

window.addEventListener(‘scroll’, onScroll, { passive: true });
})();

/* ─── Smooth scroll para links âncora ───────────────────── */
(function initSmoothScroll() {
document.querySelectorAll(‘a[href^=”#”]’).forEach(anchor => {
anchor.addEventListener(‘click’, (e) => {
const targetId = anchor.getAttribute(‘href’);
if (targetId === ‘#’) return;

```
  const target = document.querySelector(targetId);
  if (!target) return;

  e.preventDefault();

  const navH   = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 68;
  const top    = target.getBoundingClientRect().top + window.scrollY - navH;

  window.scrollTo({ top, behavior: 'smooth' });
});
```

});
})();

/* ─── Animação das barras do dashboard mockup ───────────── */
(function animateDashBars() {
const bars = document.querySelectorAll(’.dash-bar-fill’);
if (!bars.length) return;

const observer = new IntersectionObserver(
(entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
// Guardar a altura alvo e animar de 0
const el = entry.target;
const targetH = el.style.height;
el.style.height = ‘0%’;

```
      requestAnimationFrame(() => {
        setTimeout(() => {
          el.style.height = targetH;
        }, 100);
      });

      observer.unobserve(el);
    }
  });
},
{ threshold: 0.5 }
```

);

bars.forEach(bar => observer.observe(bar));
})();