/* ==========================================================
   tools.js — All Financial Tools Logic
   Tax Calculator · Wealth Simulator · EMI Calculator
   Depreciation · Break-Even · Profit Margin
   ========================================================== */

// ============================================================
// 1. FBR TAX CALCULATOR
// ============================================================
var taxAccordionsData = [
  {
    id: 'salary', title: '1. Monthly Gross Salary & Allowances',
    content:
      '<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">' +
      '<div class="flex flex-col gap-1 md:gap-1.5"><label class="text-xs md:text-sm font-semibold text-slate-700">Annual Basic Salary</label><input type="number" id="tax-basic" placeholder="Total Basic for Year" class="px-3 py-2 md:px-4 md:py-2.5 rounded-lg md:rounded-xl border-2 border-slate-100 bg-white/50 focus:bg-white focus:border-emerald-300 outline-none transition-all text-slate-700 placeholder:text-slate-400 text-xs md:text-sm" /></div>' +
      '<div class="flex flex-col gap-1 md:gap-1.5"><label class="text-xs md:text-sm font-semibold text-slate-700">Annual Bonus / Incentives</label><input type="number" id="tax-bonus" placeholder="Annual Total" class="px-3 py-2 md:px-4 md:py-2.5 rounded-lg md:rounded-xl border-2 border-slate-100 bg-white/50 focus:bg-white focus:border-emerald-300 outline-none transition-all text-slate-700 placeholder:text-slate-400 text-xs md:text-sm" /></div>' +
      '<div class="flex flex-col gap-1 md:gap-1.5"><label class="text-xs md:text-sm font-semibold text-slate-700">Medical Allowance</label><input type="number" id="tax-medical" placeholder="Annual Allowance" class="px-3 py-2 md:px-4 md:py-2.5 rounded-lg md:rounded-xl border-2 border-slate-100 bg-white/50 focus:bg-white focus:border-emerald-300 outline-none transition-all text-slate-700 placeholder:text-slate-400 text-xs md:text-sm" /></div>' +
      '<div class="flex items-center gap-2 mt-2 sm:mt-6 md:mt-8"><input type="checkbox" id="medical-facility" class="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500" /><label for="medical-facility" class="text-xs md:text-sm font-medium text-slate-700">Medical Facility Provided?</label></div>' +
      '<div class="sm:col-span-2 flex flex-col gap-1 md:gap-1.5"><label class="text-xs md:text-sm font-semibold text-slate-700">COLA / Utility / House Rent (Cash)</label><input type="number" id="tax-other" placeholder="Total Taxable Allowances" class="px-3 py-2 md:px-4 md:py-2.5 rounded-lg md:rounded-xl border-2 border-slate-100 bg-white/50 focus:bg-white focus:border-emerald-300 outline-none transition-all text-slate-700 placeholder:text-slate-400 text-xs md:text-sm" /></div>' +
      '</div>',
  },
  {
    id: 'perks', title: '2. Perquisites (Adds to Taxable Income)',
    content:
      '<div class="space-y-5 md:space-y-6">' +
      '<div><h4 class="text-xs md:text-sm font-bold text-slate-700 mb-2 md:mb-3">Company Car (Sec 13(3))</h4><div class="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4"><div class="flex flex-col gap-1 md:gap-1.5"><label class="text-xs md:text-sm font-semibold text-slate-700">Cost of Vehicle</label><input type="number" placeholder="Purchase Cost" class="px-3 py-2 md:px-4 md:py-2.5 rounded-lg md:rounded-xl border-2 border-slate-100 bg-white/50 focus:bg-white focus:border-emerald-300 outline-none transition-all text-slate-700 placeholder:text-slate-400 text-xs md:text-sm" /></div><div class="flex flex-col gap-1 md:gap-1.5"><label class="text-xs md:text-sm font-semibold text-slate-700">Usage Type</label><select class="px-3 py-2 md:px-4 md:py-2.5 rounded-lg md:rounded-xl border-2 border-slate-100 bg-white/50 focus:bg-white focus:border-emerald-300 outline-none transition-all text-slate-700 text-xs md:text-sm"><option value="part">Part Personal (Add 5%)</option><option value="full">Full Personal (Add 10%)</option></select></div></div></div>' +
      '<div><h4 class="text-xs md:text-sm font-bold text-slate-700 mb-2 md:mb-3">Employee Share Scheme</h4><div class="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4"><div class="flex flex-col gap-1 md:gap-1.5"><label class="text-xs md:text-sm font-semibold text-slate-700">Fair Market Value (FMV)</label><input type="number" placeholder="Value at Exercise" class="px-3 py-2 md:px-4 md:py-2.5 rounded-lg md:rounded-xl border-2 border-slate-100 bg-white/50 focus:bg-white focus:border-emerald-300 outline-none transition-all text-slate-700 placeholder:text-slate-400 text-xs md:text-sm" /></div><div class="flex flex-col gap-1 md:gap-1.5"><label class="text-xs md:text-sm font-semibold text-slate-700">Cost of Option</label><input type="number" placeholder="Price Paid" class="px-3 py-2 md:px-4 md:py-2.5 rounded-lg md:rounded-xl border-2 border-slate-100 bg-white/50 focus:bg-white focus:border-emerald-300 outline-none transition-all text-slate-700 placeholder:text-slate-400 text-xs md:text-sm" /></div></div></div>' +
      '<div><h4 class="text-xs md:text-sm font-bold text-slate-700 mb-2 md:mb-3">Housing (Rule 5)</h4><div class="flex items-center gap-2"><input type="checkbox" id="housing-provided" class="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500" /><label for="housing-provided" class="text-xs md:text-sm font-medium text-slate-700">Official Accommodation Provided? (Adds 45%)</label></div></div>' +
      '</div>',
  },
  {
    id: 'deductions', title: '3. Deductible Allowances (Reduces Income)',
    content:
      '<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">' +
      '<div class="flex flex-col gap-1 md:gap-1.5"><label class="text-xs md:text-sm font-semibold text-slate-700">Zakat Paid (Sec 60)</label><input type="number" placeholder="Amount" class="px-3 py-2 md:px-4 md:py-2.5 rounded-lg md:rounded-xl border-2 border-slate-100 bg-white/50 focus:bg-white focus:border-emerald-300 outline-none transition-all text-slate-700 placeholder:text-slate-400 text-xs md:text-sm" /></div>' +
      '<div class="space-y-2"><div class="flex flex-col gap-1 md:gap-1.5"><label class="text-xs md:text-sm font-semibold text-slate-700">Education Expenses (Sec 60D)</label><input type="number" placeholder="Tuition Fees (if Income &lt; 1.5M)" class="px-3 py-2 md:px-4 md:py-2.5 rounded-lg md:rounded-xl border-2 border-slate-100 bg-white/50 focus:bg-white focus:border-emerald-300 outline-none transition-all text-slate-700 placeholder:text-slate-400 text-xs md:text-sm" /></div><div class="flex flex-col gap-1 md:gap-1.5"><input type="number" placeholder="No. of Children" class="px-3 py-2 md:px-4 md:py-2.5 rounded-lg md:rounded-xl border-2 border-slate-100 bg-white/50 focus:bg-white focus:border-emerald-300 outline-none transition-all text-slate-700 placeholder:text-slate-400 text-xs md:text-sm" /></div></div>' +
      '</div>',
  },
  {
    id: 'credits', title: '4. Tax Reduction Investments',
    content:
      '<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">' +
      '<div class="flex flex-col gap-1 md:gap-1.5"><label class="text-xs md:text-sm font-semibold text-slate-700">Charitable Donations (Sec 61)</label><input type="number" placeholder="Amount Donated" class="px-3 py-2 md:px-4 md:py-2.5 rounded-lg md:rounded-xl border-2 border-slate-100 bg-white/50 focus:bg-white focus:border-emerald-300 outline-none transition-all text-slate-700 placeholder:text-slate-400 text-xs md:text-sm" /></div>' +
      '<div class="flex flex-col gap-1 md:gap-1.5"><label class="text-xs md:text-sm font-semibold text-slate-700">Pension Fund Contribution (Sec 63)</label><input type="number" placeholder="Contribution Amount" class="px-3 py-2 md:px-4 md:py-2.5 rounded-lg md:rounded-xl border-2 border-slate-100 bg-white/50 focus:bg-white focus:border-emerald-300 outline-none transition-all text-slate-700 placeholder:text-slate-400 text-xs md:text-sm" /></div>' +
      '<div class="flex flex-col gap-1 md:gap-1.5"><label class="text-xs md:text-sm font-semibold text-slate-700">Housing Loan Markup (Sec 63A)</label><input type="number" placeholder="Markup Paid" class="px-3 py-2 md:px-4 md:py-2.5 rounded-lg md:rounded-xl border-2 border-slate-100 bg-white/50 focus:bg-white focus:border-emerald-300 outline-none transition-all text-slate-700 placeholder:text-slate-400 text-xs md:text-sm" /></div>' +
      '</div>',
  },
  {
    id: 'rebates', title: '5. Special Status Rebates',
    content:
      '<div class="space-y-2 md:space-y-3">' +
      '<div class="flex items-center gap-2"><input type="checkbox" id="tax-teacher" class="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500" /><label for="tax-teacher" class="text-xs md:text-sm font-medium text-slate-700">Full Time Teacher/Researcher (25% Tax Reduction)</label></div>' +
      '<div class="flex items-center gap-2"><input type="checkbox" id="tax-senior" class="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500" /><label for="tax-senior" class="text-xs md:text-sm font-medium text-slate-700">Senior Citizen (&gt;60y, Income &lt; 1M) (50% Tax Reduction)</label></div>' +
      '</div>',
  },
];

