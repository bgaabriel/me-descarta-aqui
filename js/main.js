  // ═══ CAROUSEL ═══
  let currentCat = 0;
  const totalCats = 9;

  function selectCat(idx) {
    // hide current
    document.getElementById('panel-' + currentCat).classList.remove('active');
    document.querySelectorAll('.cat-btn')[currentCat].classList.remove('active');

    currentCat = ((idx % totalCats) + totalCats) % totalCats;

    // show new
    document.getElementById('panel-' + currentCat).classList.remove('active');
    void document.getElementById('panel-' + currentCat).offsetWidth; // reflow
    document.getElementById('panel-' + currentCat).classList.add('active');
    document.querySelectorAll('.cat-btn')[currentCat].classList.add('active');

    // scroll cat button into view
    const btn = document.querySelectorAll('.cat-btn')[currentCat];
    btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }

  function nextCat() { selectCat(currentCat + 1); }
  function prevCat() { selectCat(currentCat - 1); }

  // keyboard support
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') nextCat();
    if (e.key === 'ArrowLeft') prevCat();
  });

  // touch swipe — only fires when movement is clearly horizontal
  let touchStartX = 0;
  let touchStartY = 0;
  const contentPanels = document.querySelector('.content-panels');
  contentPanels.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  contentPanels.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    // Only trigger if horizontal movement is dominant AND exceeds threshold
    if (Math.abs(dx) > Math.abs(dy) * 1.8 && Math.abs(dx) > 60) {
      dx < 0 ? nextCat() : prevCat();
    }
  }, { passive: true });

  // ═══ MOBILE MENU ═══
  function openMobileMenu() {
    document.getElementById('mobileMenu').classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMobileMenu() {
    document.getElementById('mobileMenu').classList.remove('open');
    document.body.style.overflow = '';
  }

  // ═══ SCROLL REVEAL ═══
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, entry.target.dataset.delay || 0);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach((el, i) => {
    // stagger siblings
    const parent = el.parentElement;
    const siblings = [...parent.querySelectorAll('.reveal')];
    const idx = siblings.indexOf(el);
    el.dataset.delay = idx * 80;
    revealObserver.observe(el);
  });

  // ═══ NAV SCROLL EFFECT ═══
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 40
      ? 'rgba(13,61,43,0.97)'
      : 'rgba(13,61,43,0.85)';
  });

  // ═══ BANNER MODAL ═══
  function openBannerModal(src) {
    const modal = document.getElementById('bannerModal');
    const img   = document.getElementById('bannerModalImg');
    if (!modal || !img) return;
    img.src = src;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeBannerModal() {
    const modal = document.getElementById('bannerModal');
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeBannerModal();
  });

  // ═══ DUAL BANNER SWITCH ═══
  let currentBanner = 'solidos';

  function switchBanner(name) {
    // slides
    document.querySelectorAll('.dual-banner-slide').forEach(s => s.classList.remove('active'));
    const slide = document.getElementById('slide-' + name);
    if (slide) slide.classList.add('active');

    // tabs
    document.querySelectorAll('.dual-tab').forEach(t => t.classList.remove('active'));
    const tab = document.getElementById('tab-' + name);
    if (tab) tab.classList.add('active');

    // dots
    document.querySelectorAll('.banner-dot').forEach(d => d.classList.remove('active'));
    const dot = document.getElementById('dot-' + name);
    if (dot) dot.classList.add('active');

    currentBanner = name;
  }

  // ═══ DICA CAROUSEL ═══
  let currentDica = 0;
  const totalDicas = 4;

  function goToDica(idx) {
    // Hide current
    document.getElementById('dica-' + currentDica).classList.remove('active');
    document.querySelectorAll('.dica-dot')[currentDica].classList.remove('active');

    currentDica = ((idx % totalDicas) + totalDicas) % totalDicas;

    // Show new
    const card = document.getElementById('dica-' + currentDica);
    card.classList.remove('active');
    void card.offsetWidth; // reflow for animation restart
    card.classList.add('active');
    document.querySelectorAll('.dica-dot')[currentDica].classList.add('active');
  }

  function dicaNext() { goToDica(currentDica + 1); }
  function dicaPrev() { goToDica(currentDica - 1); }

  // Swipe support for dica carousel — only horizontal
  let dicaTouchStartX = 0;
  let dicaTouchStartY = 0;
  const dicaWrapper = document.querySelector('.dica-track-wrapper');
  if (dicaWrapper) {
    dicaWrapper.addEventListener('touchstart', e => {
      dicaTouchStartX = e.touches[0].clientX;
      dicaTouchStartY = e.touches[0].clientY;
    }, { passive: true });
    dicaWrapper.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - dicaTouchStartX;
      const dy = e.changedTouches[0].clientY - dicaTouchStartY;
      if (Math.abs(dx) > Math.abs(dy) * 1.8 && Math.abs(dx) > 60) {
        dx < 0 ? dicaNext() : dicaPrev();
      }
    }, { passive: true });
  }
