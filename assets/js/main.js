/**
* Template Name: iPortfolio - v3.7.0
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  if (typeof GLightbox !== 'undefined') {
    GLightbox({
      selector: '.portfolio-lightbox'
    });
  }

  /**
   * Portfolio details slider
   */
  if (typeof Swiper !== 'undefined' && select('.portfolio-details-slider')) {
    new Swiper('.portfolio-details-slider', {
      speed: 400,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      }
    });
  }

  /**
   * Testimonials slider
   */
  if (typeof Swiper !== 'undefined' && select('.testimonials-slider')) {
    new Swiper('.testimonials-slider', {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },

        1200: {
          slidesPerView: 3,
          spaceBetween: 20
        }
      }
    });
  }

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Bilingual (ES/EN) language toggle with localStorage persistence
   */
  (function() {
    const STORAGE_KEY = 'site-lang';
    const DEFAULT_LANG = 'es';
    const stored = localStorage.getItem(STORAGE_KEY);
    const initialLang = (stored === 'en' || stored === 'es') ? stored : DEFAULT_LANG;

    // Apply language immediately (before DOMContentLoaded) to avoid flash
    document.documentElement.lang = initialLang;

    function applyLang(lang) {
      document.documentElement.lang = lang;
      localStorage.setItem(STORAGE_KEY, lang);
      document.querySelectorAll('.lang-btn').forEach(function(btn) {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
      });
    }

    function initLangSwitcher() {
      const buttons = document.querySelectorAll('.lang-btn');
      buttons.forEach(function(btn) {
        btn.addEventListener('click', function() {
          applyLang(btn.getAttribute('data-lang'));
        });
      });
      applyLang(document.documentElement.lang);
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initLangSwitcher);
    } else {
      initLangSwitcher();
    }
  })();

  /**
   * EdgeDACS Video Demonstration Modal Controller
   */
  (function() {
    const videoData = {
      scada: {
        src: 'assets/video/scada_dacs-demo-ensayo-pozo-control.mp4',
        tagEs: 'Digital Twin · SCADA Real · PLC Link',
        tagEn: 'Digital Twin · Real SCADA · PLC Link',
        titleEs: 'SCADA Industrial & Digital Twin para Ensayo de Pozos (2:16 min)',
        titleEn: 'Industrial SCADA & Digital Twin for Well Testing (2:16 min)',
        descEs: 'Operación de separador trifásico con balance de masa dinámico, gas real (Dranchuk-Abou-Kassem), válvulas normadas IEC 60534, control PID y absorción de slugs.',
        descEn: 'Three-phase separator operation with dynamic mass balance, Dranchuk-Abou-Kassem real gas, IEC 60534 control valves, PID loops, and slug damping.'
      },
      anomalias: {
        src: 'assets/video/scada_dacs-demo-deteccion-anomalias.mp4',
        tagEs: '3D Digital Twin · Edge ML · Fault Injection',
        tagEn: '3D Digital Twin · Edge ML · Fault Injection',
        titleEs: 'Detección de Anomalías Multivariables en Tiempo Real (1:18 min)',
        titleEn: 'Real-Time Multivariate Anomaly Detection (1:18 min)',
        descEs: 'Gemelo 3D con inyección de fallas en vivo y benchmarking de latencia: XGBoost (0.3 ms), Isolation Forest (5.2 ms), LSTM-AE (2.0 ms) y Gating a LLM.',
        descEn: 'Interactive 3D digital twin with live fault injection and latency benchmarks: XGBoost (0.3 ms), Isolation Forest (5.2 ms), LSTM-AE (2.0 ms), and LLM Gating.'
      }
    };

    function initVideoModal() {
      const modalEl = document.getElementById('videoModal');
      if (!modalEl || typeof bootstrap === 'undefined') return;

      const player = document.getElementById('modalVideoPlayer');
      const label = document.getElementById('videoModalLabel');
      const tag = document.getElementById('modalVideoTag');
      const desc = document.getElementById('modalVideoDesc');
      let bsModal = null;

      try {
        bsModal = bootstrap.Modal.getOrCreateInstance(modalEl);
      } catch (e) {
        bsModal = new bootstrap.Modal(modalEl);
      }

      function openVideo(videoKey) {
        const item = videoData[videoKey];
        if (!item || !player) return;

        const isEn = document.documentElement.lang === 'en';
        tag.textContent = isEn ? item.tagEn : item.tagEs;
        label.textContent = isEn ? item.titleEn : item.titleEs;
        desc.textContent = isEn ? item.descEn : item.descEs;

        player.src = item.src;
        bsModal.show();
        player.play().catch(function() {});
      }

      document.querySelectorAll('[data-video]').forEach(function(el) {
        el.addEventListener('click', function(e) {
          const key = this.getAttribute('data-video');
          if (key) {
            e.preventDefault();
            openVideo(key);
          }
        });
      });

      modalEl.addEventListener('hidden.bs.modal', function() {
        if (player) {
          player.pause();
          player.removeAttribute('src');
          player.load();
        }
      });
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initVideoModal);
    } else {
      initVideoModal();
    }
  })();

})()