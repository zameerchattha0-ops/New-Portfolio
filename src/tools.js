// Initialize Lucide icons
lucide.createIcons();

// Set current year
document.getElementById('current-year').textContent = new Date().getFullYear();

// Handle hash scroll on load
window.addEventListener('load', () => {
  if (window.location.hash) {
    const id = window.location.hash.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }
});

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

// --- FBR Tax Optimizer ---
const taxAccordionsData = [
  {
    id: 'salary',
    title: '1. Monthly Gross Salary & Allowances',
    content: `
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        <div class="flex flex-col gap-1 md:gap-1.5">
          <label class="text-xs md:text-sm font-semibold text-slate-700">Annual Basic Salary</label>
          <input type="number" id="tax-basic" placeholder="Total Basic for Year" class="px-3 py-2 md:px-4 md:py-2.5 rounded-lg md:rounded-xl border-2 border-slate-100 bg-white/50 focus:bg-white focus:border-emerald-300 outline-none transition-all text-slate-700 placeholder:text-slate-400 text-xs md:text-sm" />
        </div>
        <div class="flex flex-col gap-1 md:gap-1.5">
          <label class="text-xs md:text-sm font-semibold text-slate-700">Annual Bonus / Incentives</label>
          <input type="number" id="tax-bonus" placeholder="Annual Total" class="px-3 py-2 md:px-4 md:py-2.5 rounded-lg md:rounded-xl border-2 border-slate-100 bg-white/50 focus:bg-white focus:border-emerald-300 outline-none transition-all text-slate-700 placeholder:text-slate-400 text-xs md:text-sm" />
        </div>
        <div class="flex flex-col gap-1 md:gap-1.5">
          <label class="text-xs md:text-sm font-semibold text-slate-700">Medical Allowance</label>
          <input type="number" id="tax-medical" placeholder="Annual Allowance" class="px-3 py-2 md:px-4 md:py-2.5 rounded-lg md:rounded-xl border-2 border-slate-100 bg-white/50 focus:bg-white focus:border-emerald-300 outline-none transition-all text-slate-700 placeholder:text-slate-400 text-xs md:text-sm" />
        </div>
        <div class="flex items-center gap-2 mt-2 sm:mt-6 md:mt-8">
          <input type="checkbox" id="medical-facility" class="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500" />
          <label for="medical-facility" class="text-xs md:text-sm font-medium text-slate-700">Medical Facility Provided?</label>
        </div>
        <div class="sm:col-span-2 flex flex-col gap-1 md:gap-1.5">
          <label class="text-xs md:text-sm font-semibold text-slate-700">COLA / Utility / House Rent (Cash)</label>
          <input type="number" id="tax-other" placeholder="Total Taxable Allowances" class="px-3 py-2 md:px-4 md:py-2.5 rounded-lg md:rounded-xl border-2 border-slate-100 bg-white/50 focus:bg-white focus:border-emerald-300 outline-none transition-all text-slate-700 placeholder:text-slate-400 text-xs md:text-sm" />
        </div>
      </div>
    `
  },
  {
    id: 'perks',
    title: '2. Perquisites (Adds to Taxable Income)',
    content: `
      <div class="space-y-5 md:space-y-6">
        <div>
          <h4 class="text-xs md:text-sm font-bold text-slate-700 mb-2 md:mb-3">Company Car (Sec 13(3))</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <div class="flex flex-col gap-1 md:gap-1.5">
              <label class="text-xs md:text-sm font-semibold text-slate-700">Cost of Vehicle</label>
              <input type="number" placeholder="Purchase Cost" class="px-3 py-2 md:px-4 md:py-2.5 rounded-lg md:rounded-xl border-2 border-slate-100 bg-white/50 focus:bg-white focus:border-emerald-300 outline-none transition-all text-slate-700 placeholder:text-slate-400 text-xs md:text-sm" />
            </div>
            <div class="flex flex-col gap-1 md:gap-1.5">
              <label class="text-xs md:text-sm font-semibold text-slate-700">Usage Type</label>
              <select class="px-3 py-2 md:px-4 md:py-2.5 rounded-lg md:rounded-xl border-2 border-slate-100 bg-white/50 focus:bg-white focus:border-emerald-300 outline-none transition-all text-slate-700 text-xs md:text-sm">
                <option value="part">Part Personal (Add 5%)</option>
                <option value="full">Full Personal (Add 10%)</option>
              </select>
            </div>
          </div>
        </div>
        
        <div>
          <h4 class="text-xs md:text-sm font-bold text-slate-700 mb-2 md:mb-3">Employee Share Scheme</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <div class="flex flex-col gap-1 md:gap-1.5">
              <label class="text-xs md:text-sm font-semibold text-slate-700">Fair Market Value (FMV)</label>
              <input type="number" placeholder="Value at Exercise" class="px-3 py-2 md:px-4 md:py-2.5 rounded-lg md:rounded-xl border-2 border-slate-100 bg-white/50 focus:bg-white focus:border-emerald-300 outline-none transition-all text-slate-700 placeholder:text-slate-400 text-xs md:text-sm" />
            </div>
            <div class="flex flex-col gap-1 md:gap-1.5">
              <label class="text-xs md:text-sm font-semibold text-slate-700">Cost of Option</label>
              <input type="number" placeholder="Price Paid" class="px-3 py-2 md:px-4 md:py-2.5 rounded-lg md:rounded-xl border-2 border-slate-100 bg-white/50 focus:bg-white focus:border-emerald-300 outline-none transition-all text-slate-700 placeholder:text-slate-400 text-xs md:text-sm" />
            </div>
          </div>
        </div>

        <div>
          <h4 class="text-xs md:text-sm font-bold text-slate-700 mb-2 md:mb-3">Housing (Rule 5)</h4>
          <div class="flex items-center gap-2">
            <input type="checkbox" id="housing-provided" class="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500" />
            <label for="housing-provided" class="text-xs md:text-sm font-medium text-slate-700">Official Accommodation Provided? (Adds 45%)</label>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'deductions',
    title: '3. Deductible Allowances (Reduces Income)',
    content: `
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        <div class="flex flex-col gap-1 md:gap-1.5">
          <label class="text-xs md:text-sm font-semibold text-slate-700">Zakat Paid (Sec 60)</label>
          <input type="number" placeholder="Amount" class="px-3 py-2 md:px-4 md:py-2.5 rounded-lg md:rounded-xl border-2 border-slate-100 bg-white/50 focus:bg-white focus:border-emerald-300 outline-none transition-all text-slate-700 placeholder:text-slate-400 text-xs md:text-sm" />
        </div>
        <div class="space-y-2">
          <div class="flex flex-col gap-1 md:gap-1.5">
            <label class="text-xs md:text-sm font-semibold text-slate-700">Education Expenses (Sec 60D)</label>
            <input type="number" placeholder="Tuition Fees (if Income < 1.5M)" class="px-3 py-2 md:px-4 md:py-2.5 rounded-lg md:rounded-xl border-2 border-slate-100 bg-white/50 focus:bg-white focus:border-emerald-300 outline-none transition-all text-slate-700 placeholder:text-slate-400 text-xs md:text-sm" />
          </div>
          <div class="flex flex-col gap-1 md:gap-1.5">
            <input type="number" placeholder="No. of Children" class="px-3 py-2 md:px-4 md:py-2.5 rounded-lg md:rounded-xl border-2 border-slate-100 bg-white/50 focus:bg-white focus:border-emerald-300 outline-none transition-all text-slate-700 placeholder:text-slate-400 text-xs md:text-sm" />
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'credits',
    title: '4. Tax Reduction Investments',
    content: `
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        <div class="flex flex-col gap-1 md:gap-1.5">
          <label class="text-xs md:text-sm font-semibold text-slate-700">Charitable Donations (Sec 61)</label>
          <input type="number" placeholder="Amount Donated" class="px-3 py-2 md:px-4 md:py-2.5 rounded-lg md:rounded-xl border-2 border-slate-100 bg-white/50 focus:bg-white focus:border-emerald-300 outline-none transition-all text-slate-700 placeholder:text-slate-400 text-xs md:text-sm" />
        </div>
        <div class="flex flex-col gap-1 md:gap-1.5">
          <label class="text-xs md:text-sm font-semibold text-slate-700">Pension Fund Contribution (Sec 63)</label>
          <input type="number" placeholder="Contribution Amount" class="px-3 py-2 md:px-4 md:py-2.5 rounded-lg md:rounded-xl border-2 border-slate-100 bg-white/50 focus:bg-white focus:border-emerald-300 outline-none transition-all text-slate-700 placeholder:text-slate-400 text-xs md:text-sm" />
        </div>
        <div class="flex flex-col gap-1 md:gap-1.5">
          <label class="text-xs md:text-sm font-semibold text-slate-700">Housing Loan Markup (Sec 63A)</label>
          <input type="number" placeholder="Markup Paid" class="px-3 py-2 md:px-4 md:py-2.5 rounded-lg md:rounded-xl border-2 border-slate-100 bg-white/50 focus:bg-white focus:border-emerald-300 outline-none transition-all text-slate-700 placeholder:text-slate-400 text-xs md:text-sm" />
        </div>
      </div>
    `
  },
  {
    id: 'rebates',
    title: '5. Special Status Rebates',
    content: `
      <div class="space-y-2 md:space-y-3">
        <div class="flex items-center gap-2">
          <input type="checkbox" id="tax-teacher" class="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500" />
          <label for="tax-teacher" class="text-xs md:text-sm font-medium text-slate-700">Full Time Teacher/Researcher (25% Tax Reduction)</label>
        </div>
        <div class="flex items-center gap-2">
          <input type="checkbox" id="tax-senior" class="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500" />
          <label for="tax-senior" class="text-xs md:text-sm font-medium text-slate-700">Senior Citizen (>60y, Income < 1M) (50% Tax Reduction)</label>
        </div>
      </div>
    `
  }
];

