/* ══════════════════════════════════════════════════════════════
   TOTALPLAY · Santiago González — Asesor independiente
   main.js — loader, animaciones, partículas, formulario WhatsApp
   ══════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const WA_PHONE = '527773401844';

  /* ── Utilidades ─────────────────────────────────────────── */
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  /* ══════════════════════════════════════════════════════════
     LOADER
     ══════════════════════════════════════════════════════════ */
  function initLoader () {
    const loader = $('#loader');
    const fill = $('.loader-bar-fill');
    const hero = $('#hero');
    document.body.classList.add('is-loading');

    let progress = 0;
    const minDuration = 2200; // no debe sentirse instantáneo
    const start = performance.now();

    function tick (now) {
      const elapsed = now - start;
      const target = clamp((elapsed / minDuration) * 100, 0, 96);
      progress += (target - progress) * 0.18;
      if (fill) fill.style.width = progress.toFixed(1) + '%';
      if (elapsed < minDuration) {
        requestAnimationFrame(tick);
      } else {
        finish();
      }
    }

    function finish () {
      if (fill) fill.style.width = '100%';
      setTimeout(() => {
        loader.classList.add('is-hidden');
        document.body.classList.remove('is-loading');
        if (hero) hero.classList.add('loaded');
        initHeroTitle();
        setTimeout(() => loader.remove(), 1300);
      }, 220);
    }

    if (document.readyState === 'complete') {
      requestAnimationFrame(tick);
    } else {
      window.addEventListener('load', () => requestAnimationFrame(tick));
      // fallback por si 'load' tarda demasiado (imágenes pesadas, red lenta)
      setTimeout(() => requestAnimationFrame(tick), 400);
    }
  }

  /* ══════════════════════════════════════════════════════════
     NAVBAR + MENÚ MÓVIL
     ══════════════════════════════════════════════════════════ */
  function initNavbar () {
    const navbar = $('#navbar');
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const hamburger = $('#hamburger');
    const mobMenu = $('#mob-menu');
    const toggleMenu = (open) => {
      const isOpen = open ?? !hamburger.classList.contains('active');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      mobMenu.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };
    hamburger.addEventListener('click', () => toggleMenu());
    $$('#mob-menu a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));
  }

  /* ══════════════════════════════════════════════════════════
     REVEAL ON SCROLL
     ══════════════════════════════════════════════════════════ */
  function initReveal () {
    const items = $$('.reveal');
    if (!('IntersectionObserver' in window) || reduceMotion) {
      items.forEach(el => el.classList.add('in-view'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -60px 0px' });
    items.forEach(el => io.observe(el));
  }

  /* ══════════════════════════════════════════════════════════
     HERO — typewriter + gradiente letra por letra
     ══════════════════════════════════════════════════════════ */
  function initHeroTitle () {
    const spans = $$('#hero-heading .line > span');
    if (!spans.length) return;

    const makeChar = (ch, isAccent, globalIndex) => {
      const charEl = document.createElement('span');
      charEl.className = 'char';
      charEl.textContent = ch;
      if (isAccent) {
        charEl.classList.add('accent-char');
        charEl.style.animationDelay = (-globalIndex * 0.18) + 's';
      }
      const delay = globalIndex * 34;
      charEl.style.transition = `opacity .5s var(--ease) ${delay}ms, transform .5s var(--ease) ${delay}ms`;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          charEl.style.opacity = '1';
          charEl.style.transform = 'translateY(0) rotate(0)';
        });
      });
      return charEl;
    };

    let globalIndex = 0;
    spans.forEach((span) => {
      const isAccent = span.classList.contains('accent');
      const text = span.textContent;
      span.textContent = '';
      // Se separa por palabras para no romper el ajuste natural de línea:
      // cada palabra queda en su propio inline-block (nunca se parte a
      // media palabra), y los espacios se insertan como texto real para
      // que el navegador conserve los puntos de quiebre entre palabras.
      text.split(/(\s+)/).forEach((token) => {
        if (token === '') return;
        if (/^\s+$/.test(token)) {
          span.appendChild(document.createTextNode(token));
          globalIndex += token.length;
          return;
        }
        const wordEl = document.createElement('span');
        wordEl.className = 'word';
        Array.from(token).forEach((ch) => {
          wordEl.appendChild(makeChar(ch, isAccent, globalIndex));
          globalIndex++;
        });
        span.appendChild(wordEl);
      });
    });
  }

  /* ══════════════════════════════════════════════════════════
     PARALLAX — fondos "fijos" con movimiento sutil
     ══════════════════════════════════════════════════════════ */
  function initParallax () {
    const layers = $$('.hero-bg img, .bg-layer img');
    if (!layers.length || reduceMotion) return;

    let ticking = false;
    function update () {
      const vh = window.innerHeight;
      layers.forEach((img) => {
        const wrap = img.closest('.hero-bg, .bg-layer');
        const rect = wrap.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) return;
        const progress = (rect.top) / vh; // -1..1 aprox
        const shift = progress * 46;
        img.style.transform = `translateY(${shift.toFixed(1)}px) scale(1.12)`;
      });
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* ══════════════════════════════════════════════════════════
     PARTÍCULAS — canvas constelación (hero + secciones)
     ══════════════════════════════════════════════════════════ */
  const BRAND_COLORS = ['#f04e99', '#8147ae', '#56caeb', '#ffc03f', '#dce443'];

  class ParticleField {
    constructor (canvas, opts = {}) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.count = opts.count ?? 60;
      this.link = opts.link ?? false;
      this.linkDist = opts.linkDist ?? 130;
      this.speed = opts.speed ?? 0.25;
      this.maxR = opts.maxR ?? 2.2;
      this.particles = [];
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.resize = this.resize.bind(this);
      this.loop = this.loop.bind(this);
      this.resize();
      this.build();
      window.addEventListener('resize', this.resize);
      if (!reduceMotion) requestAnimationFrame(this.loop);
    }
    resize () {
      const rect = this.canvas.getBoundingClientRect();
      this.w = rect.width; this.h = rect.height;
      this.canvas.width = this.w * this.dpr;
      this.canvas.height = this.h * this.dpr;
      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    }
    build () {
      this.particles = Array.from({ length: this.count }, () => ({
        x: Math.random() * this.w,
        y: Math.random() * this.h,
        vx: (Math.random() - 0.5) * this.speed,
        vy: (Math.random() - 0.5) * this.speed - 0.06,
        r: Math.random() * this.maxR + 0.6,
        c: BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)],
        a: Math.random() * 0.5 + 0.3
      }));
    }
    loop () {
      const { ctx, w, h, particles } = this;
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -10) p.x = w + 10; if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10; if (p.y > h + 10) p.y = -10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c;
        ctx.globalAlpha = p.a;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      if (this.link) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i], b = particles[j];
            const dx = a.x - b.x, dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < this.linkDist) {
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = 'rgba(240,78,153,' + (0.14 * (1 - dist / this.linkDist)) + ')';
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }
      }
      requestAnimationFrame(this.loop);
    }
  }

  function initParticles () {
    if (reduceMotion) return;
    const hero = $('#hero-canvas');
    if (hero) new ParticleField(hero, { count: 70, link: true, linkDist: 140, speed: 0.28, maxR: 2.2 });

    const secondary = $$('.section-canvas');
    secondary.forEach(c => new ParticleField(c, { count: 26, link: false, speed: 0.16, maxR: 1.8 }));
  }

  /* ══════════════════════════════════════════════════════════
     STAT COUNTERS
     ══════════════════════════════════════════════════════════ */
  function initCounters () {
    const nums = $$('.stat-num[data-count]');
    if (!nums.length) return;

    const animate = (el) => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const duration = 1600;
      const start = performance.now();
      function step (now) {
        const p = clamp((now - start) / duration, 0, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = Math.round(target * eased);
        el.textContent = val.toLocaleString('es-MX') + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    };

    if (!('IntersectionObserver' in window) || reduceMotion) {
      nums.forEach(animate);
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { animate(entry.target); io.unobserve(entry.target); }
      });
    }, { threshold: 0.5 });
    nums.forEach(el => io.observe(el));
  }

  /* ══════════════════════════════════════════════════════════
     FAQ ACCORDION
     ══════════════════════════════════════════════════════════ */
  function initFaq () {
    $$('.faq-item').forEach((item) => {
      const q = $('.faq-q', item);
      const a = $('.faq-a', item);
      q.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        item.classList.toggle('open', !isOpen);
        a.style.maxHeight = !isOpen ? a.scrollHeight + 'px' : '0px';
      });
    });
  }

  /* ══════════════════════════════════════════════════════════
     FORMULARIO → WHATSAPP
     ══════════════════════════════════════════════════════════ */
  function initWhatsAppForm () {
    const form = $('#wa-form');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = $('#f-name', form).value.trim();
      const interest = $('#f-interest', form).value;
      const msg = $('#f-msg', form).value.trim();

      let text = `Hola, soy ${name || 'un cliente interesado'}. `;
      text += `Me interesa: ${interest}. `;
      if (msg) text += `Detalles: ${msg}`;

      const url = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

  /* ══════════════════════════════════════════════════════════
     BOTÓN FLOTANTE WHATSAPP
     ══════════════════════════════════════════════════════════ */
  function initFloatingWa () {
    const btn = $('.wa-btn');
    if (!btn) return;
    const reveal = () => { if (window.scrollY > 260) btn.classList.add('show'); };
    setTimeout(reveal, 2600);
    window.addEventListener('scroll', reveal, { passive: true });
  }

  /* ══════════════════════════════════════════════════════════
     FOOTER YEAR
     ══════════════════════════════════════════════════════════ */
  function initYear () {
    const y = $('#year');
    if (y) y.textContent = new Date().getFullYear();
  }

  /* ══════════════════════════════════════════════════════════
     INIT
     ══════════════════════════════════════════════════════════ */
  document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initNavbar();
    initReveal();
    initParallax();
    initParticles();
    initCounters();
    initFaq();
    initWhatsAppForm();
    initFloatingWa();
    initYear();
  });
})();