var taxAccordionsContainer = document.getElementById('tax-accordions');
var openSection = 'salary';

function renderTaxAccordions() {
  if (!taxAccordionsContainer) return;
  taxAccordionsContainer.innerHTML = '';
  taxAccordionsData.forEach(function (acc) {
    var isOpen = openSection === acc.id;
    var div = document.createElement('div');
    div.className = 'bg-white/60 rounded-xl md:rounded-2xl overflow-hidden border border-white/50 shadow-sm';
    div.innerHTML =
      '<button class="w-full px-4 py-3 md:px-5 md:py-4 flex items-center justify-between text-left focus:outline-none" onclick="toggleTaxAccordion(\'' + acc.id + '\')">' +
      '<span class="font-bold text-emerald-800 text-sm md:text-base">' + acc.title + '</span>' +
      '<i data-lucide="' + (isOpen ? 'chevron-up' : 'chevron-down') + '" class="text-emerald-600 w-4 h-4 md:w-5 md:h-5"></i></button>' +
      '<div class="overflow-hidden transition-all duration-300 ' + (isOpen ? 'h-auto opacity-100' : 'h-0 opacity-0') + '">' +
      '<div class="p-4 pt-0 md:p-5 md:pt-0 border-t border-emerald-100/50">' + acc.content + '</div></div>';
    taxAccordionsContainer.appendChild(div);
  });
  lucide.createIcons();
}