const taxAccordionsContainer = document.getElementById('tax-accordions');
let openSection = 'salary';

function renderTaxAccordions() {
  taxAccordionsContainer.innerHTML = '';
  taxAccordionsData.forEach(acc => {
    const isOpen = openSection === acc.id;
    const div = document.createElement('div');
    div.className = 'bg-white/60 rounded-xl md:rounded-2xl overflow-hidden border border-white/50 shadow-sm';
    
    div.innerHTML = `
      <button class="w-full px-4 py-3 md:px-5 md:py-4 flex items-center justify-between text-left focus:outline-none" onclick="toggleTaxAccordion('${acc.id}')">
        <span class="font-bold text-emerald-800 text-sm md:text-base">${acc.title}</span>
        <i data-lucide="${isOpen ? 'chevron-up' : 'chevron-down'}" class="text-emerald-600 w-4 h-4 md:w-5 md:h-5"></i>
      </button>
      <div class="overflow-hidden transition-all duration-300 ${isOpen ? 'h-auto opacity-100' : 'h-0 opacity-0'}">
        <div class="p-4 pt-0 md:p-5 md:pt-0 border-t border-emerald-100/50">
          ${acc.content}
        </div>
      </div>
    `;
    taxAccordionsContainer.appendChild(div);
  });
  lucide.createIcons();
}

