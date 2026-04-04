/* ==========================================================
   main.js — Portfolio Content Population + Chatbot
   Marquee, Experience, Skills, Education, Chatbot
   ========================================================== */

// ============================================================
// AI Tools Marquee
// ============================================================
var toolsList = [
  'Google Antigravity',
  'Claude Code',
  'Cursor',
  'Minimax',
  'Gemini 3.1',
  'Codex 5.4',
  'ChatGpt',
];
var marqueeItems = [].concat(toolsList, toolsList, toolsList, toolsList);
var marqueeContainer = document.getElementById('marquee-container');

marqueeItems.forEach(function (tool) {
  var div = document.createElement('div');
  div.className = 'flex items-center gap-3 px-8';
  div.innerHTML =
    '<i data-lucide="sparkles" class="text-pink-400 w-4 h-4"></i>' +
    '<span class="text-xl font-bold text-slate-700 whitespace-nowrap">' +
    tool +
    '</span>';
  marqueeContainer.appendChild(div);
});

// ============================================================
// Experience
// ============================================================
var experiences = [
  {
    title: 'Internal Audit Assignment',
    company: 'HBL Microfinance',
    location: 'ShahKot, Faisalabad',
    startDate: 'Recent',
    endDate: 'Assignment',
    description:
      'Conducted internal audit assignment for 1 branch, ensuring compliance and operational efficiency.',
  },
  {
    title: 'Accounts Officer',
    company: 'Haris & Co. Engineering Concern PVT. Limited',
    startDate: 'Sep 2025',
    endDate: 'Feb 2026',
    description:
      'Managing financial records, reconciling accounts, and leveraging AI tools to streamline financial operations and reporting.',
  },
  {
    title: 'Accounts & Finance Intern',
    company: 'Haris & Co. Engineering Concern PVT. Limited',
    startDate: 'Jun 2025',
    endDate: 'Sep 2025',
    description:
      'Assisted in financial reporting, data analysis, and day-to-day accounting tasks to support the finance department.',
  },
];

var expContainer = document.getElementById('experience-container');
experiences.forEach(function (exp, index) {
  var div = document.createElement('div');
  div.className =
    'reveal-up clay-card-blue p-6 md:p-8 flex flex-col sm:flex-row gap-4 md:gap-6 items-start';
  div.style.transitionDelay = index * 100 + 'ms';

  var locationHtml = exp.location
    ? '<p class="text-sm font-medium text-slate-500 flex items-center gap-1 mt-1">' +
      '<i data-lucide="map-pin" class="w-[14px] h-[14px]"></i> ' +
      exp.location +
      '</p>'
    : '';

  div.innerHTML =
    '<div class="w-12 h-12 md:w-16 md:h-16 shrink-0 rounded-2xl clay-card flex items-center justify-center bg-white text-blue-500">' +
    '<i data-lucide="briefcase" class="w-6 h-6 md:w-8 md:h-8"></i>' +
    '</div>' +
    '<div class="space-y-3 w-full">' +
    '<div class="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-3">' +
    '<div>' +
    '<h3 class="text-xl md:text-2xl font-bold text-slate-800">' +
    exp.title +
    '</h3>' +
    '<p class="text-base md:text-lg font-bold text-blue-600">' +
    exp.company +
    '</p>' +
    locationHtml +
    '</div>' +
    '<div class="flex items-center gap-2 text-slate-500 font-semibold bg-white/50 px-3 py-1.5 md:px-4 md:py-2 rounded-full w-fit text-xs md:text-sm shrink-0">' +
    '<i data-lucide="calendar" class="w-[14px] h-[14px] md:w-4 md:h-4"></i>' +
    '<span>' +
    exp.startDate +
    ' - ' +
    exp.endDate +
    '</span>' +
    '</div>' +
    '</div>' +
    '<p class="text-slate-600 font-medium leading-relaxed text-sm md:text-base">' +
    exp.description +
    '</p>' +
    '</div>';
  expContainer.appendChild(div);
});

