
 
 
 
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
  document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("services-carousel");
  const dotsContainer = document.getElementById("carousel-dots");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  
  if (!carousel || !dotsContainer) return;

  const cards = Array.from(carousel.children);
  let activeIndex = 0;
  let autoplayTimer = null;
  const autoplayDelay = 3000;

  if (!cards.length) return;

  // 1. DYNAMICALLY GENERATE DOT INDICATORS
  function setupDots() {
    dotsContainer.innerHTML = "";
    cards.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.className = "h-2 rounded-full transition-all duration-300";
      dot.setAttribute("aria-label", `Go to service slide ${index + 1}`);
      dot.style.backgroundColor = index === activeIndex ? "#3cd175" : "#d1d5db";
      dot.style.width = index === activeIndex ? "2rem" : "0.5rem";
      
      dot.addEventListener("click", () => {
        stopAutoplay();
        scrollToIndex(index);
        startAutoplay();
      });
      dotsContainer.appendChild(dot);
    });
  }

  // 2. UPDATE ACTIVE DOT LAYOUTS
  function updateDots() {
    const dots = dotsContainer.children;
    for (let i = 0; i < dots.length; i++) {
      if (i === activeIndex) {
        dots[i].style.backgroundColor = "#3cd175";
        dots[i].style.width = "2rem";
      } else {
        dots[i].style.backgroundColor = "#d1d5db";
        dots[i].style.width = "0.5rem";
      }
    }
  }

  // 3. SCROLL HANDLING LOGIC
  function scrollToIndex(index) {
    if (index < 0 || index >= cards.length) return;
    
    const cardWidth = cards[0].offsetWidth;
    // Get the CSS gaps between flex items
    const gap = parseFloat(window.getComputedStyle(carousel).gap) || 0;
    
    carousel.scrollTo({
      left: index * (cardWidth + gap),
      behavior: "smooth"
    });
    
    activeIndex = index;
    updateDots();
  }

  // 4. ARROW BUTTON CLICK HANDLERS
  prevBtn?.addEventListener("click", () => {
    stopAutoplay();
    let targetIndex = activeIndex - 1;
    if (targetIndex < 0) targetIndex = cards.length - 1; // Loop back to end
    scrollToIndex(targetIndex);
    startAutoplay();
  });

  nextBtn?.addEventListener("click", () => {
    stopAutoplay();
    let targetIndex = activeIndex + 1;
    if (targetIndex >= cards.length) targetIndex = 0; // Loop back to start
    scrollToIndex(targetIndex);
    startAutoplay();
  });

  // 5. UPDATE ACTIVE STATE ON MANUAL PHONE SWIPES / SCROLLS
  carousel.addEventListener("scroll", () => {
    const cardWidth = cards[0].offsetWidth;
    const gap = parseFloat(window.getComputedStyle(carousel).gap) || 0;
    
    // Calculate current slide based on current layout positions
    const calculatedIndex = Math.round(carousel.scrollLeft / (cardWidth + gap));
    
    if (calculatedIndex !== activeIndex && calculatedIndex >= 0 && calculatedIndex < cards.length) {
      activeIndex = calculatedIndex;
      updateDots();
    }
  });

  // 6. AUTOPLAY CONTROLS
  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      const nextIndex = (activeIndex + 1) % cards.length;
      scrollToIndex(nextIndex);
    }, autoplayDelay);
  }

  function stopAutoplay() {
    if (!autoplayTimer) return;
    clearInterval(autoplayTimer);
    autoplayTimer = null;
  }

  // Initialize Slider Configurations
  setupDots();
  startAutoplay();
});
