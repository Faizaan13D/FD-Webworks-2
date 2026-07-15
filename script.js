// FD Webworks — shared behaviors
document.addEventListener('DOMContentLoaded', function () {

  // Mobile nav toggle (touch-friendly, iOS scroll-lock safe)
  var toggle = document.querySelector('.menu-toggle');
  var mobileNav = document.querySelector('.mobile-nav');
  var lockedScrollY = 0;

  function openMobileNav() {
    lockedScrollY = window.scrollY || window.pageYOffset || 0;
    document.body.style.position = 'fixed';
    document.body.style.top = (-lockedScrollY) + 'px';
    document.body.style.left = '0';
    document.body.style.right = '0';
    mobileNav.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
  }

  function closeMobileNav() {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    window.scrollTo(0, lockedScrollY);
    mobileNav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      if (mobileNav.classList.contains('open')) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        closeMobileNav();
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        closeMobileNav();
      }
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 920 && mobileNav.classList.contains('open')) {
        closeMobileNav();
      }
    });
  }

  // FAQ accordion (services page)
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (el) { el.classList.remove('open'); });
      if (!isOpen) item.classList.add('open');
    });
  });

  // Listings filter bar
  var filterBar = document.querySelector('.filter-bar');
  if (filterBar) {
    var buttons = filterBar.querySelectorAll('.filter-btn');
    var cards = document.querySelectorAll('.listing-card');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var filter = btn.getAttribute('data-filter');
        cards.forEach(function (card) {
          var match = filter === 'all' || card.getAttribute('data-category') === filter;
          card.style.display = match ? '' : 'none';
        });
      });
    });
  }

  // Contact form (front-end validation + confirmation state; no backend wired)
  var form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('#name');
      var email = form.querySelector('#email');
      var message = form.querySelector('#message');
      var valid = true;

      [name, email, message].forEach(function (field) {
        var errorEl = field.parentElement.querySelector('.field-error');
        if (!field.value.trim()) {
          valid = false;
          if (errorEl) errorEl.style.display = 'block';
          field.setAttribute('aria-invalid', 'true');
        } else {
          if (errorEl) errorEl.style.display = 'none';
          field.removeAttribute('aria-invalid');
        }
      });

      if (email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        valid = false;
        var emailError = email.parentElement.querySelector('.field-error');
        if (emailError) { emailError.textContent = 'Enter a valid email address.'; emailError.style.display = 'block'; }
        email.setAttribute('aria-invalid', 'true');
      }

      if (valid) {
        form.style.display = 'none';
        document.querySelector('.form-success').style.display = 'flex';
      }
    });
  }

  // Active nav link highlighting based on current page
  var current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-main a, .mobile-nav a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
});
