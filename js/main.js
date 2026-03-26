/* ============================================
   Main JavaScript
   Nav, smooth scroll, AOS init, counters, accordions
   ============================================ */

(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----------------------------------------
     AOS Initialization
     ---------------------------------------- */
  if (!prefersReducedMotion && typeof AOS !== 'undefined') {
    AOS.init({
      duration: 400,
      once: true,
      easing: 'ease-out',
      offset: 80
    });
  } else {
    // Make all AOS elements visible immediately
    var aosEls = document.querySelectorAll('[data-aos]');
    for (var i = 0; i < aosEls.length; i++) {
      aosEls[i].removeAttribute('data-aos');
      aosEls[i].removeAttribute('data-aos-delay');
    }
  }

  /* ----------------------------------------
     Sticky Navigation
     ---------------------------------------- */
  var siteNav = document.getElementById('site-nav');
  var heroSection = document.getElementById('hero');

  if (heroSection && siteNav) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          siteNav.classList.remove('visible');
        } else {
          siteNav.classList.add('visible');
        }
      });
    }, {
      threshold: 0,
      rootMargin: '-1px 0px 0px 0px'
    });

    navObserver.observe(heroSection);
  }

  /* ----------------------------------------
     Mobile Menu
     ---------------------------------------- */
  var hamburger = document.querySelector('.hamburger');
  var mobileOverlay = document.getElementById('mobile-nav');
  var mobileClose = document.querySelector('.mobile-nav-close');
  var mobileLinks = document.querySelectorAll('.mobile-nav-links a');

  function openMobileMenu() {
    mobileOverlay.classList.add('open');
    mobileOverlay.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    mobileClose.focus();
  }

  function closeMobileMenu() {
    mobileOverlay.classList.remove('open');
    mobileOverlay.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    hamburger.focus();
  }

  if (hamburger && mobileOverlay && mobileClose) {
    hamburger.addEventListener('click', openMobileMenu);
    mobileClose.addEventListener('click', closeMobileMenu);

    for (var j = 0; j < mobileLinks.length; j++) {
      mobileLinks[j].addEventListener('click', closeMobileMenu);
    }

    // Trap focus inside mobile nav overlay
    mobileOverlay.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeMobileMenu();
        return;
      }

      if (e.key !== 'Tab') return;

      var focusable = mobileOverlay.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
      if (focusable.length === 0) return;

      var first = focusable[0];
      var last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  /* ----------------------------------------
     Smooth Scroll Fallback
     ---------------------------------------- */
  var scrollLinks = document.querySelectorAll('a[href^="#"]');

  for (var k = 0; k < scrollLinks.length; k++) {
    scrollLinks[k].addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (!target) return;

      // Let CSS scroll-behavior: smooth handle it when supported
      if ('scrollBehavior' in document.documentElement.style) return;

      e.preventDefault();
      var navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 56;
      var top = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  }

  /* ----------------------------------------
     Accordion Cards
     ---------------------------------------- */
  var cardToggles = document.querySelectorAll('.card-toggle');

  for (var m = 0; m < cardToggles.length; m++) {
    cardToggles[m].addEventListener('click', function () {
      var card = this.closest('.project-card');
      var expanded = card.querySelector('.card-expanded');
      var isOpen = card.classList.contains('expanded');

      // Close all other open cards
      var allCards = document.querySelectorAll('.project-card.expanded');
      for (var n = 0; n < allCards.length; n++) {
        if (allCards[n] !== card) {
          allCards[n].classList.remove('expanded');
          allCards[n].querySelector('.card-toggle').setAttribute('aria-expanded', 'false');
          allCards[n].querySelector('.card-expanded').setAttribute('aria-hidden', 'true');
        }
      }

      // Toggle current card
      if (isOpen) {
        card.classList.remove('expanded');
        this.setAttribute('aria-expanded', 'false');
        expanded.setAttribute('aria-hidden', 'true');
      } else {
        card.classList.add('expanded');
        this.setAttribute('aria-expanded', 'true');
        expanded.setAttribute('aria-hidden', 'false');
      }
    });
  }

})();