window.toggleTaxAccordion = (id) => {
  // Save input values before re-rendering
  const basic = document.getElementById('tax-basic')?.value || '';
  const bonus = document.getElementById('tax-bonus')?.value || '';
  const medical = document.getElementById('tax-medical')?.value || '';
  const other = document.getElementById('tax-other')?.value || '';
  
  openSection = openSection === id ? null : id;
  renderTaxAccordions();
  
  // Restore input values
  if (document.getElementById('tax-basic')) document.getElementById('tax-basic').value = basic;
  if (document.getElementById('tax-bonus')) document.getElementById('tax-bonus').value = bonus;
  if (document.getElementById('tax-medical')) document.getElementById('tax-medical').value = medical;
  if (document.getElementById('tax-other')) document.getElementById('tax-other').value = other;
};

renderTaxAccordions();

const formatCurrency = (val) => {
  return new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR', maximumFractionDigits: 0 }).format(val);
};

document.getElementById('calc-tax-btn').addEventListener('click', () => {
  const basic = Number(document.getElementById('tax-basic')?.value) || 0;
  const bon = Number(document.getElementById('tax-bonus')?.value) || 0;
  const med = Number(document.getElementById('tax-medical')?.value) || 0;
  const other = Number(document.getElementById('tax-other')?.value) || 0;

  const totalIncome = basic + bon + med + other;
  let tax = 0;

  if (totalIncome > 600000 && totalIncome <= 1200000) {
    tax = (totalIncome - 600000) * 0.05;
  } else if (totalIncome > 1200000 && totalIncome <= 2200000) {
    tax = 30000 + (totalIncome - 1200000) * 0.15;
  } else if (totalIncome > 2200000 && totalIncome <= 3200000) {
    tax = 180000 + (totalIncome - 2200000) * 0.25;
  } else if (totalIncome > 3200000) {
    tax = 430000 + (totalIncome - 3200000) * 0.30;
  }

  const resultContainer = document.getElementById('tax-result-container');
  const resultText = document.getElementById('tax-result');
  
  resultText.textContent = formatCurrency(tax);
  resultContainer.classList.remove('hidden');
  setTimeout(() => {
    resultContainer.classList.remove('opacity-0');
  }, 10);
});

