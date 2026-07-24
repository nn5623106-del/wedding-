/* ==========================================================================
   LUXURY WEDDING INVITATION — SCRIPT
   Pure vanilla JS, no dependencies.
   To change the wedding date/time, edit WEDDING_DATE below.
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------
     CONFIG — edit these to customize
     ------------------------------------------------------------------ */
  var WEDDING_DATE = new Date('2026-10-24T16:30:00');

  /* ------------------------------------------------------------------
     PREMIUM LOADER
     ------------------------------------------------------------------ */
  window.addEventListener('load', function () {
    var loader = document.getElementById('loader');
    setTimeout(function () {
      loader.classList.add('is-hidden');
    }, 1600);
  });

  /* ------------------------------------------------------------------
     NAV: scroll state + mobile menu
     ------------------------------------------------------------------ */
  var nav = document.getElementById('siteNav');
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  function onScrollNav() {
    if (window.scrollY > 40) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  }
  window.addEventListener('scroll', onScrollNav, { passive: true });
  onScrollNav();

  navToggle.addEventListener('click', function () {
    var isOpen = navLinks.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('[data-nav]').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ------------------------------------------------------------------
     COUNTDOWN TIMER
     ------------------------------------------------------------------ */
  var elDays = document.getElementById('cd-days');
  var elHours = document.getElementById('cd-hours');
  var elMins = document.getElementById('cd-mins');
  var elSecs = document.getElementById('cd-secs');

  function pad(n) { return String(n).padStart(2, '0'); }

  function updateCountdown() {
    var now = new Date();
    var diff = WEDDING_DATE - now;

    if (diff <= 0) {
      elDays.textContent = '00';
      elHours.textContent = '00';
      elMins.textContent = '00';
      elSecs.textContent = '00';
      return;
    }

    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    var mins = Math.floor((diff / (1000 * 60)) % 60);
    var secs = Math.floor((diff / 1000) % 60);

    elDays.textContent = pad(days);
    elHours.textContent = pad(hours);
    elMins.textContent = pad(mins);
    elSecs.textContent = pad(secs);
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ------------------------------------------------------------------
     SCROLL REVEAL (IntersectionObserver)
     ------------------------------------------------------------------ */
  var revealTargets = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealTargets.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ------------------------------------------------------------------
     TIMELINE PROGRESS FILL (fills the vertical line as user scrolls the section)
     ------------------------------------------------------------------ */
  var timelineSection = document.getElementById('story');
  var timelineFill = document.getElementById('timelineFill');

  function updateTimelineFill() {
    if (!timelineSection || !timelineFill) return;
    var rect = timelineSection.getBoundingClientRect();
    var vh = window.innerHeight;
    var total = rect.height + vh * 0.5;
    var scrolled = vh * 0.8 - rect.top;
    var pct = Math.max(0, Math.min(1, scrolled / total));
    timelineFill.style.height = (pct * 100) + '%';
  }
  window.addEventListener('scroll', updateTimelineFill, { passive: true });
  window.addEventListener('resize', updateTimelineFill);
  updateTimelineFill();

  /* ------------------------------------------------------------------
     PARALLAX on hero botanical decorations
     ------------------------------------------------------------------ */
  var botanicalLeft = document.getElementById('botanicalLeft');
  var botanicalRight = document.getElementById('botanicalRight');
  var heroSunlight = document.querySelector('.hero-sunlight');

  function updateParallax() {
    var y = window.scrollY;
    if (y < window.innerHeight * 1.2) {
      if (botanicalLeft) botanicalLeft.style.transform = 'translateY(' + (y * 0.18) + 'px)';
      if (botanicalRight) botanicalRight.style.transform = 'translateY(' + (y * 0.12) + 'px)';
      if (heroSunlight) heroSunlight.style.transform = 'translate(-50%, ' + (y * 0.25) + 'px)';
    }
  }
  window.addEventListener('scroll', updateParallax, { passive: true });

  /* ------------------------------------------------------------------
     GLOWING PARTICLES (ambient, CSS-driven, spawned via JS)
     ------------------------------------------------------------------ */
  var particleHost = document.getElementById('glowParticles');
  var PARTICLE_COUNT = window.innerWidth < 700 ? 10 : 20;

  function spawnParticle() {
    var p = document.createElement('span');
    p.className = 'glow-particle';
    var startX = Math.random() * 100;
    var duration = 10 + Math.random() * 12;
    var delay = Math.random() * 6;
    var size = 3 + Math.random() * 4;
    p.style.left = startX + 'vw';
    p.style.bottom = '-10px';
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.animationDuration = duration + 's';
    p.style.animationDelay = delay + 's';
    particleHost.appendChild(p);
  }
  for (var i = 0; i < PARTICLE_COUNT; i++) spawnParticle();

  /* ------------------------------------------------------------------
     FLOATING PETALS (canvas)
     ------------------------------------------------------------------ */
  var canvas = document.getElementById('petal-canvas');
  var ctx = canvas.getContext('2d');
  var petals = [];
  var PETAL_COUNT = window.innerWidth < 700 ? 10 : 18;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function Petal() {
    this.reset(true);
  }
  Petal.prototype.reset = function (initial) {
    this.x = Math.random() * canvas.width;
    this.y = initial ? Math.random() * canvas.height : -20;
    this.size = 6 + Math.random() * 8;
    this.speedY = 0.35 + Math.random() * 0.6;
    this.speedX = (Math.random() - 0.5) * 0.6;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.02;
    this.sway = Math.random() * Math.PI * 2;
    this.swaySpeed = 0.006 + Math.random() * 0.01;
    var hues = ['#E9CFCB', '#F3E1D6', '#DCAFA9', '#F6EFE4'];
    this.color = hues[Math.floor(Math.random() * hues.length)];
    this.opacity = 0.55 + Math.random() * 0.35;
  };
  Petal.prototype.update = function () {
    this.sway += this.swaySpeed;
    this.x += this.speedX + Math.sin(this.sway) * 0.5;
    this.y += this.speedY;
    this.rotation += this.rotationSpeed;
    if (this.y > canvas.height + 20) this.reset(false);
    if (this.x > canvas.width + 20) this.x = -20;
    if (this.x < -20) this.x = canvas.width + 20;
  };
  Petal.prototype.draw = function () {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    // simple petal shape: an ellipse pinched at one end
    ctx.moveTo(0, -this.size / 2);
    ctx.quadraticCurveTo(this.size / 2, 0, 0, this.size / 2);
    ctx.quadraticCurveTo(-this.size / 2, 0, 0, -this.size / 2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };

  if (!reducedMotion) {
    for (var j = 0; j < PETAL_COUNT; j++) petals.push(new Petal());

    function animatePetals() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach(function (p) { p.update(); p.draw(); });
      requestAnimationFrame(animatePetals);
    }
    requestAnimationFrame(animatePetals);
  }

  /* ------------------------------------------------------------------
     BACKGROUND MUSIC TOGGLE
     ------------------------------------------------------------------ */
  var music = document.getElementById('bgMusic');
  var musicToggle = document.getElementById('musicToggle');

  musicToggle.addEventListener('click', function () {
    if (music.paused) {
      music.play().catch(function () {
        /* Autoplay-policy or missing file: fail silently, keep UI in sync */
      });
      musicToggle.classList.add('is-playing');
      musicToggle.setAttribute('aria-pressed', 'true');
      musicToggle.setAttribute('aria-label', 'Pause background music');
    } else {
      music.pause();
      musicToggle.classList.remove('is-playing');
      musicToggle.setAttribute('aria-pressed', 'false');
      musicToggle.setAttribute('aria-label', 'Play background music');
    }
  });

  /* ------------------------------------------------------------------
     GALLERY LIGHTBOX
     ------------------------------------------------------------------ */
  var galleryItems = Array.prototype.slice.call(document.querySelectorAll('.gallery-item'));
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxClose = document.getElementById('lightboxClose');
  var lightboxPrev = document.getElementById('lightboxPrev');
  var lightboxNext = document.getElementById('lightboxNext');
  var currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    var src = galleryItems[index].getAttribute('data-full');
    lightboxImg.src = src;
    lightboxImg.alt = 'Wedding photo ' + (index + 1);
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  function showRelative(delta) {
    currentIndex = (currentIndex + delta + galleryItems.length) % galleryItems.length;
    openLightbox(currentIndex);
  }

  galleryItems.forEach(function (item, index) {
    item.addEventListener('click', function () { openLightbox(index); });
  });
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', function () { showRelative(-1); });
  lightboxNext.addEventListener('click', function () { showRelative(1); });
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showRelative(-1);
    if (e.key === 'ArrowRight') showRelative(1);
  });

  /* ------------------------------------------------------------------
     RSVP FORM (client-side only — wire up to your own backend/email
     service by replacing the body of handleSubmit)
     ------------------------------------------------------------------ */
  var rsvpForm = document.getElementById('rsvpForm');
  var formStatus = document.getElementById('formStatus');
  var guestsRow = document.getElementById('guestsRow');

  document.querySelectorAll('input[name="attending"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
      var declining = this.value === 'regretfully-decline';
      guestsRow.style.display = declining ? 'none' : 'flex';
    });
  });

  rsvpForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var name = document.getElementById('fullName').value.trim();
    var email = document.getElementById('email').value.trim();

    if (!name || !email) {
      formStatus.textContent = 'Please fill in your name and email.';
      formStatus.style.color = '#B8934F';
      return;
    }

    // NOTE: This is a front-end-only demo. To actually receive RSVPs,
    // connect this to a form backend (e.g. Formspree, Netlify Forms,
    // Google Sheets via Apps Script) and send the form data there.
    formStatus.textContent = 'Thank you, ' + name.split(' ')[0] + ' — your RSVP has been received with love.';
    formStatus.style.color = '#B8934F';
    rsvpForm.reset();
    guestsRow.style.display = 'flex';
  });

})();
