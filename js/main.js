/* ============================================
   Main JavaScript
   GSAP + ScrollTrigger + SplitType + Lenis
   Nav, smooth scroll, animations, accordions
   ============================================ */

(function () {
  'use strict';

  gsap.registerPlugin(ScrollTrigger);

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----------------------------------------
     Lenis Smooth Scroll
     ---------------------------------------- */
  if (!prefersReducedMotion && typeof Lenis !== 'undefined') {
    var lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  /* ----------------------------------------
     Sticky Navigation
     ---------------------------------------- */
  var siteNav = document.getElementById('site-nav');
  var heroSection = document.getElementById('hero');

  if (heroSection && siteNav) {
    ScrollTrigger.create({
      trigger: heroSection,
      start: 'bottom top',
      onEnter: function () { siteNav.classList.add('visible'); },
      onLeaveBack: function () { siteNav.classList.remove('visible'); }
    });
  }

  /* ----------------------------------------
     Active Nav Highlighting
     ---------------------------------------- */
  document.querySelectorAll('section[id]').forEach(function (section) {
    ScrollTrigger.create({
      trigger: section,
      start: 'top center',
      end: 'bottom center',
      onToggle: function (self) {
        if (self.isActive) {
          document.querySelectorAll('.nav-links a').forEach(function (a) {
            a.classList.remove('active');
          });
          var link = document.querySelector('.nav-links a[href="#' + section.id + '"]');
          if (link) link.classList.add('active');
        }
      }
    });
  });

  /* ----------------------------------------
     Scroll Progress
     ---------------------------------------- */
  gsap.to('.scroll-progress', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true
    }
  });

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
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* ----------------------------------------
     Smooth Scroll (for non-Lenis fallback)
     ---------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (!target) return;

      if (typeof lenis !== 'undefined') {
        e.preventDefault();
        lenis.scrollTo(target, { offset: -parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || -56 });
      }
    });
  });

  /* ----------------------------------------
     GSAP Animations (skip if reduced motion)
     ---------------------------------------- */
  if (!prefersReducedMotion) {

    /* --- Hero Text Reveal --- */
    if (typeof SplitType !== 'undefined') {
      var heroHeadline = new SplitType('.hero-headline', { types: 'words' });

      gsap.set('.hero-name', { opacity: 0, y: 20 });
      gsap.set(heroHeadline.words, { opacity: 0, y: 40 });
      gsap.set('.hero-subheadline', { opacity: 0, y: 20 });
      gsap.set('.hero-actions', { opacity: 0, y: 20 });

      var heroTl = gsap.timeline({ delay: 0.2 });
      heroTl
        .to('.hero-name', { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
        .to(heroHeadline.words, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.04 }, '-=0.2')
        .to('.hero-subheadline', { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3')
        .to('.hero-actions', { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.2');
    }

    /* --- Hero Photo Parallax (desktop only) --- */
    if (window.innerWidth >= 768) {
      gsap.to('.hero-headshot', {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      /* Ambient gradient shift */
      gsap.to('.hero::before', {
        y: 60,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    /* --- Section Labels Reveal --- */
    gsap.utils.toArray('.section-label').forEach(function (label) {
      gsap.from(label, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: label,
          start: 'top 85%'
        }
      });
    });

    /* --- Section Intro Line Reveal --- */
    if (typeof SplitType !== 'undefined') {
      var introText = new SplitType('.section-intro', { types: 'lines' });
      gsap.from(introText.lines, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.section-intro',
          start: 'top 85%'
        }
      });
    }

    /* --- Project Cards Stagger --- */
    gsap.from('.project-card', {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.15,
      scrollTrigger: {
        trigger: '.project-cards',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

    /* --- About Photo Reveal --- */
    gsap.from('.about-headshot', {
      clipPath: 'inset(100% 0 0 0)',
      duration: 1,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: '.about-photo',
        start: 'top 75%'
      }
    });

    /* --- About Paragraph Stagger --- */
    gsap.from('.about-text p', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.about-text',
        start: 'top 80%'
      }
    });

    /* --- Quote Reveal --- */
    var quoteTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.recommendation',
        start: 'top 80%'
      }
    });
    quoteTl
      .from('.recommendation', { borderLeftColor: 'transparent', duration: 0.4, ease: 'power2.out' })
      .from('.recommendation p', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.1')
      .from('.recommendation cite', { y: 10, opacity: 0, duration: 0.4, ease: 'power2.out' }, '-=0.3');

    /* --- Contact Headline Character Reveal --- */
    if (typeof SplitType !== 'undefined') {
      var contactTitle = new SplitType('.contact-headline', { types: 'chars' });
      gsap.from(contactTitle.chars, {
        y: 50,
        opacity: 0,
        rotateX: -40,
        duration: 0.6,
        stagger: 0.03,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact',
          start: 'top 70%'
        }
      });
    }

    /* --- Contact Elements Stagger --- */
    gsap.from('.contact-subtext', {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.contact-content', start: 'top 75%' }
    });
    gsap.from('.contact-email', {
      y: 20,
      opacity: 0,
      duration: 0.5,
      delay: 0.1,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.contact-content', start: 'top 75%' }
    });
    gsap.from('.contact-links', {
      y: 20,
      opacity: 0,
      duration: 0.5,
      delay: 0.2,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.contact-content', start: 'top 75%' }
    });

  } /* end !prefersReducedMotion */

  /* ----------------------------------------
     Accordion Cards (GSAP-powered)
     ---------------------------------------- */
  var cardToggles = document.querySelectorAll('.card-toggle');

  cardToggles.forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      var card = this.closest('.project-card');
      var expanded = card.querySelector('.card-expanded');
      var isOpen = card.classList.contains('expanded');

      // Close all other open cards
      document.querySelectorAll('.project-card.expanded').forEach(function (openCard) {
        if (openCard !== card) {
          var openExpanded = openCard.querySelector('.card-expanded');
          openCard.classList.remove('expanded');
          openCard.querySelector('.card-toggle').setAttribute('aria-expanded', 'false');
          openExpanded.setAttribute('aria-hidden', 'true');
          gsap.to(openExpanded, {
            height: 0,
            duration: prefersReducedMotion ? 0 : 0.4,
            ease: 'power2.inOut',
            onComplete: function () { openExpanded.style.overflow = 'hidden'; }
          });
        }
      });

      if (isOpen) {
        card.classList.remove('expanded');
        this.setAttribute('aria-expanded', 'false');
        expanded.setAttribute('aria-hidden', 'true');
        gsap.to(expanded, {
          height: 0,
          duration: prefersReducedMotion ? 0 : 0.4,
          ease: 'power2.inOut',
          onComplete: function () {
            expanded.style.overflow = 'hidden';
            ScrollTrigger.refresh();
          }
        });
      } else {
        card.classList.add('expanded');
        this.setAttribute('aria-expanded', 'true');
        expanded.setAttribute('aria-hidden', 'false');
        expanded.style.overflow = 'hidden';
        gsap.to(expanded, {
          height: 'auto',
          duration: prefersReducedMotion ? 0 : 0.5,
          ease: 'power2.inOut',
          onComplete: function () {
            expanded.style.overflow = 'visible';
            ScrollTrigger.refresh();
          }
        });
      }
    });
  });

})();
