// Initialize Lucide icons
lucide.createIcons();

// Set current year
document.getElementById('current-year').textContent = new Date().getFullYear();

// --- Navbar Mobile Menu ---
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
let isMenuOpen = false;

mobileMenuBtn.addEventListener('click', () => {
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

// Mobile Tools Dropdown
const mobileToolsBtn = document.getElementById('mobile-tools-btn');
const mobileToolsMenu = document.getElementById('mobile-tools-menu');
const mobileToolsIcon = document.getElementById('mobile-tools-icon');
let isToolsOpen = false;

mobileToolsBtn.addEventListener('click', () => {
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

// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    isMenuOpen = false;
    menuIcon.setAttribute('data-lucide', 'menu');
    mobileMenu.classList.add('opacity-0', 'invisible', 'scale-95', '-translate-y-2');
    mobileMenu.classList.remove('opacity-100', 'visible', 'scale-100', 'translate-y-0');
    lucide.createIcons();
  });
});

// Navbar scroll animation
setTimeout(() => {
  document.getElementById('navbar').classList.remove('translate-y-[-100px]');
}, 100);

// --- ScrollToTop ---
const scrollToTopBtn = document.getElementById('scroll-to-top');
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 80) {
    scrollToTopBtn.classList.remove('opacity-0', 'invisible', 'scale-50');
    scrollToTopBtn.classList.add('opacity-100', 'visible', 'scale-100');
  } else {
    scrollToTopBtn.classList.add('opacity-0', 'invisible', 'scale-50');
    scrollToTopBtn.classList.remove('opacity-100', 'visible', 'scale-100');
  }
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// --- Data Population ---

// AiTools Marquee
const toolsList = ["Google Antigravity", "Claude Code", "Cursor", "Minimax", "Gemini 3.1", "Codex 5.4", "ChatGpt"];
const marqueeItems = [...toolsList, ...toolsList, ...toolsList, ...toolsList];
const marqueeContainer = document.getElementById('marquee-container');

marqueeItems.forEach(tool => {
  const div = document.createElement('div');
  div.className = 'flex items-center gap-3 px-8';
  div.innerHTML = `
    <i data-lucide="sparkles" class="text-pink-400 w-4 h-4"></i>
    <span class="text-xl font-bold text-slate-700 whitespace-nowrap">${tool}</span>
  `;
  marqueeContainer.appendChild(div);
});

// Experience
const experiences = [
  {
    title: "Internal Audit Assignment",
    company: "HBL Microfinance",
    location: "ShahKot, Faisalabad",
    startDate: "Recent",
    endDate: "Assignment",
    description: "Conducted internal audit assignment for 1 branch, ensuring compliance and operational efficiency."
  },
  {
    title: "Accounts Officer",
    company: "Haris & Co. Engineering Concern PVT. Limited",
    startDate: "Sep 2025",
    endDate: "Feb 2026",
    description: "Managing financial records, reconciling accounts, and leveraging AI tools to streamline financial operations and reporting."
  },
  {
    title: "Accounts & Finance Intern",
    company: "Haris & Co. Engineering Concern PVT. Limited",
    startDate: "Jun 2025",
    endDate: "Sep 2025",
    description: "Assisted in financial reporting, data analysis, and day-to-day accounting tasks to support the finance department."
  }
];

const expContainer = document.getElementById('experience-container');
experiences.forEach((exp, index) => {
  const div = document.createElement('div');
  div.className = 'reveal-up clay-card-blue p-6 md:p-8 flex flex-col sm:flex-row gap-4 md:gap-6 items-start';
  div.style.transitionDelay = `${index * 100}ms`;
  
  let locationHtml = exp.location ? `
    <p class="text-sm font-medium text-slate-500 flex items-center gap-1 mt-1">
      <i data-lucide="map-pin" class="w-[14px] h-[14px]"></i> ${exp.location}
    </p>
  ` : '';

  div.innerHTML = `
    <div class="w-12 h-12 md:w-16 md:h-16 shrink-0 rounded-2xl clay-card flex items-center justify-center bg-white text-blue-500">
      <i data-lucide="briefcase" class="w-6 h-6 md:w-8 md:h-8"></i>
    </div>
    <div class="space-y-3 w-full">
      <div class="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-3">
        <div>
          <h3 class="text-xl md:text-2xl font-bold text-slate-800">${exp.title}</h3>
          <p class="text-base md:text-lg font-bold text-blue-600">${exp.company}</p>
          ${locationHtml}
        </div>
        <div class="flex items-center gap-2 text-slate-500 font-semibold bg-white/50 px-3 py-1.5 md:px-4 md:py-2 rounded-full w-fit text-xs md:text-sm shrink-0">
          <i data-lucide="calendar" class="w-[14px] h-[14px] md:w-4 md:h-4"></i>
          <span>${exp.startDate} - ${exp.endDate}</span>
        </div>
      </div>
      <p class="text-slate-600 font-medium leading-relaxed text-sm md:text-base">${exp.description}</p>
    </div>
  `;
  expContainer.appendChild(div);
});

