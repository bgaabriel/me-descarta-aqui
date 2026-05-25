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

  // touch swipe
  let touchStartX = 0;
  document.querySelector('.content-panels').addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  document.querySelector('.content-panels').addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) dx < 0 ? nextCat() : prevCat();
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