// --- Wealth Simulator ---
const wsInitial = document.getElementById('ws-initial');
const wsMonthly = document.getElementById('ws-monthly');
const wsRate = document.getElementById('ws-rate');
const wsYears = document.getElementById('ws-years');

const wsInitialVal = document.getElementById('ws-initial-val');
const wsMonthlyVal = document.getElementById('ws-monthly-val');
const wsRateVal = document.getElementById('ws-rate-val');
const wsYearsVal = document.getElementById('ws-years-val');

const wsFutureValue = document.getElementById('ws-future-value');
const wsTotalInvested = document.getElementById('ws-total-invested');
const wsInterestEarned = document.getElementById('ws-interest-earned');
const wsBarInvested = document.getElementById('ws-bar-invested');
const wsBarInterest = document.getElementById('ws-bar-interest');

function updateWealthSimulator() {
  const p = Number(wsInitial.value);
  const pmt = Number(wsMonthly.value);
  const rate = Number(wsRate.value);
  const t = Number(wsYears.value);

  wsInitialVal.textContent = formatCurrency(p);
  wsMonthlyVal.textContent = formatCurrency(pmt);
  wsRateVal.textContent = rate + '%';
  wsYearsVal.textContent = t + ' Years';

  const r = rate / 100;
  const n = 12;

  const futureValue = p * Math.pow(1 + r/n, n*t) + pmt * ((Math.pow(1 + r/n, n*t) - 1) / (r/n));
  const totalInvested = p + (pmt * 12 * t);
  const interestEarned = futureValue - totalInvested;

  wsFutureValue.textContent = formatCurrency(futureValue);
  wsTotalInvested.textContent = formatCurrency(totalInvested);
  wsInterestEarned.textContent = formatCurrency(interestEarned);

  const investedPercent = (totalInvested / futureValue) * 100;
  const interestPercent = (interestEarned / futureValue) * 100;

  wsBarInvested.style.width = investedPercent + '%';
  wsBarInterest.style.width = interestPercent + '%';
}

[wsInitial, wsMonthly, wsRate, wsYears].forEach(input => {
  input.addEventListener('input', updateWealthSimulator);
});

updateWealthSimulator();


