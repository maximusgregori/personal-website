/* ============================================
   Main JavaScript
   GSAP + ScrollTrigger + SplitType + Lenis + Three.js
   ============================================ */

(function () {
  'use strict';

  gsap.registerPlugin(ScrollTrigger);

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----------------------------------------
     Journey Data
     ---------------------------------------- */
  var journeyStops = [
    { city: 'Hamburg', country: 'Germany', lat: 53.55, lng: 9.99, label: 'Born', sublabel: '', year: '2000' },
    { city: 'Düsseldorf', country: 'Germany', lat: 51.23, lng: 6.78, label: 'Early childhood', sublabel: '', year: '2001' },
    { city: 'Cape Town', country: 'South Africa', lat: -33.92, lng: 18.42, label: 'Five years in South Africa', sublabel: '', year: '2009' },
    { city: 'New York City', country: 'USA', lat: 40.71, lng: -74.01, label: 'The Browning School', sublabel: 'Grade 8', year: '2014' },
    { city: 'Boca Raton', country: 'USA', lat: 26.36, lng: -80.08, label: "Saint Andrew's School", sublabel: 'Grades 9 & 10', year: '2015' },
    { city: 'New York City', country: 'USA', lat: 40.71, lng: -74.01, label: 'The Browning School', sublabel: 'Grades 11 & 12', year: '2017' },
    { city: 'Austin', country: 'USA', lat: 30.27, lng: -97.74, label: 'UT Austin', sublabel: 'McCombs School of Business', year: '2019' },
    { city: 'Dallas', country: 'USA', lat: 32.78, lng: -96.80, label: 'SCA Health & Integrity HIT', sublabel: '', year: '2023' },
    { city: 'Austin', country: 'USA', lat: 30.27, lng: -97.74, label: 'Constance IT', sublabel: '', year: '2025' }
  ];

  /* ----------------------------------------
     Lenis Smooth Scroll
     ---------------------------------------- */
  var lenis;
  if (!prefersReducedMotion && typeof Lenis !== 'undefined') {
    lenis = new Lenis({ lerp: 0.35, smoothWheel: true });
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
     Three.js Journey Globe (Desktop only)
     ---------------------------------------- */
  if (window.innerWidth >= 768) {

    /* Generate sidebar items (independent of globe) */
    var sidebarContainer = document.querySelector('.journey-sidebar');
    if (sidebarContainer) {
      sidebarContainer.innerHTML = '';
      journeyStops.forEach(function (stop, idx) {
        var div = document.createElement('div');
        div.className = 'sidebar-stop';
        div.setAttribute('data-index', idx);

        var sublabelHtml = stop.sublabel
          ? '<span class="sidebar-sublabel">' + stop.sublabel + '</span>'
          : '';

        div.innerHTML = '<span class="sidebar-year">' + stop.year + '</span>' +
          '<div class="sidebar-detail">' +
          '<span class="sidebar-city">' + stop.city + ', ' + stop.country + '</span>' +
          '<span class="sidebar-label">' + stop.label + '</span>' +
          sublabelHtml +
          '</div>';
        div.style.opacity = '1';
        sidebarContainer.appendChild(div);
      });
    }

    function waitForThreeAndInit(attempts) {
      if (typeof THREE !== 'undefined' && typeof topojson !== 'undefined') {
        initGlobe();
      } else if (attempts > 0) {
        setTimeout(function () { waitForThreeAndInit(attempts - 1); }, 500);
      } else {
        var timeline = document.querySelector('.journey-timeline');
        var wrapper = document.querySelector('.journey-map-wrapper');
        if (timeline) timeline.style.display = 'block';
        if (wrapper) wrapper.style.display = 'none';
      }
    }

    function initGlobe() {
      var mapContainer = document.querySelector('.journey-map');
      if (!mapContainer) return;

      var loadingEl = mapContainer.querySelector('.journey-map-loading');
      if (loadingEl) loadingEl.remove();

      /* Scene setup */
      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
      camera.position.z = 2.8;

      var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      mapContainer.appendChild(renderer.domElement);

      function resizeRenderer() {
        var w = mapContainer.clientWidth;
        var h = Math.max(w * 0.9, 600);
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      }
      resizeRenderer();
      window.addEventListener('resize', resizeRenderer);

      /* Globe group — all rotating objects are children */
      var globeGroup = new THREE.Group();
      scene.add(globeGroup);

      /* Globe sphere */
      var globeRadius = 1;
      var globeGeometry = new THREE.SphereGeometry(globeRadius, 64, 64);
      var globeMaterial = new THREE.MeshBasicMaterial({
        color: 0x1a2744,
        transparent: true,
        opacity: 0.9
      });
      var globe = new THREE.Mesh(globeGeometry, globeMaterial);
      globeGroup.add(globe);

      /* Atmosphere glow */
      var glowGeometry = new THREE.SphereGeometry(globeRadius * 1.02, 64, 64);
      var glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x22D3EE,
        transparent: true,
        opacity: 0.05,
        side: THREE.BackSide
      });
      globeGroup.add(new THREE.Mesh(glowGeometry, glowMaterial));

      /* Lat/lng to 3D point on sphere */
      function latLngToVec3(lat, lng, radius) {
        var phi = (90 - lat) * (Math.PI / 180);
        var theta = (lng + 180) * (Math.PI / 180);
        return new THREE.Vector3(
          -(radius * Math.sin(phi) * Math.cos(theta)),
          radius * Math.cos(phi),
          radius * Math.sin(phi) * Math.sin(theta)
        );
      }

      /* Initial globe rotation (face Atlantic) */
      function lngToRotationY(lng) {
        return -Math.PI / 2 - lng * (Math.PI / 180);
      }
      globeGroup.rotation.y = lngToRotationY(-30);

      /* Click-to-navigate rotation state */
      var rotationTarget = { y: globeGroup.rotation.y, x: globeGroup.rotation.x };
      var isAnimatingToTarget = false;

      /* Drag-to-rotate (mouse) */
      var isDragging = false;
      var previousMousePosition = { x: 0, y: 0 };

      renderer.domElement.addEventListener('mousedown', function (e) {
        isDragging = true;
        isAnimatingToTarget = false;
        previousMousePosition = { x: e.clientX, y: e.clientY };
      });

      window.addEventListener('mousemove', function (e) {
        if (!isDragging) return;
        globeGroup.rotation.y += (e.clientX - previousMousePosition.x) * 0.005;
        globeGroup.rotation.x += (e.clientY - previousMousePosition.y) * 0.005;
        globeGroup.rotation.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, globeGroup.rotation.x));
        previousMousePosition = { x: e.clientX, y: e.clientY };
      });

      window.addEventListener('mouseup', function () { isDragging = false; });

      /* Drag-to-rotate (touch) */
      renderer.domElement.addEventListener('touchstart', function (e) {
        if (e.touches.length === 1) {
          isDragging = true;
          isAnimatingToTarget = false;
          previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
      }, { passive: true });

      renderer.domElement.addEventListener('touchmove', function (e) {
        if (!isDragging || e.touches.length !== 1) return;
        globeGroup.rotation.y += (e.touches[0].clientX - previousMousePosition.x) * 0.005;
        globeGroup.rotation.x += (e.touches[0].clientY - previousMousePosition.y) * 0.005;
        globeGroup.rotation.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, globeGroup.rotation.x));
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }, { passive: true });

      renderer.domElement.addEventListener('touchend', function () { isDragging = false; });

      /* Fetch TopoJSON and build country outlines, pins, arcs */
      fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
        .then(function (r) { return r.json(); })
        .then(function (worldData) {
          var countries = topojson.feature(worldData, worldData.objects.countries);

          /* Country outlines */
          var lineMaterial = new THREE.LineBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.15
          });

          countries.features.forEach(function (feature) {
            var coords = feature.geometry.type === 'Polygon'
              ? [feature.geometry.coordinates]
              : feature.geometry.coordinates;

            coords.forEach(function (polygon) {
              polygon.forEach(function (ring) {
                var points = [];
                var step = Math.max(1, Math.floor(ring.length / 80));
                for (var i = 0; i < ring.length; i += step) {
                  points.push(latLngToVec3(ring[i][1], ring[i][0], globeRadius * 1.001));
                }
                if (points.length > 1) {
                  points.push(points[0].clone());
                }
                var geometry = new THREE.BufferGeometry().setFromPoints(points);
                globeGroup.add(new THREE.Line(geometry, lineMaterial));
              });
            });
          });

          /* Pins — all visible on load */
          var pinMeshes = [];
          var pinMaterial = new THREE.MeshBasicMaterial({ color: 0x22D3EE });
          var pinGeometry = new THREE.SphereGeometry(0.02, 16, 16);

          journeyStops.forEach(function (stop) {
            var pos = latLngToVec3(stop.lat, stop.lng, globeRadius * 1.01);
            var pin = new THREE.Mesh(pinGeometry, pinMaterial.clone());
            pin.position.copy(pos);
            globeGroup.add(pin);
            pinMeshes.push(pin);
          });

          /* Pulse ring on last pin — visible on load */
          var lastPos = latLngToVec3(
            journeyStops[journeyStops.length - 1].lat,
            journeyStops[journeyStops.length - 1].lng,
            globeRadius * 1.01
          );
          var pulseGeometry = new THREE.RingGeometry(0.02, 0.04, 32);
          var pulseMaterial = new THREE.MeshBasicMaterial({
            color: 0x22D3EE,
            transparent: true,
            opacity: 0.3,
            side: THREE.DoubleSide
          });
          var pulseRing = new THREE.Mesh(pulseGeometry, pulseMaterial);
          pulseRing.position.copy(lastPos);
          pulseRing.lookAt(new THREE.Vector3(0, 0, 0));
          globeGroup.add(pulseRing);

          /* Connection arcs — all visible on load */
          function createArc(start, end, radius, segments) {
            var startVec = latLngToVec3(start.lat, start.lng, radius);
            var endVec = latLngToVec3(end.lat, end.lng, radius);
            var points = [];

            for (var i = 0; i <= segments; i++) {
              var t = i / segments;
              var point = new THREE.Vector3().copy(startVec).lerp(endVec, t).normalize();
              var lift = 1 + 0.08 * Math.sin(t * Math.PI);
              point.multiplyScalar(radius * lift);
              points.push(point);
            }

            return points;
          }

          var arcMaterial = new THREE.LineBasicMaterial({
            color: 0x22D3EE,
            transparent: true,
            opacity: 0.5
          });

          for (var i = 0; i < journeyStops.length - 1; i++) {
            var arcPoints = createArc(journeyStops[i], journeyStops[i + 1], globeRadius, 50);
            var arcGeo = new THREE.BufferGeometry().setFromPoints(arcPoints);
            var arc = new THREE.Line(arcGeo, arcMaterial.clone());
            arc.material.opacity = 0.5;
            globeGroup.add(arc);
          }

          /* Sidebar click-to-navigate */
          document.querySelectorAll('.sidebar-stop').forEach(function (el) {
            el.addEventListener('click', function () {
              var idx = parseInt(this.getAttribute('data-index'));
              var stop = journeyStops[idx];

              if (prefersReducedMotion) {
                globeGroup.rotation.y = lngToRotationY(stop.lng);
                globeGroup.rotation.x = stop.lat * (Math.PI / 180) * 0.3;
              } else {
                rotationTarget.y = lngToRotationY(stop.lng);
                rotationTarget.x = stop.lat * (Math.PI / 180) * 0.3;
                isAnimatingToTarget = true;
              }

              document.querySelectorAll('.sidebar-stop').forEach(function (s) {
                s.classList.remove('active');
              });
              this.classList.add('active');
            });
          });
        })
        .catch(function (err) {
          console.error('[Globe] Failed to load world data:', err);
          var timeline = document.querySelector('.journey-timeline');
          var wrapper = document.querySelector('.journey-map-wrapper');
          if (timeline) timeline.style.display = 'block';
          if (wrapper) wrapper.style.display = 'none';
        });

      /* Render loop */
      function animate() {
        requestAnimationFrame(animate);

        if (isAnimatingToTarget && !isDragging) {
          var dy = rotationTarget.y - globeGroup.rotation.y;
          var dx = rotationTarget.x - globeGroup.rotation.x;

          while (dy > Math.PI) dy -= Math.PI * 2;
          while (dy < -Math.PI) dy += Math.PI * 2;

          globeGroup.rotation.y += dy * 0.06;
          globeGroup.rotation.x += dx * 0.06;

          if (Math.abs(dy) < 0.005 && Math.abs(dx) < 0.005) {
            globeGroup.rotation.y = rotationTarget.y;
            globeGroup.rotation.x = rotationTarget.x;
            isAnimatingToTarget = false;
          }
        }

        renderer.render(scene, camera);
      }
      animate();
    }

    requestAnimationFrame(function () {
      setTimeout(function () { waitForThreeAndInit(5); }, 100);
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