// Skills
const skills = [
  { name: "AI Proficiency", icon: "brain-circuit", color: "text-purple-500", bg: "bg-purple-100" },
  { name: "Ai Powered Automations", icon: "bot", color: "text-blue-500", bg: "bg-blue-100" },
  { name: "UI/UX Design", icon: "layout", color: "text-pink-500", bg: "bg-pink-100" },
  { name: "Tech Savvy", icon: "laptop", color: "text-indigo-500", bg: "bg-indigo-100" },
  { name: "Auditing", icon: "clipboard-check", color: "text-emerald-500", bg: "bg-emerald-100" },
  { name: "Financial Accounting", icon: "calculator", color: "text-green-500", bg: "bg-green-100" },
  { name: "Pro-Active Approach", icon: "zap", color: "text-yellow-500", bg: "bg-yellow-100" },
  { name: "Analytical Mindset", icon: "line-chart", color: "text-cyan-500", bg: "bg-cyan-100" },
  { name: "Critical Thinker", icon: "lightbulb", color: "text-orange-500", bg: "bg-orange-100" },
];

const skillsContainer = document.getElementById('skills-container');
skills.forEach((skill, index) => {
  const div = document.createElement('div');
  div.className = 'reveal-scale clay-card bg-white p-3 md:p-4 flex flex-col items-center justify-center text-center gap-2 group cursor-default hover:-translate-y-1 hover:scale-105 transition-all duration-300';
  div.style.transitionDelay = `${index * 50}ms`;
  
  div.innerHTML = `
    <div class="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center ${skill.bg} ${skill.color} group-hover:scale-110 transition-transform duration-300">
      <i data-lucide="${skill.icon}" class="w-5 h-5"></i>
    </div>
    <span class="font-bold text-slate-700 text-xs md:text-sm leading-tight">${skill.name}</span>
  `;
  skillsContainer.appendChild(div);
});

// Education
const education = [
  {
    degree: "Certified Accounting & Finance (CAF)",
    institution: "Institute of Chartered Accountants of Pakistan (ICAP)",
    startDate: "2023",
    endDate: "Present",
    description: "Status: 7/8 papers passed, 1 remaining. Pursuing Chartered Accountancy with a strong foundation in advanced accounting and finance principles."
  },
  {
    degree: "Pre-Requisite Competencies (PRC + AFC)",
    institution: "Institute of Chartered Accountants of Pakistan (ICAP)",
    startDate: "2021",
    endDate: "2022",
    description: "Completed foundational courses required for the CA qualification."
  },
  {
    degree: "F.Sc (Pre-Engineering)",
    institution: "Board of Intermediate and Secondary Education",
    location: "Hafizabad",
    score: "82%",
    startDate: "2018",
    endDate: "2020",
    description: "Higher secondary education with a focus on mathematics, physics, and chemistry."
  },
  {
    degree: "Matriculation (Science)",
    institution: "Board of Intermediate and Secondary Education",
    location: "Hafizabad",
    score: "92.6%",
    startDate: "2016",
    endDate: "2018",
    description: "Secondary education with a focus on core science subjects."
  }
];

const eduContainer = document.getElementById('education-container');
education.forEach((edu, index) => {
  const div = document.createElement('div');
  div.className = 'reveal-up clay-card-purple p-6 md:p-8 flex flex-col gap-4 md:gap-6 items-start';
  div.style.transitionDelay = `${index * 100}ms`;
  
  let locationHtml = edu.location ? `
    <span class="flex items-center gap-1 text-xs md:text-sm font-medium text-slate-500 bg-white/60 px-2 py-1 rounded-md">
      <i data-lucide="map-pin" class="w-[14px] h-[14px]"></i> ${edu.location}
    </span>
  ` : '';
  
  let scoreHtml = edu.score ? `
    <span class="flex items-center gap-1 text-xs md:text-sm font-bold text-emerald-600 bg-emerald-100/60 px-2 py-1 rounded-md">
      <i data-lucide="award" class="w-[14px] h-[14px]"></i> ${edu.score}
    </span>
  ` : '';

  div.innerHTML = `
    <div class="flex justify-between items-start w-full gap-2">
      <div class="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-2xl clay-card flex items-center justify-center bg-white text-purple-500">
        <i data-lucide="graduation-cap" class="w-6 h-6 md:w-7 md:h-7"></i>
      </div>
      <div class="flex items-center gap-1.5 text-slate-500 font-semibold bg-white/50 px-3 py-1.5 rounded-full text-xs md:text-sm shrink-0">
        <i data-lucide="calendar" class="w-[14px] h-[14px]"></i>
        <span>${edu.startDate} - ${edu.endDate}</span>
      </div>
    </div>
    
    <div class="space-y-2 w-full">
      <h3 class="text-xl md:text-2xl font-bold text-slate-800">${edu.degree}</h3>
      <p class="text-sm md:text-base font-bold text-purple-600">${edu.institution}</p>
      
      <div class="flex flex-wrap gap-3 pt-1">
        ${locationHtml}
        ${scoreHtml}
      </div>
      
      <p class="text-slate-600 font-medium leading-relaxed pt-2 text-sm md:text-base">${edu.description}</p>
    </div>
  `;
  eduContainer.appendChild(div);
});

