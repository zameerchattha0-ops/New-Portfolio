/* ==========================================================
   tools.js - All Financial Tools Logic (Toybox-Pro Edition)
   Tax Calculator . Wealth Simulator . EMI Calculator
   Depreciation . Break-Even . Profit Margin
   ========================================================== */

function formatCurrency(n) {
  return 'Rs ' + Math.round(n).toLocaleString('en-PK');
}

// ============================================================
// 1. FBR TAX CALCULATOR (Full 5-Section)
// ============================================================
var calcTaxBtn = document.getElementById('calc-tax-btn');
if (calcTaxBtn) {
  // Toggle sub-accordion sections inside tax calculator
  document.querySelectorAll('.tax-sub-header').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var body = btn.nextElementSibling;
      var isOpen = btn.classList.contains('open');
      btn.classList.toggle('open', !isOpen);
      if (!isOpen) {
        body.style.maxHeight = body.scrollHeight + 'px';
        body.style.paddingTop = '12px';
        body.style.paddingBottom = '12px';
      } else {
        body.style.maxHeight = '0';
        body.style.paddingTop = '0';
        body.style.paddingBottom = '0';
      }
    });
    // Open first section by default
    if (btn.classList.contains('open')) {
      var body = btn.nextElementSibling;
      body.style.maxHeight = body.scrollHeight + 'px';
      body.style.paddingTop = '12px';
      body.style.paddingBottom = '12px';
    }
  });

  calcTaxBtn.addEventListener('click', function () {
    // 1. Salary & Allowances
    var basic = Number(document.getElementById('tax-basic').value) || 0;
    var bon = Number(document.getElementById('tax-bonus').value) || 0;
    var med = Number(document.getElementById('tax-medical').value) || 0;
    var other = Number(document.getElementById('tax-other').value) || 0;
    var grossSalary = basic + bon + med + other;

    // 2. Perquisites
    var carCost = Number(document.getElementById('tax-car-cost') ? document.getElementById('tax-car-cost').value : 0) || 0;
    var carUsage = document.getElementById('tax-car-usage') ? document.getElementById('tax-car-usage').value : 'part';
    var carPerk = carCost * (carUsage === 'full' ? 0.10 : 0.05);
    var shareFMV = Number(document.getElementById('tax-share-fmv') ? document.getElementById('tax-share-fmv').value : 0) || 0;
    var shareCost = Number(document.getElementById('tax-share-cost') ? document.getElementById('tax-share-cost').value : 0) || 0;
    var sharePerk = Math.max(0, shareFMV - shareCost);
    var housingProvided = document.getElementById('tax-housing') ? document.getElementById('tax-housing').checked : false;
    var housingPerk = housingProvided ? grossSalary * 0.45 : 0;
    var totalPerks = carPerk + sharePerk + housingPerk;

    // 3. Deductions
    var zakat = Number(document.getElementById('tax-zakat') ? document.getElementById('tax-zakat').value : 0) || 0;
    var eduExpenses = Number(document.getElementById('tax-education') ? document.getElementById('tax-education').value : 0) || 0;
    var totalDeductions = zakat + eduExpenses;

    // Taxable Income
    var taxableIncome = grossSalary + totalPerks - totalDeductions;
    if (taxableIncome < 0) taxableIncome = 0;

    // 4. Calculate base tax using FBR slabs
    var tax = 0;
    if (taxableIncome > 600000 && taxableIncome <= 1200000) tax = (taxableIncome - 600000) * 0.05;
    else if (taxableIncome > 1200000 && taxableIncome <= 2200000) tax = 30000 + (taxableIncome - 1200000) * 0.15;
    else if (taxableIncome > 2200000 && taxableIncome <= 3200000) tax = 180000 + (taxableIncome - 2200000) * 0.25;
    else if (taxableIncome > 3200000) tax = 430000 + (taxableIncome - 3200000) * 0.3;

    // 5. Tax Credits
    var donation = Number(document.getElementById('tax-donation') ? document.getElementById('tax-donation').value : 0) || 0;
    var pension = Number(document.getElementById('tax-pension') ? document.getElementById('tax-pension').value : 0) || 0;
    var housingLoan = Number(document.getElementById('tax-housing-loan') ? document.getElementById('tax-housing-loan').value : 0) || 0;
    var totalCredits = donation + pension + housingLoan;
    // Credits reduce tax (capped at total tax)
    var creditReduction = Math.min(totalCredits * 0.3, tax);
    tax -= creditReduction;

    // 6. Special Rebates
    var isTeacher = document.getElementById('tax-teacher') ? document.getElementById('tax-teacher').checked : false;
    var isSenior = document.getElementById('tax-senior') ? document.getElementById('tax-senior').checked : false;
    if (isTeacher) tax *= 0.75;
    if (isSenior && taxableIncome < 1000000) tax *= 0.50;

    if (tax < 0) tax = 0;

    // Display breakdown
    var resultContainer = document.getElementById('tax-result-container');
    document.getElementById('tax-result').textContent = formatCurrency(tax);
    var breakdown = document.getElementById('tax-breakdown');
    if (breakdown) {
      breakdown.innerHTML =
        '<div class="breakdown-row"><span>Gross Salary</span><span>' + formatCurrency(grossSalary) + '</span></div>' +
        '<div class="breakdown-row"><span>+ Perquisites</span><span>' + formatCurrency(totalPerks) + '</span></div>' +
        '<div class="breakdown-row"><span>- Deductions</span><span>' + formatCurrency(totalDeductions) + '</span></div>' +
        '<div class="breakdown-row total"><span>Taxable Income</span><span>' + formatCurrency(taxableIncome) + '</span></div>' +
        '<div class="breakdown-row"><span>- Credits Reduction</span><span>' + formatCurrency(creditReduction) + '</span></div>';
    }
    resultContainer.classList.remove('hidden');
  });
}

