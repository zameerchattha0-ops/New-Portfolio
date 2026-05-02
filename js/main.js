/* ================================================================
   ZAMEER PORTFOLIO - Main JavaScript
   Hamburger, scroll, reveal, 3D tilt, accordion, lightbox, flipper
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // --- Hamburger Menu ---
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  const overlay = document.getElementById('navOverlay');

  function toggleNav() {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleNav);
    if (overlay) overlay.addEventListener('click', toggleNav);
    nav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (nav.classList.contains('active')) toggleNav();
      });
    });
  }

  // --- Header Scroll + Back-to-Top ---
  const header = document.getElementById('header');
  const scrollProgress = document.getElementById('scrollProgress');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 50);
    if (scrollProgress) {
      const scrollH = document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollH > 0 ? (window.scrollY / scrollH) * 100 : 0;
      scrollProgress.style.width = pct + '%';
    }
    if (backToTop) {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Active Nav Link on Scroll ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', updateActiveLink);

  // --- Scroll Reveal (Intersection Observer) ---
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => observer.observe(el));
  }

  // --- Animated Skill Bars on Scroll ---
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  if (skillBars.length) {
    const barObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          barObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    skillBars.forEach(bar => barObserver.observe(bar));
  }

  // --- 3D Tilt Effect on Cards ---
  const isTouchDevice = 'ontouchstart' in window;
  if (!isTouchDevice) {
    document.querySelectorAll('.card-3d, .timeline-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;
        card.classList.add('tilt-active');
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.02)`;
        card.style.boxShadow = `${-rotateY * 2}px ${rotateX * 2 + 12}px 40px rgba(0,0,0,0.12)`;
      });
      card.addEventListener('mouseleave', () => {
        card.classList.remove('tilt-active');
        card.style.transform = '';
        card.style.boxShadow = '';
      });
    });
  }

  // --- Tools Accordion ---
  document.querySelectorAll('.accordion-header').forEach(hdr => {
    hdr.addEventListener('click', () => {
      const body = hdr.nextElementSibling;
      const isActive = hdr.classList.contains('active');

      // Close all others
      document.querySelectorAll('.accordion-header.active').forEach(h => {
        if (h !== hdr) {
          h.classList.remove('active');
          h.nextElementSibling.classList.remove('active');
        }
      });

      // Toggle current
      hdr.classList.toggle('active', !isActive);
      body.classList.toggle('active', !isActive);
    });
  });

  // --- Role Flipper ---
  const flipper = document.getElementById('roleFlipper');
  if (flipper) {
    const roles = [
      'CA Aspirant',
      'Internal Audit Intern',
      'Accounts & Finance Professional',
      'AI & Agentic IDE Specialist',
      'UI/UX & Graphics Designer',
      'Prompt Engineer'
    ];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function typeRole() {
      const current = roles[roleIdx];
      if (isDeleting) {
        flipper.textContent = current.substring(0, charIdx - 1);
        charIdx--;
        typingSpeed = 40;
      } else {
        flipper.textContent = current.substring(0, charIdx + 1);
        charIdx++;
        typingSpeed = 80;
      }

      if (!isDeleting && charIdx === current.length) {
        typingSpeed = 2000; // pause at end
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        typingSpeed = 400;
      }

      setTimeout(typeRole, typingSpeed);
    }
    setTimeout(typeRole, 1200);
  }

  // --- Lightbox (AI Graphics Page) ---
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const galleryCards = document.querySelectorAll('.gallery-card');
  let currentGalleryIdx = 0;

  function openLightbox(idx) {
    const img = galleryCards[idx] && galleryCards[idx].querySelector('img');
    if (img && lightbox && lightboxImg) {
      currentGalleryIdx = idx;
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  galleryCards.forEach((card, i) => {
    card.addEventListener('click', () => openLightbox(i));
  });

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (lightbox) lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    currentGalleryIdx = (currentGalleryIdx - 1 + galleryCards.length) % galleryCards.length;
    openLightbox(currentGalleryIdx);
  });
  if (lightboxNext) lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    currentGalleryIdx = (currentGalleryIdx + 1) % galleryCards.length;
    openLightbox(currentGalleryIdx);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
    if (lightbox && lightbox.classList.contains('active')) {
      if (e.key === 'ArrowLeft' && lightboxPrev) lightboxPrev.click();
      if (e.key === 'ArrowRight' && lightboxNext) lightboxNext.click();
    }
  });
});
