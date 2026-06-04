
 
 
 
 ////navbar
 function toggleMenu() {
      const menu = document.getElementById('mobile-menu');
      const btn = document.getElementById('hamburger');
      if (!menu || !btn) return;
      menu.classList.toggle('open');
      btn.classList.toggle('open');
    }


//// HERO part
  const canvas = document.getElementById('bubble-canvas');
if (canvas) {
  const ctx    = canvas.getContext('2d');
  function resize() { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; }
  window.addEventListener('resize', () => { resize(); init(); });
  resize();
 
  let bubbles = [];
  function makeBubble(random) {
    const r = 5 + Math.random() * 30;
    return {
      x: Math.random() * canvas.width,
      y: random ? Math.random() * canvas.height : canvas.height + r + Math.random() * 80,
      r,
      speed:  0.25 + Math.random() * 0.85,
      drift:  (Math.random() - 0.5) * 0.4,
      alpha:  0.07 + Math.random() * 0.25,
      phase:  Math.random() * Math.PI * 2,
      wobble: 0.3 + Math.random() * 0.9,
    };
  }
  function init() {
    bubbles = [];
    const count = Math.max(30, Math.floor(canvas.width / 28));
    for (let i = 0; i < count; i++) bubbles.push(makeBubble(true));
  }
  init();
 
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
        b.x + wx, b.y, b.r
      );
      g.addColorStop(0,   `rgba(255,255,255,${b.alpha * 2.4})`);
      g.addColorStop(0.5, `rgba(255,255,255,${b.alpha * 0.55})`);
      g.addColorStop(1,   `rgba(255,255,255,${b.alpha * 0.08})`);
      ctx.fillStyle = g;
      ctx.fill();
      ctx.strokeStyle = `rgba(255,255,255,${b.alpha * 1.6})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();
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
  draw();
}


//// COMPONENT FUNCTIONALITY SCRIPT     after and before        -->


  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('slider-container');
    const control = document.getElementById('slider-control');
    const afterWrapper = document.getElementById('after-wrapper');
    const afterImg = document.getElementById('after-img');
    const sliderLine = document.getElementById('slider-line');

    if (!container || !control || !afterWrapper || !afterImg || !sliderLine) return;

    function updateSliderPosition() {
      const value = control.value;
      
      // Update the clip dimension of the top wrapper layer
      afterWrapper.style.width = `${value}%`;
      
      // Pin the divider asset and knob explicitly to the current slider percentage
      sliderLine.style.left = `${value}%`;
    }

    function syncImageWidth() {
      // Keep the overlay bounding image dimensions matching container bounding rect exactly
      const bounds = container.getBoundingClientRect();
      afterImg.style.width = `${bounds.width}px`;
      afterImg.style.height = `${bounds.height}px`;
    }

    // Attach immediate input triggers
    control.addEventListener('input', updateSliderPosition);
    
    // Ensure responsive resizing calculates real bounds on structural window shifts
    window.addEventListener('resize', syncImageWidth);
    
    // Initializing triggers
    syncImageWidth();
    updateSliderPosition();
  });


  // Dynamic Slider Content Array
  const dataset = [
    {
      rating: "Rated 4.8 / by 1300+ Happy Customers",
      text: "I'm beyond impressed with cleaning service! The team arrived right on time, worked efficiently, and left my apartment spotless. I've tried other companies before, but none matched their attention to detail.",
      name: "James Parker",
      role: "Operations Lead at Agency"
    },
    {
      rating: "Rated 4.9 / by 850+ Office Managers",
      text: "Our office workspaces have never looked better. They are consistently punctual, follow safety rules perfectly, and leave the corporate floors pristine. Absolute game changers for our workspace hygiene.",
      name: "Sarah Jenkins",
      role: "Facilities Coordinator at TechGlobal"
    },
    {
      rating: "Rated 5.0 / by 500+ Luxury Clients",
      text: "Incredible white-glove treatment! They clean fine upholstery and delicate countertops with absolute caution. The organic products smell crisp and fresh without any chemical irritation.",
      name: "Michael Chang",
      role: "Founder, Residence Properties"
    }
  ];

  let activeIndex = 0;

  function switchTestimonial(index) {
    activeIndex = index;
    const wrapper = document.getElementById('testimonial-content-wrapper');
    if (!wrapper) return;
    
    // Begin fade-out animation sequence
    wrapper.classList.add('fade-hidden');
    
    setTimeout(() => {
      // Inject updated text nodes
      document.getElementById('rating-text').innerText = dataset[index].rating;
      document.getElementById('quote-text').innerText = dataset[index].text;
      document.getElementById('author-name').innerText = dataset[index].name;
      document.getElementById('author-role').innerText = dataset[index].role;
      
      // Update UI panels for active portrait cards and bottom dots indicators
      for (let i = 0; i < 3; i++) {
        const overlay = document.getElementById(`avatar-overlay-${i}`);
        const card = document.getElementById(`avatar-card-${i}`);
        const dot = document.getElementById(`dot-${i}`);
        
        if (i === index) {
          // Highlight active targets
          overlay.style.opacity = '1';
          card.classList.add('border-2', 'border-[#22c55e]', 'scale-[1.03]', 'shadow-xl');
          dot.className = "w-6 h-1.5 rounded-full bg-[#ff6a00] transition-all duration-300";
        } else {
          // Reset inactive elements
          overlay.style.opacity = '0';
          card.classList.remove('border-2', 'border-[#22c55e]', 'scale-[1.03]', 'shadow-xl');
          dot.className = "w-2.5 h-1.5 rounded-full bg-white/20 transition-all duration-300";
        }
      }
      
      // Clear visibility lock / run fade-in transition
      wrapper.classList.remove('fade-hidden');
    }, 200);
  }

  // Set initial slider target state upon DOM deployment
  document.addEventListener('DOMContentLoaded', () => {
    switchTestimonial(0);
  });

  ////services section
////services section
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("services-carousel");
  const dotsContainer = document.getElementById("carousel-dots");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  if (!carousel || !dotsContainer) return;

  const cards = Array.from(carousel.children);
  if (!cards.length) return;

  // ⚡ DECREASED DELAY: Autoplay moves faster (2000ms instead of 3000ms)
  const AUTOPLAY_DELAY = 2000; 
  let activeIndex = 0;
  let autoplayTimer = null;
  let isScrolling = false;

  let cardWidth = 0;
  let gap = 0;

  function measureCard() {
    cardWidth = cards[0].getBoundingClientRect().width;
    gap = parseFloat(window.getComputedStyle(carousel).gap) || 0;
  }

  // ─── Dots ───────────────────────────────────────────────────────────────────
  // Pre-compiled dot template for ultra-fast DOM generation
  const activeClass = "h-2 rounded-full transition-all duration-200 bg-[#3cd175] w-8";
  const inactiveClass = "h-2 rounded-full transition-all duration-200 bg-[#d1d5db] w-2";

  function setupDots() {
    const fragment = document.createDocumentFragment();
    cards.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = i === activeIndex ? activeClass : inactiveClass;
      dot.setAttribute("aria-label", `Go to service slide ${i + 1}`);
      dot.addEventListener("click", () => {
        stopAutoplay();
        goTo(i);
        startAutoplay();
      });
      fragment.appendChild(dot);
    });
    dotsContainer.innerHTML = "";
    dotsContainer.appendChild(fragment);
  }

  function updateDots() {
    const dots = dotsContainer.children;
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = i === activeIndex ? activeClass : inactiveClass;
    }
  }

  // ─── Scrolling ──────────────────────────────────────────────────────────────
  function goTo(index) {
    if (index < 0 || index >= cards.length) return;
    activeIndex = index;
    isScrolling = true;

    // NOTE: For true customized "fast" speeds, handle this via CSS `scroll-behavior`
    carousel.scrollTo({
      left: index * (cardWidth + gap),
      behavior: "smooth",
    });

    updateDots();

    clearTimeout(carousel._scrollLock);
    // ⚡ DECREASED LOCKOUT: Lock released faster (150ms) to match Snappy CSS feel
    carousel._scrollLock = setTimeout(() => {
      isScrolling = false;
    }, 150); 
  }

  // ─── Manual swipe detection (Debounced/Throttled via requestAnimationFrame) ──
  let scrollTimeout;
  carousel.addEventListener("scroll", () => {
    if (isScrolling) return;

    if (scrollTimeout) cancelAnimationFrame(scrollTimeout);
    
    scrollTimeout = requestAnimationFrame(() => {
      const calculated = Math.round(carousel.scrollLeft / (cardWidth + gap));
      if (calculated !== activeIndex && calculated >= 0 && calculated < cards.length) {
        activeIndex = calculated;
        updateDots();
      }
    });
  }, { passive: true }); // ⚡ PASSIVE EVENT: Speeds up touch/scroll performance

  // ─── Arrow buttons ──────────────────────────────────────────────────────────
  prevBtn?.addEventListener("click", () => {
    stopAutoplay();
    goTo((activeIndex - 1 + cards.length) % cards.length);
    startAutoplay();
  });

  nextBtn?.addEventListener("click", () => {
    stopAutoplay();
    goTo((activeIndex + 1) % cards.length);
    startAutoplay();
  });

  // ─── Autoplay ───────────────────────────────────────────────────────────────
  function startAutoplay() {
    if (autoplayTimer) return; // Prevent duplicate intervals
    autoplayTimer = setInterval(() => {
      goTo((activeIndex + 1) % cards.length);
    }, AUTOPLAY_DELAY);
  }

  function stopAutoplay() {
    clearInterval(autoplayTimer);
    autoplayTimer = null;
  }

  carousel.addEventListener("mouseenter", stopAutoplay);
  carousel.addEventListener("touchstart", stopAutoplay, { passive: true });
  carousel.addEventListener("mouseleave", startAutoplay);
  carousel.addEventListener("touchend", startAutoplay, { passive: true });

  // ─── Resize handling ────────────────────────────────────────────────────────
  // Debounced resize observer to prevent layout thrashing on window drag
  let resizeTimeout;
  const ro = new ResizeObserver(() => {
    if (resizeTimeout) cancelAnimationFrame(resizeTimeout);
    resizeTimeout = requestAnimationFrame(() => {
      measureCard();
      carousel.scrollTo({ left: activeIndex * (cardWidth + gap), behavior: "instant" });
    });
  });
  ro.observe(carousel);

  // ─── Init ───────────────────────────────────────────────────────────────────
  requestAnimationFrame(() => {
    measureCard();
    setupDots();
    startAutoplay();
  });
});


////services page
// Mobile menu
  function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    const hamburger = document.getElementById('hamburger');
    menu.classList.toggle('open');
    hamburger.classList.toggle('open');
  }

 

  // Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


  
//////bar tracker
// ── Items to scroll
  const items = [
    'Home Cleaning',
    'Office Cleaning',
    'First Cleaning',
    'Deep Cleaning',
    'Carpet Washing',
    'Window Cleaning',
    'Post-Construction',
    'Eco-Friendly',
    'Move-In Cleaning',
    'Pressure Washing',
  ];
 
  // ── Build one set of items (star + text)
  function buildSet() {
    return items.map((label, i) => {
      const delays = ['', 'animate-star-spin-d1', 'animate-star-spin-d2', 'animate-star-spin-d3'];
      const delayClass = delays[i % delays.length];
      return `
        <span class="inline-flex items-center gap-5 mx-6">
          <!-- Star separator -->
          <span class="animate-star-spin ${delayClass} inline-block text-[#f5c518] text-2xl leading-none" style="filter:drop-shadow(0 0 4px rgba(245,197,24,0.6))">✦</span>
          <!-- Outlined label -->
          <span class="text-outline text-3xl sm:text-4xl font-black tracking-tight uppercase">
            ${label}
          </span>
        </span>
      `;
    }).join('');
  }
 
  // ── Inject two identical sets so the loop is seamless
  const track = document.getElementById('ticker');
  const set = buildSet();
  track.innerHTML = set + set; // duplicate = seamless infinite scroll


  
     /* ── Floating particles ── */
  const pc = document.getElementById('particles');
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    const s = Math.random() * 3.5 + 1.5;
    p.style.cssText = `
      position:absolute;
      width:${s}px; height:${s}px;
      border-radius:50%;
      background:rgba(255,255,255,0.35);
      left:${Math.random()*100}%;
      bottom:${Math.random()*35}%;
      animation:particleDrift ${4+Math.random()*6}s linear ${Math.random()*5}s infinite;
    `;
    pc.appendChild(p);
  }
 
  /* ── Mist burst on step hover ── */
  document.querySelectorAll('.step-circle').forEach(circle => {
    circle.closest('.step-group').addEventListener('mouseenter', () => {
      for (let i = 0; i < 7; i++) {
        const m = document.createElement('div');
        const angle = (i / 7) * 360;
        const tx = Math.cos(angle * Math.PI / 180) * 52;
        const ty = Math.sin(angle * Math.PI / 180) * 52;
        m.style.cssText = `
          position:absolute;
          width:7px; height:7px;
          border-radius:50%;
          background:rgba(245,197,24,0.65);
          left:50%; top:50%;
          margin-left:-3.5px; margin-top:-3.5px;
          --tx:${tx}px; --ty:${ty}px;
          animation:mistRise 0.65s ease forwards;
          pointer-events:none;
          z-index:30;
        `;
        circle.parentElement.appendChild(m);
        setTimeout(() => m.remove(), 650);
      }
    });
  });

  


document.addEventListener('DOMContentLoaded', () => {
  const hireBtn = document.getElementById('hireUsBtn');

  if (hireBtn) {
    hireBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // Redirects the browser to your separate contact page
      window.location.href = 'contact.html'; 
    });
  }
});