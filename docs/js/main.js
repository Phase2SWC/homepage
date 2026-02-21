/* ============================================================
   Phase 2 – Software Development Consulting
   main.js
   ============================================================ */

(function () {
  'use strict';

  /* ── 1. Nav scroll class toggle ──────────────────────────── */
  var nav = document.querySelector('.nav');

  function updateNav() {
    if (!nav) return;
    if (window.scrollY > 60) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav(); // run once on load


  /* ── 2. Smooth scroll with fixed-nav offset ──────────────── */
  var NAV_HEIGHT = 68; // matches --nav-height CSS var

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      var top = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;

      window.scrollTo({ top: top, behavior: 'smooth' });

      // Close mobile menu if open
      closeMobileMenu();
    });
  });


  /* ── 3. Hamburger / mobile menu ──────────────────────────── */
  var hamburger  = document.querySelector('.nav__hamburger');
  var mobileMenu = document.querySelector('.nav__mobile-menu');

  function closeMobileMenu() {
    if (!hamburger || !mobileMenu) return;
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('is-open');
  }

  function openMobileMenu() {
    if (!hamburger || !mobileMenu) return;
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('is-open');
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      var isOpen = this.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (
        mobileMenu.classList.contains('is-open') &&
        !nav.contains(e.target)
      ) {
        closeMobileMenu();
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeMobileMenu();
      }
    });
  }


  /* ── 4. IntersectionObserver reveal animation ────────────── */
  if (!('IntersectionObserver' in window)) {
    // Graceful degradation: just make everything visible
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
    return;
  }

  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
  });

})();