// ============================================================
// 2. WEALTH SIMULATOR
// ============================================================
var wsInitial = document.getElementById('ws-initial');
if (wsInitial) {
  var wsMonthly = document.getElementById('ws-monthly');
  var wsRate = document.getElementById('ws-rate');
  var wsYears = document.getElementById('ws-years');

  function updateWealthSimulator() {
    var p = Number(wsInitial.value), pmt = Number(wsMonthly.value);
    var rate = Number(wsRate.value), t = Number(wsYears.value);
    document.getElementById('ws-initial-val').textContent = formatCurrency(p);
    document.getElementById('ws-monthly-val').textContent = formatCurrency(pmt);
    document.getElementById('ws-rate-val').textContent = rate + '%';
    document.getElementById('ws-years-val').textContent = t + ' Years';
    var r = rate / 100, n = 12;
    var fv = p * Math.pow(1 + r / n, n * t) + pmt * ((Math.pow(1 + r / n, n * t) - 1) / (r / n));
    var ti = p + pmt * 12 * t, ie = fv - ti;
    document.getElementById('ws-future-value').textContent = formatCurrency(fv);
    document.getElementById('ws-total-invested').textContent = formatCurrency(ti);
    document.getElementById('ws-interest-earned').textContent = formatCurrency(ie);
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
    document.getElementById('emi-amount-val').textContent = formatCurrency(P);
    document.getElementById('emi-rate-val').textContent = annualRate + '%';
    document.getElementById('emi-tenure-val').textContent = n + ' Months';
    var r = annualRate / 12 / 100;
    var emi;
    if (r === 0) { emi = P / n; }
    else { emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1); }
    var totalPayment = emi * n;
    var totalInterest = totalPayment - P;
    document.getElementById('emi-monthly').textContent = formatCurrency(emi);
    document.getElementById('emi-total').textContent = formatCurrency(totalPayment);
    document.getElementById('emi-interest').textContent = formatCurrency(totalInterest);
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
    var bookValue = cost, accDep = 0;

    if (method === 'slm') {
      var annualDep = (cost - salvage) / life;
      for (var y = 1; y <= life; y++) {
        var dep = Math.min(annualDep, bookValue - salvage);
        if (dep < 0) dep = 0;
        accDep += dep; bookValue -= dep;
        schedule.push({ year: y, dep: dep, accDep: accDep, bv: bookValue });
      }
    } else if (method === 'wdv') {
      var rate = 1 - Math.pow(salvage / cost, 1 / life);
      if (isNaN(rate) || !isFinite(rate)) rate = 0;
      for (var y = 1; y <= life; y++) {
        var dep = bookValue * rate;
        if (bookValue - dep < salvage) dep = bookValue - salvage;
        if (dep < 0) dep = 0;
        accDep += dep; bookValue -= dep;
        schedule.push({ year: y, dep: dep, accDep: accDep, bv: bookValue });
      }
    } else if (method === 'ddb') {
      var ddbRate = 2 / life;
      for (var y = 1; y <= life; y++) {
        var dep = bookValue * ddbRate;
        if (bookValue - dep < salvage) dep = bookValue - salvage;
        if (dep < 0) dep = 0;
        accDep += dep; bookValue -= dep;
        schedule.push({ year: y, dep: dep, accDep: accDep, bv: bookValue });
      }
    }

    document.getElementById('dep-annual').textContent = schedule.length > 0 ? formatCurrency(schedule[0].dep) : '-';
    document.getElementById('dep-total').textContent = formatCurrency(cost - salvage);
    var tbody = document.getElementById('dep-schedule');
    tbody.innerHTML = '';
    schedule.forEach(function (row) {
      var tr = document.createElement('tr');
      tr.innerHTML =
        '<td>' + row.year + '</td>' +
        '<td>' + formatCurrency(row.dep) + '</td>' +
        '<td>' + formatCurrency(row.accDep) + '</td>' +
        '<td style="font-weight:700">' + formatCurrency(row.bv) + '</td>';
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
    document.getElementById('be-fixed-val').textContent = formatCurrency(fc);
    document.getElementById('be-variable-val').textContent = formatCurrency(vc);
    document.getElementById('be-price-val').textContent = formatCurrency(sp);
    var contribution = sp - vc;
    var beUnits = contribution > 0 ? Math.ceil(fc / contribution) : 0;
    var beRevenue = beUnits * sp;
    var cmRatio = sp > 0 ? ((contribution / sp) * 100).toFixed(1) : 0;
    document.getElementById('be-units').textContent = beUnits.toLocaleString() + ' units';
    document.getElementById('be-revenue').textContent = formatCurrency(beRevenue);
    document.getElementById('be-contribution').textContent = formatCurrency(contribution);
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
    document.getElementById('pm-cost-val').textContent = formatCurrency(cost);
    document.getElementById('pm-sell-val').textContent = formatCurrency(sell);
    var profit = sell - cost;
    var margin = sell > 0 ? ((profit / sell) * 100).toFixed(1) : 0;
    var markup = cost > 0 ? ((profit / cost) * 100).toFixed(1) : 0;
    document.getElementById('pm-profit').textContent = formatCurrency(profit);
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
