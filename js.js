/* ============================================================
   js.js  –  Shinynove  (shared across all pages)
   Every getElementById is null-guarded so this file works
   safely on index.html, services.html, about.html, contact.html
   ============================================================ */


/* ─────────────────────────────────────────────
   1.  NAVBAR  –  mobile hamburger toggle
   (exposed on window so inline onclick= works)
───────────────────────────────────────────── */
window.toggleMenu = function () {
  const menu = document.getElementById('mobile-menu');
  const btn  = document.getElementById('hamburger');
  if (!menu || !btn) return;
  menu.classList.toggle('open');
  btn.classList.toggle('open');
};


/* ─────────────────────────────────────────────
   2.  HERO  –  canvas bubble animation
   (runs immediately; canvas handles its own
    existence check)
───────────────────────────────────────────── */
(function initBubbleCanvas() {
  const canvas = document.getElementById('bubble-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  let bubbles = [];

  function makeBubble(randomY) {
    const r = 5 + Math.random() * 30;
    return {
      x:      Math.random() * canvas.width,
      y:      randomY ? Math.random() * canvas.height : canvas.height + r + Math.random() * 80,
      r,
      speed:  0.25 + Math.random() * 0.85,
      drift:  (Math.random() - 0.5) * 0.4,
      alpha:  0.07 + Math.random() * 0.25,
      phase:  Math.random() * Math.PI * 2,
      wobble: 0.3  + Math.random() * 0.9,
    };
  }

  function init() {
    bubbles = [];
    const count = Math.max(30, Math.floor(canvas.width / 28));
    for (let i = 0; i < count; i++) bubbles.push(makeBubble(true));
  }

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frame++;

    bubbles.forEach((b, i) => {
      const wx = Math.sin(frame * 0.017 * b.wobble + b.phase) * 16;

      ctx.save();
      ctx.beginPath();
      ctx.arc(b.x + wx, b.y, b.r, 0, Math.PI * 2);

      const g = ctx.createRadialGradient(
        b.x + wx - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.05,
        b.x + wx,              b.y,              b.r
      );
      g.addColorStop(0,   `rgba(255,255,255,${b.alpha * 2.4})`);
      g.addColorStop(0.5, `rgba(255,255,255,${b.alpha * 0.55})`);
      g.addColorStop(1,   `rgba(255,255,255,${b.alpha * 0.08})`);

      ctx.fillStyle   = g;
      ctx.fill();
      ctx.strokeStyle = `rgba(255,255,255,${b.alpha * 1.6})`;
      ctx.lineWidth   = 1.2;
      ctx.stroke();

      // Specular highlight dot
      ctx.beginPath();
      ctx.arc(b.x + wx - b.r * 0.34, b.y - b.r * 0.32, b.r * 0.18, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${b.alpha * 3.2})`;
      ctx.fill();
      ctx.restore();

      b.y -= b.speed;
      b.x += b.drift;
      if (b.y + b.r < 0) bubbles[i] = makeBubble(false);
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); init(); });
  resize();
  init();
  draw();
})();


/* ─────────────────────────────────────────────
   Everything below needs the DOM to be ready
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {


  /* ───────────────────────────────────────────
     3.  BEFORE / AFTER  image-comparison slider
  ─────────────────────────────────────────── */
  const sliderContainer = document.getElementById('slider-container');
  const sliderControl   = document.getElementById('slider-control');
  const afterWrapper    = document.getElementById('after-wrapper');
  const afterImg        = document.getElementById('after-img');
  const sliderLine      = document.getElementById('slider-line');

  if (sliderContainer && sliderControl && afterWrapper && afterImg && sliderLine) {

    function updateSliderPosition() {
      const value = sliderControl.value;
      afterWrapper.style.width = `${value}%`;
      sliderLine.style.left    = `${value}%`;
    }

    function syncImageWidth() {
      const bounds = sliderContainer.getBoundingClientRect();
      afterImg.style.width  = `${bounds.width}px`;
      afterImg.style.height = `${bounds.height}px`;
    }

    sliderControl.addEventListener('input', updateSliderPosition);
    window.addEventListener('resize', syncImageWidth);
    syncImageWidth();
    updateSliderPosition();
  }


  /* ───────────────────────────────────────────
     4.  TESTIMONIALS  –  dynamic slide switcher
  ─────────────────────────────────────────── */
  const testimonialDataset = [
    {
      rating: "Rated 4.8 / by 1300+ Happy Customers",
      text:   "I'm beyond impressed with cleaning service! The team arrived right on time, worked efficiently, and left my apartment spotless. I've tried other companies before, but none matched their attention to detail.",
      name:   "James Parker",
      role:   "Operations Lead at Agency"
    },
    {
      rating: "Rated 4.9 / by 850+ Office Managers",
      text:   "Our office workspaces have never looked better. They are consistently punctual, follow safety rules perfectly, and leave the corporate floors pristine. Absolute game changers for our workspace hygiene.",
      name:   "Sarah Jenkins",
      role:   "Facilities Coordinator at TechGlobal"
    },
    {
      rating: "Rated 5.0 / by 500+ Luxury Clients",
      text:   "Incredible white-glove treatment! They clean fine upholstery and delicate countertops with absolute caution. The organic products smell crisp and fresh without any chemical irritation.",
      name:   "Michael Chang",
      role:   "Founder, Residence Properties"
    }
  ];

  let activeTestimonialIndex = 0;

  window.switchTestimonial = function (index) {
    activeTestimonialIndex = index;
    const wrapper = document.getElementById('testimonial-content-wrapper');
    if (!wrapper) return;

    wrapper.classList.add('fade-hidden');

    setTimeout(() => {
      const ratingEl = document.getElementById('rating-text');
      const quoteEl  = document.getElementById('quote-text');
      const nameEl   = document.getElementById('author-name');
      const roleEl   = document.getElementById('author-role');

      if (ratingEl) ratingEl.innerText = testimonialDataset[index].rating;
      if (quoteEl)  quoteEl.innerText  = testimonialDataset[index].text;
      if (nameEl)   nameEl.innerText   = testimonialDataset[index].name;
      if (roleEl)   roleEl.innerText   = testimonialDataset[index].role;

      for (let i = 0; i < 3; i++) {
        const overlay = document.getElementById(`avatar-overlay-${i}`);
        const card    = document.getElementById(`avatar-card-${i}`);
        const dot     = document.getElementById(`dot-${i}`);

        if (i === index) {
          if (overlay) overlay.style.opacity = '1';
          if (card)    card.classList.add('border-2', 'border-[#22c55e]', 'scale-[1.03]', 'shadow-xl');
          if (dot)     dot.className = 'w-6 h-1.5 rounded-full bg-[#ff6a00] transition-all duration-300';
        } else {
          if (overlay) overlay.style.opacity = '0';
          if (card)    card.classList.remove('border-2', 'border-[#22c55e]', 'scale-[1.03]', 'shadow-xl');
          if (dot)     dot.className = 'w-2.5 h-1.5 rounded-full bg-white/20 transition-all duration-300';
        }
      }

      wrapper.classList.remove('fade-hidden');
    }, 200);
  };

  // Init first testimonial if the section exists
  if (document.getElementById('testimonial-content-wrapper')) {
    window.switchTestimonial(0);
  }


  /* ───────────────────────────────────────────
     5.  HOME SERVICES  –  horizontal auto-scroll
         (#scroll-container on index.html only)
  ─────────────────────────────────────────── */
  const scrollContainer = document.getElementById('scroll-container');

  if (scrollContainer) {
    const scrollSpeed   = 1.5;
    let   scrollPaused  = false;

    // Duplicate content for seamless infinite loop
    scrollContainer.innerHTML += scrollContainer.innerHTML;

    function startAutoScroll() {
      if (!scrollPaused) {
        scrollContainer.scrollLeft += scrollSpeed;
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
      requestAnimationFrame(startAutoScroll);
    }

    scrollContainer.addEventListener('mouseenter', () => scrollPaused = true);
    scrollContainer.addEventListener('mouseleave', () => scrollPaused = false);
    scrollContainer.addEventListener('touchstart', () => scrollPaused = true,  { passive: true });
    scrollContainer.addEventListener('touchend',   () => scrollPaused = false, { passive: true });

    startAutoScroll();
  }


  /* ───────────────────────────────────────────
     6.  SCROLL REVEAL  (all pages)
  ─────────────────────────────────────────── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


  /* ───────────────────────────────────────────
     7.  TICKER / MARQUEE  (services.html)
  ─────────────────────────────────────────── */
  const ticker = document.getElementById('ticker');

  if (ticker) {
    const tickerItems = [
      'Home Cleaning', 'Office Cleaning', 'First Cleaning', 'Deep Cleaning',
      'Carpet Washing', 'Window Cleaning', 'Post-Construction',
      'Eco-Friendly',  'Move-In Cleaning', 'Pressure Washing',
    ];

    function buildTickerSet() {
      const delays = ['', 'animate-star-spin-d1', 'animate-star-spin-d2', 'animate-star-spin-d3'];
      return tickerItems.map((label, i) => `
        <span class="inline-flex items-center gap-5 mx-6">
          <span class="animate-star-spin ${delays[i % delays.length]} inline-block text-[#f5c518] text-2xl leading-none"
                style="filter:drop-shadow(0 0 4px rgba(245,197,24,0.6))">✦</span>
          <span class="text-outline text-3xl sm:text-4xl font-black tracking-tight uppercase">${label}</span>
        </span>
      `).join('');
    }

    const tickerSet  = buildTickerSet();
    ticker.innerHTML = tickerSet + tickerSet; // doubled for seamless loop
  }


  /* ───────────────────────────────────────────
     8.  HOW IT WORKS  –  floating particles
         (#particles on services.html)
  ─────────────────────────────────────────── */
  const particlesContainer = document.getElementById('particles');

  if (particlesContainer) {
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      const s = Math.random() * 3.5 + 1.5;
      p.style.cssText = `
        position:absolute;
        width:${s}px; height:${s}px;
        border-radius:50%;
        background:rgba(255,255,255,0.35);
        left:${Math.random() * 100}%;
        bottom:${Math.random() * 35}%;
        animation:particleDrift ${4 + Math.random() * 6}s linear ${Math.random() * 5}s infinite;
      `;
      particlesContainer.appendChild(p);
    }
  }


  /* ───────────────────────────────────────────
     9.  HOW IT WORKS  –  mist burst on hover
         (.step-circle elements)
  ─────────────────────────────────────────── */
  document.querySelectorAll('.step-circle').forEach(circle => {
    const group = circle.closest('.step-group');
    if (!group) return;

    group.addEventListener('mouseenter', () => {
      for (let i = 0; i < 7; i++) {
        const angle = (i / 7) * 360;
        const tx    = Math.cos(angle * Math.PI / 180) * 52;
        const ty    = Math.sin(angle * Math.PI / 180) * 52;

        const m = document.createElement('div');
        m.style.cssText = `
          position:absolute; width:7px; height:7px;
          border-radius:50%; background:rgba(245,197,24,0.65);
          left:50%; top:50%; margin-left:-3.5px; margin-top:-3.5px;
          --tx:${tx}px; --ty:${ty}px;
          animation:mistRise 0.65s ease forwards;
          pointer-events:none; z-index:30;
        `;
        circle.parentElement.appendChild(m);
        setTimeout(() => m.remove(), 650);
      }
    });
  });


  /* ───────────────────────────────────────────
     10.  "HIRE US" button  →  contact.html
  ─────────────────────────────────────────── */
  const hireBtn = document.getElementById('hireUsBtn');
  if (hireBtn) {
    hireBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'contact.html';
    });
  }


}); // end DOMContentLoaded