// ============================================================
// Skills / Certifications
// ============================================================
var skills = [
  { name: 'AI Proficient', icon: 'brain-circuit', color: 'text-purple-500', bg: 'bg-purple-100' },
  { name: 'Ai Powered Automations', icon: 'bot', color: 'text-blue-500', bg: 'bg-blue-100' },
  { name: 'UI/UX Design', icon: 'layout', color: 'text-pink-500', bg: 'bg-pink-100' },
  { name: 'Tech Savvy', icon: 'laptop', color: 'text-indigo-500', bg: 'bg-indigo-100' },
  { name: 'Auditing', icon: 'clipboard-check', color: 'text-emerald-500', bg: 'bg-emerald-100' },
  { name: 'Financial Accounting', icon: 'calculator', color: 'text-green-500', bg: 'bg-green-100' },
  { name: 'Pro-Active Approach', icon: 'zap', color: 'text-yellow-500', bg: 'bg-yellow-100' },
  { name: 'Analytical Mindset', icon: 'line-chart', color: 'text-cyan-500', bg: 'bg-cyan-100' },
  { name: 'Critical Thinker', icon: 'lightbulb', color: 'text-orange-500', bg: 'bg-orange-100' },
];

var skillsContainer = document.getElementById('skills-container');
skills.forEach(function (skill, index) {
  var div = document.createElement('div');
  div.className =
    'reveal-scale clay-card bg-white p-3 md:p-4 flex flex-col items-center justify-center text-center gap-2 group cursor-default hover:-translate-y-1 hover:scale-105 transition-all duration-300';
  div.style.transitionDelay = index * 50 + 'ms';

  div.innerHTML =
    '<div class="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center ' +
    skill.bg +
    ' ' +
    skill.color +
    ' group-hover:scale-110 transition-transform duration-300">' +
    '<i data-lucide="' +
    skill.icon +
    '" class="w-5 h-5"></i>' +
    '</div>' +
    '<span class="font-bold text-slate-700 text-xs md:text-sm leading-tight">' +
    skill.name +
    '</span>';
  skillsContainer.appendChild(div);
});

// ============================================================
// Education
// ============================================================
var education = [
  {
    degree: 'Certified Accounting & Finance (CAF)',
    institution: 'Institute of Chartered Accountants of Pakistan (ICAP)',
    startDate: '2023',
    endDate: 'Present',
    description:
      'Status: 7/8 papers passed, 1 remaining. Pursuing Chartered Accountancy with a strong foundation in advanced accounting and finance principles.',
  },
  {
    degree: 'Pre-Requisite Competencies (PRC + AFC)',
    institution: 'Institute of Chartered Accountants of Pakistan (ICAP)',
    startDate: '2021',
    endDate: '2022',
    description: 'Completed foundational courses required for the CA qualification.',
  },
  {
    degree: 'F.Sc (Pre-Engineering)',
    institution: 'Board of Intermediate and Secondary Education',
    location: 'Hafizabad',
    score: '82%',
    startDate: '2018',
    endDate: '2020',
    description:
      'Higher secondary education with a focus on mathematics, physics, and chemistry.',
  },
  {
    degree: 'Matriculation (Science)',
    institution: 'Board of Intermediate and Secondary Education',
    location: 'Hafizabad',
    score: '92.6%',
    startDate: '2016',
    endDate: '2018',
    description: 'Secondary education with a focus on core science subjects.',
  },
];

var eduContainer = document.getElementById('education-container');
education.forEach(function (edu, index) {
  var div = document.createElement('div');
  div.className =
    'reveal-up clay-card-purple p-6 md:p-8 flex flex-col gap-4 md:gap-6 items-start';
  div.style.transitionDelay = index * 100 + 'ms';

  var locationHtml = edu.location
    ? '<span class="flex items-center gap-1 text-xs md:text-sm font-medium text-slate-500 bg-white/60 px-2 py-1 rounded-md">' +
      '<i data-lucide="map-pin" class="w-[14px] h-[14px]"></i> ' +
      edu.location +
      '</span>'
    : '';

  var scoreHtml = edu.score
    ? '<span class="flex items-center gap-1 text-xs md:text-sm font-bold text-emerald-600 bg-emerald-100/60 px-2 py-1 rounded-md">' +
      '<i data-lucide="award" class="w-[14px] h-[14px]"></i> ' +
      edu.score +
      '</span>'
    : '';

  div.innerHTML =
    '<div class="flex justify-between items-start w-full gap-2">' +
    '<div class="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-2xl clay-card flex items-center justify-center bg-white text-purple-500">' +
    '<i data-lucide="graduation-cap" class="w-6 h-6 md:w-7 md:h-7"></i>' +
    '</div>' +
    '<div class="flex items-center gap-1.5 text-slate-500 font-semibold bg-white/50 px-3 py-1.5 rounded-full text-xs md:text-sm shrink-0">' +
    '<i data-lucide="calendar" class="w-[14px] h-[14px]"></i>' +
    '<span>' +
    edu.startDate +
    ' - ' +
    edu.endDate +
    '</span>' +
    '</div>' +
    '</div>' +
    '<div class="space-y-2 w-full">' +
    '<h3 class="text-xl md:text-2xl font-bold text-slate-800">' +
    edu.degree +
    '</h3>' +
    '<p class="text-sm md:text-base font-bold text-purple-600">' +
    edu.institution +
    '</p>' +
    '<div class="flex flex-wrap gap-3 pt-1">' +
    locationHtml +
    scoreHtml +
    '</div>' +
    '<p class="text-slate-600 font-medium leading-relaxed pt-2 text-sm md:text-base">' +
    edu.description +
    '</p>' +
    '</div>';
  eduContainer.appendChild(div);
});

