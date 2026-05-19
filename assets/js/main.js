/* D9 Travel — Main JS */

// ── Navbar ───────────────────────────────────────────────
const navbar = document.querySelector('.navbar');

function updateNavbar() {
  if (!navbar) return;
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
    navbar.classList.remove('hero-transparent');
  } else {
    navbar.classList.remove('scrolled');
    if (navbar.dataset.transparent === 'true') {
      navbar.classList.add('hero-transparent');
    }
  }
}

if (navbar && navbar.dataset.transparent === 'true') {
  navbar.classList.add('hero-transparent');
}

window.addEventListener('scroll', updateNavbar, { passive: true });
updateNavbar();

// ── Mobile Menu ──────────────────────────────────────────
const toggle = document.querySelector('.navbar-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

if (toggle && mobileMenu) {
  toggle.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('open');
    }
  });
}

// ── Tour Tabs ────────────────────────────────────────────
document.querySelectorAll('.tour-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    tab.closest('.tour-tabs-wrapper').querySelectorAll('.tour-tab').forEach(t => t.classList.remove('active'));
    tab.closest('.tour-tabs-wrapper').querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(target)?.classList.add('active');
  });
});

// ── View Toggle (grid / list) ────────────────────────────
const viewBtns = document.querySelectorAll('.view-toggle button');
const toursGrid = document.querySelector('.tours-grid');

viewBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    viewBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    if (toursGrid) {
      if (btn.dataset.view === 'list') toursGrid.classList.add('list-view');
      else toursGrid.classList.remove('list-view');
    }
  });
});

// ── Save / Wishlist toggle ───────────────────────────────
document.querySelectorAll('.card-save').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const icon = btn.querySelector('i');
    if (icon.classList.contains('far')) {
      icon.classList.replace('far', 'fas');
      btn.style.color = '#EF4444';
    } else {
      icon.classList.replace('fas', 'far');
      btn.style.color = '';
    }
  });
});

// ── Guest Counter ────────────────────────────────────────
document.querySelectorAll('.guest-counter').forEach(counter => {
  const minus = counter.querySelector('.minus');
  const plus = counter.querySelector('.plus');
  const display = counter.querySelector('.count');

  minus?.addEventListener('click', () => {
    const v = parseInt(display.textContent);
    if (v > 1) display.textContent = v - 1;
  });
  plus?.addEventListener('click', () => {
    const v = parseInt(display.textContent);
    if (v < 20) display.textContent = v + 1;
  });
});

// ── Date input min today ─────────────────────────────────
document.querySelectorAll('input[type="date"]').forEach(input => {
  if (!input.min) {
    const today = new Date().toISOString().split('T')[0];
    input.min = today;
  }
});

// Departure before return validation
const dateFrom = document.querySelector('#date-from');
const dateTo = document.querySelector('#date-to');
if (dateFrom && dateTo) {
  dateFrom.addEventListener('change', () => { dateTo.min = dateFrom.value; });
}

// ── Price Range Slider ───────────────────────────────────
const priceRange = document.querySelector('#price-range');
const priceDisplay = document.querySelector('#price-display');
if (priceRange && priceDisplay) {
  priceRange.addEventListener('input', () => {
    const val = parseInt(priceRange.value).toLocaleString('vi-VN');
    priceDisplay.textContent = `${val}đ`;
  });
}

// ── Filter Accordion ─────────────────────────────────────
document.querySelectorAll('.filter-card h3 .toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const body = btn.closest('.filter-card').querySelector('.filter-body');
    if (body) {
      const hidden = body.style.display === 'none';
      body.style.display = hidden ? '' : 'none';
      btn.textContent = hidden ? 'Ẩn' : 'Xem thêm';
    }
  });
});

