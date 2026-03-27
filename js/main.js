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
    { city: 'Cape Town', country: 'South Africa', lat: -33.92, lng: 18.42, label: 'Five years in South Africa', age: '9–14' },
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
     Sticky Header — Visible Past Hero
     ---------------------------------------- */
  var siteHeader = document.getElementById('site-nav');
  var heroSection = document.getElementById('hero');

  if (window.innerWidth >= 768 && siteHeader && heroSection) {
    ScrollTrigger.create({
      trigger: heroSection,
      start: 'bottom top',
      onEnter: function () {
        siteHeader.classList.add('visible');
      },
      onLeaveBack: function () {
        siteHeader.classList.remove('visible');
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

    /* Section labels reveal */
    gsap.utils.toArray('.section-label').forEach(function (label) {
      gsap.from(label, {
        y: 20, opacity: 0, duration: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: label, start: 'top 85%' }
      });
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
  if (window.innerWidth >= 768) {
    console.log('[Map] Desktop detected, checking dependencies...');

    function waitForDepsAndInit(attempts) {
      console.log('[Map] d3 available:', typeof d3 !== 'undefined');
      console.log('[Map] topojson available:', typeof topojson !== 'undefined');

      if (typeof d3 !== 'undefined' && typeof topojson !== 'undefined') {
        startMapInit();
      } else if (attempts > 0) {
        console.log('[Map] Dependencies not ready, retrying in 500ms... (' + attempts + ' attempts left)');
        setTimeout(function () { waitForDepsAndInit(attempts - 1); }, 500);
      } else {
        console.error('[Map] Dependencies failed to load after all retries');
        var timeline = document.querySelector('.journey-timeline');
        var map = document.querySelector('.journey-map');
        if (timeline) timeline.style.display = 'block';
        if (map) map.style.display = 'none';
      }
    }

    function startMapInit() {
      var mapContainer = document.querySelector('.journey-map');
      console.log('[Map] Container found:', !!mapContainer);
      console.log('[Map] Container display:', window.getComputedStyle(mapContainer).display);
      console.log('[Map] Container dimensions:', mapContainer.clientWidth, 'x', mapContainer.clientHeight);

      function initMap() {
        console.log('[Map] initMap() called');
        mapContainer.style.display = 'flex';

        var containerWidth = mapContainer.clientWidth || mapContainer.getBoundingClientRect().width;
        console.log('[Map] Container width:', containerWidth);

        if (containerWidth < 100) {
          console.log('[Map] Container too narrow, retrying in 500ms...');
          setTimeout(initMap, 500);
          return;
        }

        var loadingEl = mapContainer.querySelector('.journey-map-loading');
        if (loadingEl) loadingEl.remove();

        console.log('[Map] Fetching TopoJSON...');
        fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
          .then(function (r) {
            console.log('[Map] Fetch response:', r.status, r.ok);
            if (!r.ok) throw new Error('HTTP ' + r.status);
            return r.json();
          })
          .then(function (worldData) {
            console.log('[Map] TopoJSON loaded, objects:', Object.keys(worldData.objects));

            var width = Math.min(containerWidth, 1000);
            var height = width * 0.65;

            d3.select('.journey-map svg').remove();

            var svg = d3.select('.journey-map')
              .append('svg')
              .attr('viewBox', '0 0 ' + width + ' ' + height)
              .attr('preserveAspectRatio', 'xMidYMid meet')
              .attr('role', 'img')
              .attr('aria-label', 'World map showing journey across three continents')
              .style('width', '100%')
              .style('max-width', width + 'px')
              .style('display', 'block')
              .style('margin', '0 auto');

            console.log('[Map] SVG created');

            var journeyBounds = {
              type: 'Feature',
              geometry: {
                type: 'Polygon',
                coordinates: [[
                  [-110, -45],
                  [30, -45],
                  [30, 60],
                  [-110, 60],
                  [-110, -45]
                ]]
              }
            };

            var projection = d3.geoNaturalEarth1()
              .fitExtent([[40, 20], [width - 40, height - 20]], journeyBounds)
              .precision(0.2);

            var pathGen = d3.geoPath(projection);
            var land = topojson.feature(worldData, worldData.objects.countries);
            console.log('[Map] Land features:', land.features.length);

            svg.append('g')
              .selectAll('path')
              .data(land.features)
              .join('path')
              .attr('class', 'land')
              .attr('d', pathGen);

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
                .attr('d', pathGen(lineFeature));

              var totalLen = linePath.node().getTotalLength();
              linePath
                .attr('stroke-dasharray', totalLen)
                .attr('stroke-dashoffset', totalLen);

              connectionPaths.push(linePath.node());
            }

            var pinsGroup = svg.append('g');
            var pinElements = [];

            journeyStops.forEach(function (stop, idx) {
              var coords = projection([stop.lng, stop.lat]);
              if (!coords) { console.warn('[Map] No coords for:', stop.city); return; }

              var g = pinsGroup.append('g').attr('transform', 'translate(' + coords[0] + ',' + coords[1] + ')');

              if (idx === journeyStops.length - 1) {
                g.append('circle').attr('class', 'pin-pulse').attr('r', 12).style('opacity', 0);
              }

              g.append('circle').attr('class', 'pin').attr('r', 6).style('opacity', 0);
              pinElements.push(g.node());
            });

            var labelsGroup = svg.append('g');
            var labelElements = [];

            var labelOffsets = [
              [14, -20],     // 0: Hamburg
              [-145, 14],    // 1: Düsseldorf
              [14, -20],     // 2: Cape Town
              [14, -30],     // 3: NYC (8th grade)
              [-155, -10],   // 4: Boca Raton
              [14, 14],      // 5: NYC (jr/sr year)
              [-165, 20],    // 6: Austin (UT)
              [14, -25],     // 7: Dallas
              [-165, -10]    // 8: Austin (Constance)
            ];

            journeyStops.forEach(function (stop, idx) {
              var coords = projection([stop.lng, stop.lat]);
              if (!coords) return;

              var offsets = labelOffsets[idx] || [14, -8];
              var cityText = stop.city;
              var detailText = stop.label;
              var rectWidth = Math.max(Math.max(cityText.length, detailText.length) * 7 + 16, 100);

              var labelG = labelsGroup.append('g')
                .attr('class', 'map-label')
                .attr('transform', 'translate(' + (coords[0] + offsets[0]) + ',' + (coords[1] + offsets[1]) + ')')
                .style('opacity', 0);

              labelG.append('rect').attr('width', rectWidth).attr('height', 36).attr('y', -18);
              labelG.append('text').attr('class', 'label-city').attr('x', 8).attr('y', -3).text(cityText);
              labelG.append('text').attr('class', 'label-detail').attr('x', 8).attr('y', 12).text(detailText);

              labelElements.push(labelG.node());
            });

            console.log('[Map] Pins:', pinElements.length, 'Labels:', labelElements.length, 'Lines:', connectionPaths.length);

            if (!prefersReducedMotion) {
              var mapTl = gsap.timeline({
                scrollTrigger: {
                  trigger: '.journey',
                  start: 'top center',
                  end: 'bottom center',
                  scrub: 1
                }
              });

              mapTl.to(pinElements[0].querySelector('.pin'), { opacity: 1, duration: 0.05 }, 0);
              mapTl.to(labelElements[0], { opacity: 1, duration: 0.05 }, 0);

              var totalSteps = connectionPaths.length;
              connectionPaths.forEach(function (pathEl, idx) {
                var startPos = (idx + 0.5) / (totalSteps + 1);
                var endPos = (idx + 1.5) / (totalSteps + 1);
                mapTl.to(pathEl, { strokeDashoffset: 0, ease: 'none' }, startPos);
                mapTl.to(pinElements[idx + 1].querySelector('.pin'), { opacity: 1, duration: 0.02 }, endPos);
                mapTl.to(labelElements[idx + 1], { opacity: 1, duration: 0.05 }, endPos);
              });

              var finalPulse = pinElements[pinElements.length - 1].querySelector('.pin-pulse');
              if (finalPulse) {
                mapTl.to(finalPulse, { opacity: 0.3, duration: 0.1 }, 0.95);
              }
            } else {
              connectionPaths.forEach(function (p) { p.setAttribute('stroke-dashoffset', 0); });
              pinElements.forEach(function (g) { g.querySelector('.pin').style.opacity = 1; });
              labelElements.forEach(function (g) { g.style.opacity = 1; });
            }

            ScrollTrigger.refresh();
            console.log('[Map] Render complete!');
          })
          .catch(function (err) {
            console.error('[Map] FAILED:', err);
            var timeline = document.querySelector('.journey-timeline');
            var map = document.querySelector('.journey-map');
            if (timeline) timeline.style.display = 'block';
            if (map) {
              var loadingFallback = map.querySelector('.journey-map-loading');
              if (loadingFallback) loadingFallback.textContent = 'Map could not load. Showing timeline instead.';
            }
          });
      }

      requestAnimationFrame(function () {
        setTimeout(function () { initMap(); }, 100);
      });
    }

    requestAnimationFrame(function () {
      setTimeout(function () { waitForDepsAndInit(5); }, 100);
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
