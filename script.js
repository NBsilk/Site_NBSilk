(function () {
  'use strict';
  var doc = document;
  var root = doc.documentElement;

  function ready(fn) {
    if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  ready(function () {
    root.setAttribute('data-ready', '1');

    // Ano no rodapé
    var year = doc.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    // Menu mobile
    var toggle = doc.getElementById('menuToggle');
    var menu = doc.getElementById('menu');
    function setMenu(open) {
      if (!toggle || !menu) return;
      menu.classList.toggle('open', open);
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    }
    if (toggle && menu) {
      toggle.addEventListener('click', function () {
        setMenu(!menu.classList.contains('open'));
      });
      var links = menu.getElementsByTagName('a');
      for (var i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function () { setMenu(false); });
      }
      doc.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' || e.keyCode === 27) setMenu(false);
      });
      window.addEventListener('resize', function () {
        if (window.innerWidth > 800) setMenu(false);
      });
    }

    // Barra de progresso + header ao rolar
    var header = doc.getElementById('header');
    var progress = doc.getElementById('progress');
    var ticking = false;
    function onScroll() {
      var y = window.pageYOffset || root.scrollTop || 0;
      var h = Math.max(root.scrollHeight - window.innerHeight, 1);
      if (header) {
        if (y > 20) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
      }
      if (progress) progress.style.width = Math.min(100, (y / h) * 100) + '%';
      ticking = false;
    }
    function requestTick() {
      if (ticking) return;
      ticking = true;
      (window.requestAnimationFrame || function (cb) { return setTimeout(cb, 16); })(onScroll);
    }
    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', requestTick);
    onScroll();

    // Animação de entrada (com fallback se não houver IntersectionObserver)
    var items = doc.querySelectorAll('.reveal');
    var k;
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      for (k = 0; k < items.length; k++) io.observe(items[k]);
    } else {
      for (k = 0; k < items.length; k++) items[k].classList.add('visible');
    }

    // Item ativo do menu conforme a seção visível
    var navLinks = doc.querySelectorAll('.menu a[href^="#"]');
    var sections = [];
    for (k = 0; k < navLinks.length; k++) {
      var id = navLinks[k].getAttribute('href').slice(1);
      var sec = doc.getElementById(id);
      if (sec && !navLinks[k].classList.contains('nav-cta')) sections.push({ el: sec, link: navLinks[k] });
    }
    function updateActive() {
      var pos = (window.pageYOffset || root.scrollTop || 0) + 140;
      var current = sections[0];
      for (var s = 0; s < sections.length; s++) {
        if (sections[s].el.offsetTop <= pos) current = sections[s];
      }
      for (var n = 0; n < sections.length; n++) sections[n].link.classList.remove('active');
      if (current) current.link.classList.add('active');
    }
    window.addEventListener('scroll', updateActive, { passive: true });
    updateActive();
  });
})();