// Re-initialize icons for dynamically created content
lucide.createIcons();

// ============================================================
// Chatbot
// ============================================================
var chatbotToggle = document.getElementById('chatbot-toggle');
var chatbotWindow = document.getElementById('chatbot-window');
var chatbotClose = document.getElementById('chatbot-close');
var chatbotMessages = document.getElementById('chatbot-messages');
var chatbotInput = document.getElementById('chatbot-input');
var chatbotSend = document.getElementById('chatbot-send');
var chatbotFaqs = document.getElementById('chatbot-faqs');

var isChatOpen = false;
var messages = [
  { role: 'bot', text: "Hi! I'm Zameer's AI assistant. How can I help you today?" },
];

var faqs = [
  {
    question: 'What is your core expertise?',
    answer:
      'I specialize in financial accounting, auditing, and leveraging AI tools to automate and streamline financial operations.',
  },
  {
    question: 'What AI tools do you use?',
    answer:
      'I actively use tools like Google Antigravity, Claude Code, Cursor, Gemini 3.1, and ChatGPT to enhance productivity and financial analysis.',
  },
  {
    question: 'Are you open to relocation?',
    answer:
      'Yes, I am open to relocation for the right opportunity that aligns with my career goals in finance and accounting.',
  },
  {
    question: 'Tell me about your HBL audit.',
    answer:
      'I conducted a comprehensive internal audit assignment for an HBL Microfinance branch in ShahKot, Faisalabad, ensuring compliance and operational efficiency.',
  },
];

function toggleChatbot() {
  isChatOpen = !isChatOpen;
  if (isChatOpen) {
    chatbotWindow.classList.remove('opacity-0', 'invisible', 'translate-y-5', 'scale-95');
    chatbotWindow.classList.add('opacity-100', 'visible', 'translate-y-0', 'scale-100');
    scrollChatToBottom();
  } else {
    chatbotWindow.classList.add('opacity-0', 'invisible', 'translate-y-5', 'scale-95');
    chatbotWindow.classList.remove('opacity-100', 'visible', 'translate-y-0', 'scale-100');
  }
}

chatbotToggle.addEventListener('click', toggleChatbot);
chatbotClose.addEventListener('click', toggleChatbot);

function renderMessages() {
  chatbotMessages.innerHTML = '';
  messages.forEach(function (msg) {
    var div = document.createElement('div');
    div.className = 'flex ' + (msg.role === 'user' ? 'justify-end' : 'justify-start');
    div.innerHTML =
      '<div class="max-w-[85%] p-3 rounded-2xl text-sm ' +
      (msg.role === 'user'
        ? 'bg-blue-500 text-white rounded-br-none'
        : 'bg-slate-100 text-slate-800 rounded-bl-none') +
      '">' +
      msg.text +
      '</div>';
    chatbotMessages.appendChild(div);
  });
  scrollChatToBottom();
}

function scrollChatToBottom() {
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function handleSend(text) {
  if (!text.trim()) return;

  messages.push({ role: 'user', text: text });
  chatbotInput.value = '';
  renderMessages();

  setTimeout(function () {
    var faqMatch = faqs.find(function (f) {
      return f.question === text;
    });
    if (faqMatch) {
      messages.push({ role: 'bot', text: faqMatch.answer });
    } else {
      messages.push({
        role: 'bot',
        text: "Thanks for your message! Zameer will get back to you soon. Feel free to reach out via WhatsApp or LinkedIn for an instant reply.",
      });
    }
    renderMessages();
  }, 600);
}

chatbotSend.addEventListener('click', function () {
  handleSend(chatbotInput.value);
});
chatbotInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') handleSend(chatbotInput.value);
});

faqs.forEach(function (faq) {
  var btn = document.createElement('button');
  btn.className =
    'px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600 hover:text-blue-600 hover:border-blue-300 transition-colors shrink-0';
  btn.textContent = faq.question;
  btn.addEventListener('click', function () {
    handleSend(faq.question);
  });
  chatbotFaqs.appendChild(btn);
});

renderMessages();
