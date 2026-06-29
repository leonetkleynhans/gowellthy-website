/* ============================
   GOWELLTHY — INTERACTIONS
   ============================ */

// NAV SCROLL BEHAVIOUR
const nav = document.getElementById('nav');
if (nav) {
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// MOBILE NAV TOGGLE
const navToggle = document.getElementById('navToggle');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const navLinks = document.querySelector('.nav-links');
    const isOpen = navLinks.style.display === 'flex';
    navLinks.style.display = isOpen ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'fixed';
    navLinks.style.top = '70px';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.background = 'rgba(255,255,255,0.98)';
    navLinks.style.backdropFilter = 'blur(12px)';
    navLinks.style.padding = '24px 32px 32px';
    navLinks.style.gap = '20px';
    navLinks.style.zIndex = '99';
    navLinks.style.boxShadow = '0 8px 32px rgba(30,36,36,0.12)';
    if (!isOpen) {
      Array.from(navLinks.querySelectorAll('a')).forEach(a => {
        a.style.color = 'var(--dark)';
        a.style.fontSize = '1rem';
      });
    }
  });
}

// FAQ ACCORDION
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.closest('.faq-item');
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

// SCROLL REVEAL ANIMATION
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll(
  '.pillar, .audience-card, .testimonial, .benefit-card, .add-on-card, .pricing-card, .science-box'
).forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s`;
  revealObserver.observe(el);
});

document.addEventListener('animationend', () => {}, false);

// Add revealed class style
const style = document.createElement('style');
style.textContent = `.revealed { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);

// BOOKING FORM SUBMISSION
function handleBooking(e) {
  e.preventDefault();
  const form = document.getElementById('bookingForm');
  const success = document.getElementById('bookingSuccess');
  if (form && success) {
    form.style.display = 'none';
    success.style.display = 'block';
  }
}

// PAYMENT PLAN SWITCHER
const plans = {
  single:  { name: '1 Treatment',    desc: '1 × 15–20 min XomatiX session',          savings: '—',      total: 'R450'   },
  pack6:   { name: '6 Treatments',   desc: '6 × 15–20 min sessions · R366/session',  savings: '−R500',  total: 'R2,200' },
  pack10:  { name: '10 Treatments',  desc: '10 × 15–20 min sessions · R380/session', savings: '−R700',  total: 'R3,800' },
  pack12:  { name: '12 Treatments',  desc: '12 × 15–20 min sessions · R375/session', savings: '−R900',  total: 'R4,500' },
};

function updatePlan(radio) {
  const plan = plans[radio.value];
  if (!plan) return;

  const nameEl    = document.querySelector('#selectedPlan .item-name');
  const descEl    = document.querySelector('#selectedPlan .item-desc');
  const savingsEl = document.getElementById('savings');
  const totalEl   = document.getElementById('totalAmount');
  const payBtn    = document.getElementById('payAmount');

  if (nameEl)    nameEl.textContent    = plan.name;
  if (descEl)    descEl.textContent    = plan.desc;
  if (savingsEl) savingsEl.textContent = plan.savings;
  if (totalEl)   totalEl.textContent   = plan.total;
  if (payBtn)    payBtn.textContent    = plan.total;

  // Highlight selected label border
  document.querySelectorAll('.plan-option').forEach(l => l.style.borderColor = 'transparent');
  radio.closest('label').style.borderColor = 'var(--teal)';
}

// PAYMENT METHOD SELECTOR
function selectMethod(el) {
  document.querySelectorAll('.pay-method').forEach(m => m.classList.remove('active'));
  el.classList.add('active');
}

// PAYMENT FORM SUBMISSION
function handlePayment(e) {
  e.preventDefault();
  const form    = document.getElementById('paymentForm');
  const success = document.getElementById('paySuccess');
  if (form && success) {
    const btn = document.getElementById('payBtn');
    if (btn) { btn.textContent = 'Processing…'; btn.disabled = true; }
    setTimeout(() => {
      form.style.display    = 'none';
      success.style.display = 'block';
    }, 1800);
  }
}

// CONTACT FORM SUBMISSION
function handleContact(e) {
  e.preventDefault();
  const form = document.getElementById('contactForm');
  const success = document.getElementById('contactSuccess');
  if (form && success) {
    form.style.display = 'none';
    success.style.display = 'block';
  }
}

// SET MIN DATE TO TODAY ON BOOKING FORM
const dateInput = document.getElementById('date');
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today;
}

// READ URL PARAMS TO PRE-SELECT PLAN ON PAYMENT PAGE
const params = new URLSearchParams(window.location.search);
const planParam = params.get('plan');
if (planParam) {
  const map = { 'single': 'single', 'pack6': 'pack6', 'pack10': 'pack10', 'pack12': 'pack12' };
  const key = map[planParam];
  if (key) {
    const radio = document.querySelector(`input[name="plan"][value="${key}"]`);
    if (radio) { radio.checked = true; updatePlan(radio); }
  }
}