window.toggleTaxAccordion = function (id) {
  var basicEl = document.getElementById('tax-basic');
  var bonusEl = document.getElementById('tax-bonus');
  var medicalEl = document.getElementById('tax-medical');
  var otherEl = document.getElementById('tax-other');
  var basic = basicEl ? basicEl.value : '';
  var bonus = bonusEl ? bonusEl.value : '';
  var medical = medicalEl ? medicalEl.value : '';
  var other = otherEl ? otherEl.value : '';
  openSection = openSection === id ? null : id;
  renderTaxAccordions();
  if (document.getElementById('tax-basic')) document.getElementById('tax-basic').value = basic;
  if (document.getElementById('tax-bonus')) document.getElementById('tax-bonus').value = bonus;
  if (document.getElementById('tax-medical')) document.getElementById('tax-medical').value = medical;
  if (document.getElementById('tax-other')) document.getElementById('tax-other').value = other;
};

renderTaxAccordions();

var calcTaxBtn = document.getElementById('calc-tax-btn');
if (calcTaxBtn) {
  calcTaxBtn.addEventListener('click', function () {
    var basic = Number(document.getElementById('tax-basic') ? document.getElementById('tax-basic').value : 0) || 0;
    var bon = Number(document.getElementById('tax-bonus') ? document.getElementById('tax-bonus').value : 0) || 0;
    var med = Number(document.getElementById('tax-medical') ? document.getElementById('tax-medical').value : 0) || 0;
    var other = Number(document.getElementById('tax-other') ? document.getElementById('tax-other').value : 0) || 0;
    var totalIncome = basic + bon + med + other;
    var tax = 0;
    if (totalIncome > 600000 && totalIncome <= 1200000) tax = (totalIncome - 600000) * 0.05;
    else if (totalIncome > 1200000 && totalIncome <= 2200000) tax = 30000 + (totalIncome - 1200000) * 0.15;
    else if (totalIncome > 2200000 && totalIncome <= 3200000) tax = 180000 + (totalIncome - 2200000) * 0.25;
    else if (totalIncome > 3200000) tax = 430000 + (totalIncome - 3200000) * 0.3;
    var resultContainer = document.getElementById('tax-result-container');
    document.getElementById('tax-result').textContent = window.formatCurrency(tax);
    resultContainer.classList.remove('hidden');
    setTimeout(function () { resultContainer.classList.remove('opacity-0'); }, 10);
  });
}