// ── Booking Price Recalculation ──────────────────────────
function recalcBooking() {
  const adults = parseInt(document.querySelector('#adults')?.value || '1');
  const children = parseInt(document.querySelector('#children')?.value || '0');
  const basePrice = parseFloat(document.querySelector('#base-price')?.dataset.price || '0');

  const adultTotal = adults * basePrice;
  const childTotal = children * basePrice * 0.7;
  const total = adultTotal + childTotal;

  const adultEl = document.querySelector('#adult-total');
  const childEl = document.querySelector('#child-total');
  const totalEl = document.querySelector('#total-price');

  if (adultEl) adultEl.textContent = formatVND(adultTotal);
  if (childEl) childEl.textContent = formatVND(childTotal);
  if (totalEl) totalEl.textContent = formatVND(total);
}

function formatVND(num) {
  return num.toLocaleString('vi-VN') + 'đ';
}

document.querySelector('#adults')?.addEventListener('change', recalcBooking);
document.querySelector('#children')?.addEventListener('change', recalcBooking);

// ── Smooth scroll for anchor links ───────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Contact form ─────────────────────────────────────────
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('[type="submit"]');
    btn.textContent = 'Đang gửi...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Đã gửi!';
      btn.style.background = '#52B788';
      setTimeout(() => {
        btn.textContent = 'Gửi tin nhắn';
        btn.disabled = false;
        btn.style.background = '';
        contactForm.reset();
      }, 2500);
    }, 1200);
  });
}

// ── Booking form step navigation ─────────────────────────
const nextBtns = document.querySelectorAll('.step-next');
const prevBtns = document.querySelectorAll('.step-prev');
const steps = document.querySelectorAll('.booking-step');

function showStep(n) {
  steps.forEach((s, i) => s.style.display = i === n ? 'block' : 'none');
  document.querySelectorAll('.step-item').forEach((s, i) => {
    s.classList.toggle('active', i === n);
    s.classList.toggle('done', i < n);
  });
}

if (steps.length) {
  showStep(0);
  nextBtns.forEach(btn => btn.addEventListener('click', () => {
    const cur = Array.from(steps).findIndex(s => s.style.display !== 'none');
    if (cur < steps.length - 1) showStep(cur + 1);
  }));
  prevBtns.forEach(btn => btn.addEventListener('click', () => {
    const cur = Array.from(steps).findIndex(s => s.style.display !== 'none');
    if (cur > 0) showStep(cur - 1);
  }));
}

// ── Mini calendar ─────────────────────────────────────────
(function initCalendar() {
  const cal = document.querySelector('.month-calendar');
  if (!cal) return;

  let year = new Date().getFullYear();
  let month = new Date().getMonth();
  const tourDays = [3, 7, 12, 18, 22, 25, 28];

  function render() {
    const monthNames = ['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'];
    cal.querySelector('.cal-month-title').textContent = `${monthNames[month]} ${year}`;
    const grid = cal.querySelector('.cal-grid');
    const first = new Date(year, month, 1).getDay();
    const days = new Date(year, month + 1, 0).getDate();
    const today = new Date();

    let html = '';
    const dayNames = ['CN','T2','T3','T4','T5','T6','T7'];
    dayNames.forEach(d => { html += `<div class="cal-day-name">${d}</div>`; });

    for (let i = 0; i < first; i++) html += `<div class="cal-day empty"></div>`;
    for (let d = 1; d <= days; d++) {
      const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
      const hasTour = tourDays.includes(d);
      html += `<div class="cal-day ${isToday ? 'today' : ''} ${hasTour ? 'has-tour' : ''}">${d}</div>`;
    }
    grid.innerHTML = html;
  }

  cal.querySelector('.cal-prev')?.addEventListener('click', () => {
    if (month === 0) { month = 11; year--; } else month--;
    render();
  });
  cal.querySelector('.cal-next')?.addEventListener('click', () => {
    if (month === 11) { month = 0; year++; } else month++;
    render();
  });
  render();
})();

// ── Fade-in on scroll (lightweight) ──────────────────────
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.tour-card, .blog-card, .value-card, .feature-item').forEach(el => {
    el.classList.add('fade-in-target');
    observer.observe(el);
  });
}
