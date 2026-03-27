/* ============================================
   Main JavaScript
   GSAP + ScrollTrigger + SplitType + Lenis + D3
   ============================================ */

(function () {
  'use strict';

  gsap.registerPlugin(ScrollTrigger);

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----------------------------------------
     Journey Data
     ---------------------------------------- */
  var journeyStops = [
    { city: 'Hamburg', country: 'Germany', lat: 53.55, lng: 9.99, label: 'Born', age: '0' },
    { city: 'Düsseldorf', country: 'Germany', lat: 51.23, lng: 6.78, label: 'Early childhood', age: '1–8' },
    { city: 'Cape Town', country: 'South Africa', lat: -33.92, lng: 18.42, label: 'Six years in South Africa', age: '9–14' },
    { city: 'New York City', country: 'USA', lat: 40.71, lng: -74.01, label: 'The Browning School, 8th grade', age: '14' },
    { city: 'Boca Raton', country: 'USA', lat: 26.36, lng: -80.08, label: "Saint Andrew's School", age: '15–16' },
    { city: 'New York City', country: 'USA', lat: 40.71, lng: -74.01, label: 'The Browning School, junior & senior year', age: '17–18' },
    { city: 'Austin', country: 'USA', lat: 30.27, lng: -97.74, label: 'UT Austin, McCombs School of Business', age: '19–22' },
    { city: 'Dallas', country: 'USA', lat: 32.78, lng: -96.80, label: 'SCA Health & Integrity HIT', age: '23–24' },
    { city: 'Austin', country: 'USA', lat: 30.27, lng: -97.74, label: 'Constance IT', age: '25–present' }
  ];

  /* ----------------------------------------
     Lenis Smooth Scroll
     ---------------------------------------- */
  var lenis;
  if (!prefersReducedMotion && typeof Lenis !== 'undefined') {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  /* ----------------------------------------
     Pill Nav — Scroll Direction Show/Hide
     ---------------------------------------- */
  var navPill = document.getElementById('site-nav');
  var isDesktop = window.innerWidth >= 768;

  if (isDesktop && navPill) {
    var lastScrollY = 0;
    ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: function (self) {
        var scrollY = self.scroll();
        var direction = scrollY > lastScrollY ? 'down' : 'up';
        var pastHero = scrollY > window.innerHeight * 0.8;

        if (pastHero && direction === 'down') {
          gsap.to(navPill, { y: -100, opacity: 0, duration: 0.3, ease: 'power2.in' });
        } else if (direction === 'up' || !pastHero) {
          gsap.to(navPill, { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' });
        }
        lastScrollY = scrollY;
      }
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
          document.querySelectorAll('.nav-pill-links a').forEach(function (a) {
            a.classList.remove('active');
          });
          var link = document.querySelector('.nav-pill-links a[href="#' + section.id + '"]');
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
    scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: true }
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
    mobileLinks.forEach(function (link) { link.addEventListener('click', closeMobileMenu); });

    mobileOverlay.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeMobileMenu(); return; }
      if (e.key !== 'Tab') return;
      var focusable = mobileOverlay.querySelectorAll('a, button');
      if (!focusable.length) return;
      var first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  /* ----------------------------------------
     Smooth Scroll (Lenis or fallback)
     ---------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (!target) return;
      if (lenis) {
        e.preventDefault();
        lenis.scrollTo(target, { offset: -80 });
      }
    });
  });

  /* ----------------------------------------
     GSAP Animations
     ---------------------------------------- */
  if (!prefersReducedMotion) {

    /* Hero text reveal */
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

    /* Hero photo parallax (desktop) */
    if (window.innerWidth >= 768) {
      gsap.to('.hero-headshot', {
        yPercent: -15, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
      });
    }

    /* Section labels reveal */
    gsap.utils.toArray('.section-label').forEach(function (label) {
      gsap.from(label, {
        y: 20, opacity: 0, duration: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: label, start: 'top 85%' }
      });
    });

    /* Section intro line reveal */
    if (typeof SplitType !== 'undefined') {
      document.querySelectorAll('.section-intro').forEach(function (intro) {
        var split = new SplitType(intro, { types: 'lines' });
        gsap.from(split.lines, {
          y: 30, opacity: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1,
          scrollTrigger: { trigger: intro, start: 'top 85%' }
        });
      });
    }

    /* Project cards stagger */
    gsap.from('.project-card', {
      y: 60, opacity: 0, duration: 0.8, ease: 'power2.out', stagger: 0.15,
      scrollTrigger: { trigger: '.project-cards', start: 'top 80%', toggleActions: 'play none none none' }
    });

    /* Journey timeline stagger (mobile) */
    gsap.from('.timeline-stop', {
      y: 30, opacity: 0, duration: 0.5, ease: 'power2.out', stagger: 0.1,
      scrollTrigger: { trigger: '.journey-timeline', start: 'top 80%' }
    });

    /* About photo reveal */
    gsap.from('.about-headshot', {
      clipPath: 'inset(100% 0 0 0)', duration: 1, ease: 'power3.inOut',
      scrollTrigger: { trigger: '.about-photo', start: 'top 75%' }
    });

    /* About paragraph stagger */
    gsap.from('.about-text p', {
      y: 30, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out',
      scrollTrigger: { trigger: '.about-text', start: 'top 80%' }
    });

    /* Testimonial cards stagger */
    gsap.from('.testimonial-card', {
      y: 40, opacity: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1,
      scrollTrigger: { trigger: '.testimonial-cards', start: 'top 80%' }
    });

    /* Contact headline char reveal */
    if (typeof SplitType !== 'undefined') {
      var contactTitle = new SplitType('.contact-headline', { types: 'chars' });
      gsap.from(contactTitle.chars, {
        y: 50, opacity: 0, rotateX: -40, duration: 0.6, stagger: 0.03, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact', start: 'top 70%' }
      });
    }

    /* Contact elements stagger */
    gsap.from('.contact-subtext', {
      y: 20, opacity: 0, duration: 0.5, ease: 'power2.out',
      scrollTrigger: { trigger: '.contact-content', start: 'top 75%' }
    });
    gsap.from('.contact-email', {
      y: 20, opacity: 0, duration: 0.5, delay: 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: '.contact-content', start: 'top 75%' }
    });
    gsap.from('.contact-links', {
      y: 20, opacity: 0, duration: 0.5, delay: 0.2, ease: 'power2.out',
      scrollTrigger: { trigger: '.contact-content', start: 'top 75%' }
    });

  } /* end !prefersReducedMotion */

  /* ----------------------------------------
     D3 Journey Map (Desktop only)
     ---------------------------------------- */
  if (window.innerWidth >= 768 && typeof d3 !== 'undefined' && typeof topojson !== 'undefined') {
    var mapContainer = document.querySelector('.journey-map');

    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then(function (r) { return r.json(); })
      .then(function (worldData) {
        var containerWidth = mapContainer.clientWidth || 960;
        var width = Math.min(containerWidth, 1000);
        var height = width * 0.5;

        var svg = d3.select('.journey-map')
          .append('svg')
          .attr('viewBox', '0 0 ' + width + ' ' + height)
          .attr('role', 'img')
          .attr('aria-label', 'World map showing Max Gregori\'s journey across three continents');

        var projection = d3.geoNaturalEarth1()
          .fitExtent([[20, 20], [width - 20, height - 20]], { type: 'Sphere' })
          .precision(0.2);

        var path = d3.geoPath(projection);
        var land = topojson.feature(worldData, worldData.objects.countries);

        /* Land */
        svg.append('g')
          .selectAll('path')
          .data(land.features)
          .join('path')
          .attr('class', 'land')
          .attr('d', path);

        /* Connection lines */
        var linesGroup = svg.append('g');
        var connectionPaths = [];

        for (var i = 0; i < journeyStops.length - 1; i++) {
          var from = journeyStops[i];
          var to = journeyStops[i + 1];
          var lineFeature = {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [[from.lng, from.lat], [to.lng, to.lat]]
            }
          };

          var linePath = linesGroup.append('path')
            .attr('class', 'connection-line')
            .attr('d', path(lineFeature));

          var totalLen = linePath.node().getTotalLength();
          linePath
            .attr('stroke-dasharray', totalLen)
            .attr('stroke-dashoffset', totalLen);

          connectionPaths.push(linePath.node());
        }

        /* Pins */
        var pinsGroup = svg.append('g');
        var pinElements = [];

        journeyStops.forEach(function (stop, idx) {
          var coords = projection([stop.lng, stop.lat]);
          if (!coords) return;

          var g = pinsGroup.append('g').attr('transform', 'translate(' + coords[0] + ',' + coords[1] + ')');

          if (idx === journeyStops.length - 1) {
            g.append('circle').attr('class', 'pin-pulse').attr('r', 10).style('opacity', 0);
          }

          g.append('circle').attr('class', 'pin').attr('r', 5).style('opacity', 0);

          pinElements.push(g.node());
        });

        /* Labels */
        var labelsGroup = svg.append('g');
        var labelElements = [];

        journeyStops.forEach(function (stop, idx) {
          var coords = projection([stop.lng, stop.lat]);
          if (!coords) return;

          var offsetX = 12;
          var offsetY = -8;
          /* Alternate label positions to reduce overlap */
          if (idx % 2 === 1) { offsetX = -120; }

          var labelG = labelsGroup.append('g')
            .attr('class', 'map-label')
            .attr('transform', 'translate(' + (coords[0] + offsetX) + ',' + (coords[1] + offsetY) + ')')
            .style('opacity', 0);

          labelG.append('rect').attr('width', 110).attr('height', 32).attr('y', -16);
          labelG.append('text').attr('class', 'label-city').attr('x', 8).attr('y', -2).text(stop.city);
          labelG.append('text').attr('class', 'label-detail').attr('x', 8).attr('y', 10).text(stop.label);

          labelElements.push(labelG.node());
        });

        /* Scroll-driven animation */
        if (!prefersReducedMotion) {
          var mapTl = gsap.timeline({
            scrollTrigger: {
              trigger: '.journey',
              start: 'top center',
              end: 'bottom center',
              scrub: 1
            }
          });

          /* Show first pin + label */
          mapTl.to(pinElements[0].querySelector('.pin'), { opacity: 1, duration: 0.05 }, 0);
          mapTl.to(labelElements[0], { opacity: 1, duration: 0.05 }, 0);

          /* Animate each connection + reveal next pin */
          var totalSteps = connectionPaths.length;
          connectionPaths.forEach(function (pathEl, idx) {
            var startPos = (idx + 0.5) / (totalSteps + 1);
            var endPos = (idx + 1.5) / (totalSteps + 1);

            mapTl.to(pathEl, { strokeDashoffset: 0, ease: 'none' }, startPos);
            mapTl.to(pinElements[idx + 1].querySelector('.pin'), { opacity: 1, duration: 0.02 }, endPos);
            mapTl.to(labelElements[idx + 1], { opacity: 1, duration: 0.05 }, endPos);
          });

          /* Pulse on final pin */
          var finalPulse = pinElements[pinElements.length - 1].querySelector('.pin-pulse');
          if (finalPulse) {
            mapTl.to(finalPulse, { opacity: 0.3, duration: 0.1 }, 0.95);
          }
        } else {
          /* Reduced motion: show everything */
          connectionPaths.forEach(function (p) { p.setAttribute('stroke-dashoffset', 0); });
          pinElements.forEach(function (g) { g.querySelector('.pin').style.opacity = 1; });
          labelElements.forEach(function (g) { g.style.opacity = 1; });
        }

        ScrollTrigger.refresh();
      })
      .catch(function () {
        /* If D3 map fails, show the mobile timeline as fallback */
        var timeline = document.querySelector('.journey-timeline');
        var map = document.querySelector('.journey-map');
        if (timeline) timeline.style.display = 'block';
        if (map) map.style.display = 'none';
      });
  }

  /* ----------------------------------------
     Accordion Cards (GSAP-powered)
     ---------------------------------------- */
  document.querySelectorAll('.card-toggle').forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      var card = this.closest('.project-card');
      var expanded = card.querySelector('.card-expanded');
      var isOpen = card.classList.contains('expanded');

      /* Close other cards */
      document.querySelectorAll('.project-card.expanded').forEach(function (openCard) {
        if (openCard !== card) {
          var openExp = openCard.querySelector('.card-expanded');
          openCard.classList.remove('expanded');
          openCard.querySelector('.card-toggle').setAttribute('aria-expanded', 'false');
          openExp.setAttribute('aria-hidden', 'true');
          gsap.to(openExp, {
            height: 0, duration: prefersReducedMotion ? 0 : 0.4, ease: 'power2.inOut',
            onComplete: function () { openExp.style.overflow = 'hidden'; }
          });
        }
      });

      if (isOpen) {
        card.classList.remove('expanded');
        this.setAttribute('aria-expanded', 'false');
        expanded.setAttribute('aria-hidden', 'true');
        gsap.to(expanded, {
          height: 0, duration: prefersReducedMotion ? 0 : 0.4, ease: 'power2.inOut',
          onComplete: function () { expanded.style.overflow = 'hidden'; ScrollTrigger.refresh(); }
        });
      } else {
        card.classList.add('expanded');
        this.setAttribute('aria-expanded', 'true');
        expanded.setAttribute('aria-hidden', 'false');
        expanded.style.overflow = 'hidden';
        gsap.to(expanded, {
          height: 'auto', duration: prefersReducedMotion ? 0 : 0.5, ease: 'power2.inOut',
          onComplete: function () { expanded.style.overflow = 'visible'; ScrollTrigger.refresh(); }
        });
      }
    });
  });

})();