// ============================================================
// 2. WEALTH SIMULATOR
// ============================================================
var wsInitial = document.getElementById('ws-initial');
var wsMonthly = document.getElementById('ws-monthly');
var wsRate = document.getElementById('ws-rate');
var wsYears = document.getElementById('ws-years');

if (wsInitial) {
  function updateWealthSimulator() {
    var p = Number(wsInitial.value), pmt = Number(wsMonthly.value);
    var rate = Number(wsRate.value), t = Number(wsYears.value);
    document.getElementById('ws-initial-val').textContent = window.formatCurrency(p);
    document.getElementById('ws-monthly-val').textContent = window.formatCurrency(pmt);
    document.getElementById('ws-rate-val').textContent = rate + '%';
    document.getElementById('ws-years-val').textContent = t + ' Years';
    var r = rate / 100, n = 12;
    var fv = p * Math.pow(1 + r / n, n * t) + pmt * ((Math.pow(1 + r / n, n * t) - 1) / (r / n));
    var ti = p + pmt * 12 * t, ie = fv - ti;
    document.getElementById('ws-future-value').textContent = window.formatCurrency(fv);
    document.getElementById('ws-total-invested').textContent = window.formatCurrency(ti);
    document.getElementById('ws-interest-earned').textContent = window.formatCurrency(ie);
    document.getElementById('ws-bar-invested').style.width = (ti / fv * 100) + '%';
    document.getElementById('ws-bar-interest').style.width = (ie / fv * 100) + '%';
  }
  [wsInitial, wsMonthly, wsRate, wsYears].forEach(function (el) { el.addEventListener('input', updateWealthSimulator); });
  updateWealthSimulator();
}

// ============================================================
// 3. EMI / LOAN CALCULATOR
// ============================================================
var emiAmount = document.getElementById('emi-amount');

if (emiAmount) {
  var emiRate = document.getElementById('emi-rate');
  var emiTenure = document.getElementById('emi-tenure');

  function updateEMI() {
    var P = Number(emiAmount.value);
    var annualRate = Number(emiRate.value);
    var n = Number(emiTenure.value);

    document.getElementById('emi-amount-val').textContent = window.formatCurrency(P);
    document.getElementById('emi-rate-val').textContent = annualRate + '%';
    document.getElementById('emi-tenure-val').textContent = n + ' Months';

    var r = annualRate / 12 / 100;
    var emi;
    if (r === 0) {
      emi = P / n;
    } else {
      emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    }

    var totalPayment = emi * n;
    var totalInterest = totalPayment - P;

    document.getElementById('emi-monthly').textContent = window.formatCurrency(emi);
    document.getElementById('emi-total').textContent = window.formatCurrency(totalPayment);
    document.getElementById('emi-interest').textContent = window.formatCurrency(totalInterest);
    document.getElementById('emi-bar-principal').style.width = (P / totalPayment * 100) + '%';
    document.getElementById('emi-bar-interest').style.width = (totalInterest / totalPayment * 100) + '%';
  }

  [emiAmount, emiRate, emiTenure].forEach(function (el) { el.addEventListener('input', updateEMI); });
  updateEMI();
}

// ============================================================
// 4. DEPRECIATION CALCULATOR
// ============================================================
var calcDepBtn = document.getElementById('calc-dep-btn');