// Tools
const toolsData = [
  { name: "Tax Calculator For Salaried Persons", category: "Salary Tax Calculator", icon: "calculator", color: "text-emerald-500", link: "/tools.html#tax-optimizer" },
  { name: "Wealth Simulator", category: "Interactive Simulator", icon: "line-chart", color: "text-blue-500", link: "/tools.html#wealth-simulator" },
  { name: "Wealth Architecture", category: "Investment Planning", icon: "landmark", color: "text-indigo-500", link: "/tools.html" },
];

const toolsContainer = document.getElementById('tools-container');
toolsData.forEach((tool, index) => {
  const div = document.createElement('div');
  div.className = 'reveal-scale clay-card bg-white p-5 md:p-6 flex flex-col items-center text-center gap-3 md:gap-4 group cursor-pointer hover:-translate-y-1 transition-transform duration-300';
  div.style.transitionDelay = `${index * 50}ms`;
  
  div.innerHTML = `
    <a href="${tool.link}" class="flex flex-col items-center gap-3 md:gap-4 w-full h-full">
      <div class="w-14 h-14 md:w-16 md:h-16 rounded-2xl clay-card bg-slate-50 flex items-center justify-center ${tool.color} group-hover:scale-110 transition-transform duration-300">
        <i data-lucide="${tool.icon}" class="w-6 h-6"></i>
      </div>
      <div>
        <h3 class="text-lg md:text-xl font-bold text-slate-800 group-hover:text-pink-500 transition-colors">${tool.name}</h3>
        <p class="text-xs md:text-sm font-semibold text-slate-500 mt-1">${tool.category}</p>
      </div>
    </a>
  `;
  toolsContainer.appendChild(div);
});

// Re-initialize icons for dynamically added content
lucide.createIcons();

// --- Intersection Observer for Animations ---
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal-up, .reveal-scale').forEach(el => {
  observer.observe(el);
});

// --- Chatbot ---
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotWindow = document.getElementById('chatbot-window');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSend = document.getElementById('chatbot-send');
const chatbotFaqs = document.getElementById('chatbot-faqs');

let isChatOpen = false;
let messages = [
  { role: 'bot', text: "Hi! I'm Zameer's AI assistant. How can I help you today?" }
];

const faqs = [
  { question: "What is your core expertise?", answer: "I specialize in financial accounting, auditing, and leveraging AI tools to automate and streamline financial operations." },
  { question: "What AI tools do you use?", answer: "I actively use tools like Google Antigravity, Claude Code, Cursor, Gemini 3.1, and ChatGPT to enhance productivity and financial analysis." },
  { question: "Are you open to relocation?", answer: "Yes, I am open to relocation for the right opportunity that aligns with my career goals in finance and accounting." },
  { question: "Tell me about your HBL audit.", answer: "I conducted a comprehensive internal audit assignment for an HBL Microfinance branch in ShahKot, Faisalabad, ensuring compliance and operational efficiency." }
];

function toggleChatbot() {
  isChatOpen = !isChatOpen;
  if (isChatOpen) {
    chatbotWindow.classList.remove('opacity-0', 'invisible', 'translate-y-5', 'scale-95');
    chatbotWindow.classList.add('opacity-100', 'visible', 'translate-y-0', 'scale-100');
    scrollToBottom();
  } else {
    chatbotWindow.classList.add('opacity-0', 'invisible', 'translate-y-5', 'scale-95');
    chatbotWindow.classList.remove('opacity-100', 'visible', 'translate-y-0', 'scale-100');
  }
}

chatbotToggle.addEventListener('click', toggleChatbot);
chatbotClose.addEventListener('click', toggleChatbot);

function renderMessages() {
  chatbotMessages.innerHTML = '';
  messages.forEach(msg => {
    const div = document.createElement('div');
    div.className = `flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`;
    div.innerHTML = `
      <div class="max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-slate-100 text-slate-800 rounded-bl-none'}">
        ${msg.text}
      </div>
    `;
    chatbotMessages.appendChild(div);
  });
  scrollToBottom();
}

function scrollToBottom() {
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function handleSend(text) {
  if (!text.trim()) return;
  
  messages.push({ role: 'user', text });
  chatbotInput.value = '';
  renderMessages();

  setTimeout(() => {
    const faqMatch = faqs.find(f => f.question === text);
    if (faqMatch) {
      messages.push({ role: 'bot', text: faqMatch.answer });
    } else {
      messages.push({ role: 'bot', text: "Thanks for your message! Zameer will get back to you soon. Feel free to reach out via WhatsApp or LinkedIn for an instant reply." });
    }
    renderMessages();
  }, 600);
}

chatbotSend.addEventListener('click', () => handleSend(chatbotInput.value));
chatbotInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleSend(chatbotInput.value);
});

faqs.forEach(faq => {
  const btn = document.createElement('button');
  btn.className = 'px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600 hover:text-blue-600 hover:border-blue-300 transition-colors shrink-0';
  btn.textContent = faq.question;
  btn.addEventListener('click', () => handleSend(faq.question));
  chatbotFaqs.appendChild(btn);
});

renderMessages();
