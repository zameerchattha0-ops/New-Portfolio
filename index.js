/* ==========================================================
   index.js — Core / Shared Functionality
   Navbar, Utilities, Scroll-to-Top, Intersection Observer
   ========================================================== */

// --- Initialize Lucide Icons ---
lucide.createIcons();

// --- Set Current Year ---
document.getElementById('current-year').textContent = new Date().getFullYear();

// --- Global Utility: Currency Formatter ---
window.formatCurrency = function (val) {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0,
  }).format(val);
};

// --- Prevent Scroll Restoration on Reload ---
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Scroll to top unconditionally on page load
window.scrollTo(0, 0);
// Clear hash to prevent jump down
if (window.location.hash) {
  history.replaceState('', document.title, window.location.pathname + window.location.search);
}


// ============================================================
// Navbar — Mobile Menu
// ============================================================
var mobileMenuBtn = document.getElementById('mobile-menu-btn');
var mobileMenu = document.getElementById('mobile-menu');
var menuIcon = document.getElementById('menu-icon');
var isMenuOpen = false;

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', function () {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
      menuIcon.setAttribute('data-lucide', 'x');
      mobileMenu.classList.remove('opacity-0', 'invisible', 'scale-95', '-translate-y-2');
      mobileMenu.classList.add('opacity-100', 'visible', 'scale-100', 'translate-y-0');
    } else {
      menuIcon.setAttribute('data-lucide', 'menu');
      mobileMenu.classList.add('opacity-0', 'invisible', 'scale-95', '-translate-y-2');
      mobileMenu.classList.remove('opacity-100', 'visible', 'scale-100', 'translate-y-0');
    }
    lucide.createIcons();
  });
}

// Mobile Tools Dropdown
var mobileToolsBtn = document.getElementById('mobile-tools-btn');
var mobileToolsMenu = document.getElementById('mobile-tools-menu');
var mobileToolsIcon = document.getElementById('mobile-tools-icon');
var isToolsOpen = false;

if (mobileToolsBtn) {
  mobileToolsBtn.addEventListener('click', function () {
    isToolsOpen = !isToolsOpen;
    if (isToolsOpen) {
      mobileToolsIcon.setAttribute('data-lucide', 'chevron-up');
      mobileToolsMenu.style.height = mobileToolsMenu.scrollHeight + 'px';
      mobileToolsMenu.classList.remove('opacity-0');
      mobileToolsMenu.classList.add('opacity-100');
    } else {
      mobileToolsIcon.setAttribute('data-lucide', 'chevron-down');
      mobileToolsMenu.style.height = '0px';
      mobileToolsMenu.classList.add('opacity-0');
      mobileToolsMenu.classList.remove('opacity-100');
    }
    lucide.createIcons();
  });
}

// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(function (link) {
  link.addEventListener('click', function () {
    isMenuOpen = false;
    menuIcon.setAttribute('data-lucide', 'menu');
    mobileMenu.classList.add('opacity-0', 'invisible', 'scale-95', '-translate-y-2');
    mobileMenu.classList.remove('opacity-100', 'visible', 'scale-100', 'translate-y-0');
    lucide.createIcons();
  });
});

// Navbar entrance animation
setTimeout(function () {
  document.getElementById('navbar').classList.remove('translate-y-[-100px]');
}, 100);

// ============================================================
// Scroll-to-Top Button
// ============================================================
var scrollToTopBtn = document.getElementById('scroll-to-top');
var scrollProgress = document.getElementById('scroll-progress');

window.addEventListener('scroll', function () {
  // Scroll-to-top button visibility
  if (window.pageYOffset > 80) {
    scrollToTopBtn.classList.remove('opacity-0', 'invisible', 'scale-50');
    scrollToTopBtn.classList.add('opacity-100', 'visible', 'scale-100');
  } else {
    scrollToTopBtn.classList.add('opacity-0', 'invisible', 'scale-50');
    scrollToTopBtn.classList.remove('opacity-100', 'visible', 'scale-100');
  }

  // Scroll progress bar
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrollPercent = (scrollTop / docHeight) * 100;
  if (scrollProgress) {
    scrollProgress.style.width = scrollPercent + '%';
  }
});

if (scrollToTopBtn) {
  scrollToTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============================================================
// Intersection Observer for Reveal Animations
// (runs after all scripts via DOMContentLoaded)
// ============================================================
window.addEventListener('DOMContentLoaded', function () {
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: '0px', threshold: 0.1 }
  );

  document.querySelectorAll('.reveal-up, .reveal-scale').forEach(function (el) {
    observer.observe(el);
  });

  // Generate Hero Sparkles
  var sparkleField = document.getElementById('sparkle-field');
  if (sparkleField) {
    var numSparkles = window.innerWidth < 768 ? 20 : 40;
    for (var i = 0; i < numSparkles; i++) {
      var s = document.createElement('div');
      s.className = 'sparkle';
      s.style.left = Math.random() * 100 + '%';
      s.style.top = Math.random() * 100 + '%';
      s.style.animationDuration = (Math.random() * 3 + 2) + 's';
      s.style.animationDelay = (Math.random() * 5) + 's';
      sparkleField.appendChild(s);
    }
  }

  // Cool Text Blur Reveal Animation Setup (Splits words/letters)
  document.querySelectorAll('.split-text-blur').forEach(function(el) {
    var text = el.innerText;
    el.innerHTML = '';
    var words = text.split(' ');
    words.forEach(function(word, wordIndex) {
      var wordSpan = document.createElement('span');
      wordSpan.style.display = 'inline-block';
      wordSpan.style.whiteSpace = 'nowrap';
      for (var i = 0; i < word.length; i++) {
        var charSpan = document.createElement('span');
        charSpan.innerText = word[i];
        charSpan.className = 'blur-char';
        // Randomize delay slightly for an organic reveal effect
        var delay = (wordIndex * 0.1) + (i * 0.03) + (Math.random() * 0.1);
        charSpan.style.animationDelay = delay + 's';
        wordSpan.appendChild(charSpan);
      }
      el.appendChild(wordSpan);
      // Add space after word
      if (wordIndex < words.length - 1) {
        var space = document.createElement('span');
        space.innerHTML = '&nbsp;';
        el.appendChild(space);
      }
    });
  });
});