if (calcDepBtn) {
  calcDepBtn.addEventListener('click', function () {
    var cost = Number(document.getElementById('dep-cost').value) || 0;
    var salvage = Number(document.getElementById('dep-salvage').value) || 0;
    var life = Number(document.getElementById('dep-life').value) || 1;
    var method = document.getElementById('dep-method').value;

    var schedule = [];
    var bookValue = cost;
    var accDep = 0;

    if (method === 'slm') {
      var annualDep = (cost - salvage) / life;
      for (var y = 1; y <= life; y++) {
        var dep = Math.min(annualDep, bookValue - salvage);
        if (dep < 0) dep = 0;
        accDep += dep;
        bookValue -= dep;
        schedule.push({ year: y, dep: dep, accDep: accDep, bv: bookValue });
      }
    } else if (method === 'wdv') {
      var rate = 1 - Math.pow(salvage / cost, 1 / life);
      if (isNaN(rate) || !isFinite(rate)) rate = 0;
      for (var y = 1; y <= life; y++) {
        var dep = bookValue * rate;
        if (bookValue - dep < salvage) dep = bookValue - salvage;
        if (dep < 0) dep = 0;
        accDep += dep;
        bookValue -= dep;
        schedule.push({ year: y, dep: dep, accDep: accDep, bv: bookValue });
      }
    } else if (method === 'ddb') {
      var ddbRate = 2 / life;
      for (var y = 1; y <= life; y++) {
        var dep = bookValue * ddbRate;
        if (bookValue - dep < salvage) dep = bookValue - salvage;
        if (dep < 0) dep = 0;
        accDep += dep;
        bookValue -= dep;
        schedule.push({ year: y, dep: dep, accDep: accDep, bv: bookValue });
      }
    }

    document.getElementById('dep-annual').textContent = schedule.length > 0 ? window.formatCurrency(schedule[0].dep) : '-';
    document.getElementById('dep-total').textContent = window.formatCurrency(cost - salvage);

    var tbody = document.getElementById('dep-schedule');
    tbody.innerHTML = '';
    schedule.forEach(function (row) {
      var tr = document.createElement('tr');
      tr.className = 'border-t border-purple-50 hover:bg-purple-50/50';
      tr.innerHTML =
        '<td class="p-2 font-medium">' + row.year + '</td>' +
        '<td class="p-2 text-right">' + window.formatCurrency(row.dep) + '</td>' +
        '<td class="p-2 text-right">' + window.formatCurrency(row.accDep) + '</td>' +
        '<td class="p-2 text-right font-bold">' + window.formatCurrency(row.bv) + '</td>';
      tbody.appendChild(tr);
    });

    document.getElementById('dep-result').classList.remove('hidden');
  });
}

// ============================================================
// 5. BREAK-EVEN ANALYZER
// ============================================================
var beFixed = document.getElementById('be-fixed');

if (beFixed) {
  var beVariable = document.getElementById('be-variable');
  var bePrice = document.getElementById('be-price');

  function updateBreakEven() {
    var fc = Number(beFixed.value);
    var vc = Number(beVariable.value);
    var sp = Number(bePrice.value);

    document.getElementById('be-fixed-val').textContent = window.formatCurrency(fc);
    document.getElementById('be-variable-val').textContent = window.formatCurrency(vc);
    document.getElementById('be-price-val').textContent = window.formatCurrency(sp);

    var contribution = sp - vc;
    var beUnits = contribution > 0 ? Math.ceil(fc / contribution) : 0;
    var beRevenue = beUnits * sp;
    var cmRatio = sp > 0 ? ((contribution / sp) * 100).toFixed(1) : 0;

    document.getElementById('be-units').textContent = beUnits.toLocaleString() + ' units';
    document.getElementById('be-revenue').textContent = window.formatCurrency(beRevenue);
    document.getElementById('be-contribution').textContent = window.formatCurrency(contribution);
    document.getElementById('be-margin-ratio').textContent = cmRatio + '%';
  }

  [beFixed, beVariable, bePrice].forEach(function (el) { el.addEventListener('input', updateBreakEven); });
  updateBreakEven();
}

// ============================================================
// 6. PROFIT MARGIN CALCULATOR
// ============================================================
var pmCost = document.getElementById('pm-cost');

if (pmCost) {
  var pmSell = document.getElementById('pm-sell');

  function updateProfitMargin() {
    var cost = Number(pmCost.value);
    var sell = Number(pmSell.value);

    document.getElementById('pm-cost-val').textContent = window.formatCurrency(cost);
    document.getElementById('pm-sell-val').textContent = window.formatCurrency(sell);

    var profit = sell - cost;
    var margin = sell > 0 ? ((profit / sell) * 100).toFixed(1) : 0;
    var markup = cost > 0 ? ((profit / cost) * 100).toFixed(1) : 0;

    document.getElementById('pm-profit').textContent = window.formatCurrency(profit);
    document.getElementById('pm-margin').textContent = margin + '%';
    document.getElementById('pm-markup').textContent = markup + '%';

    if (sell > 0) {
      document.getElementById('pm-bar-cost').style.width = (cost / sell * 100) + '%';
      document.getElementById('pm-bar-profit').style.width = Math.max(0, (profit / sell * 100)) + '%';
    }
  }

  [pmCost, pmSell].forEach(function (el) { el.addEventListener('input', updateProfitMargin); });
  updateProfitMargin();
}
