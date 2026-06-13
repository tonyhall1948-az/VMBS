// ===== FAQ TOGGLE =====
document.addEventListener('DOMContentLoaded', function() {
    const faqToggles = document.querySelectorAll('.faq-toggle');
    
    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isActive = answer.classList.contains('active');
            
            // Close all other FAQs
            document.querySelectorAll('.faq-answer').forEach(item => {
                item.classList.remove('active');
            });
            
            document.querySelectorAll('.faq-toggle span').forEach(span => {
                span.textContent = '+';
            });
            
            // Toggle current FAQ
            if (!isActive) {
                answer.classList.add('active');
                this.querySelector('span').textContent = '−';
            }
        });
    });
});

// ===== COST ESTIMATOR =====
function updateCostEstimate() {
    const machineType = document.getElementById('machineType').value;
    const machineCount = parseInt(document.getElementById('machineCount').value) || 1;
    const machineCondition = document.getElementById('machineCondition').value;
    const inventoryBudget = parseInt(document.getElementById('inventoryBudget').value) || 800;
    const state = document.getElementById('state').value;

    let machinePrice = 0;

    // Machine pricing
    const prices = {
        snack: machineCondition === 'used' ? { low: 1500, high: 2000 } : { low: 2500, high: 3500 },
        drink: machineCondition === 'used' ? { low: 2000, high: 2500 } : { low: 2500, high: 4000 },
        combo: machineCondition === 'used' ? { low: 3000, high: 4000 } : { low: 4000, high: 6000 },
        healthy: machineCondition === 'used' ? { low: 2500, high: 3500 } : { low: 3500, high: 5000 },
        compact: machineCondition === 'used' ? { low: 800, high: 1200 } : { low: 1500, high: 2500 },
        smart: machineCondition === 'used' ? { low: 3500, high: 4500 } : { low: 4500, high: 7000 }
    };

    if (prices[machineType]) {
        machinePrice = (prices[machineType].low + prices[machineType].high) / 2;
    }

    const totalMachinesCost = machinePrice * machineCount;
    const totalInventoryCost = inventoryBudget * machineCount;

    let licensingCost = 0;
    if (state === 'low') licensingCost = 100;
    else if (state === 'medium') licensingCost = 250;
    else if (state === 'high') licensingCost = 600;

    const total = totalMachinesCost + totalInventoryCost + licensingCost + 300; // +300 for insurance/contingency

    // Update display
    document.getElementById('machinesCost').textContent = '$' + totalMachinesCost.toFixed(0);
    document.getElementById('inventoryCost').textContent = '$' + totalInventoryCost.toFixed(0);
    document.getElementById('licensingCost').textContent = '$' + licensingCost.toFixed(0);
    document.getElementById('totalCost').textContent = '$' + total.toFixed(0);

    if (document.getElementById('costEstimateResult')) {
        document.getElementById('costEstimateResult').style.display = 'block';
    }
}

// ===== PROFIT PROJECTION =====
function updateProfitProjection() {
    const dailyRevenue = parseInt(document.getElementById('dailyRevenue').value) || 30;
    const productCost = parseInt(document.getElementById('productCost').value) || 40;
    const commissionSplit = parseInt(document.getElementById('commissionSplit').value) || 25;
    const otherCosts = parseInt(document.getElementById('otherCosts').value) || 50;

    const monthlyRevenue = dailyRevenue * 30;
    const cogs = monthlyRevenue * (productCost / 100);
    const commission = monthlyRevenue * (commissionSplit / 100);
    const netProfit = monthlyRevenue - cogs - commission - otherCosts;
    const annualProfit = netProfit * 12;

    // Update display
    document.getElementById('monthlyRevenue').textContent = '$' + monthlyRevenue.toFixed(0);
    document.getElementById('cogs').textContent = '$' + cogs.toFixed(0);
    document.getElementById('commission').textContent = '$' + commission.toFixed(0);
    document.getElementById('displayOtherCosts').textContent = '$' + otherCosts.toFixed(0);
    document.getElementById('netProfit').textContent = '$' + (netProfit > 0 ? netProfit.toFixed(0) : 0);
    document.getElementById('annualProfit').textContent = '$' + (annualProfit > 0 ? annualProfit.toFixed(0) : 0);

    if (document.getElementById('profitProjectionResult')) {
        document.getElementById('profitProjectionResult').style.display = 'block';
    }
}

// ===== QUIZ =====
function completeQuiz() {
    const timeCommitment = document.querySelector('input[name="timeCommitment"]:checked')?.value;
    const budget = document.querySelector('input[name="budget"]:checked')?.value;
    const interest = document.querySelector('input[name="interest"]:checked')?.value;
    const location = document.querySelector('input[name="location"]:checked')?.value;
    const risk = document.querySelector('input[name="risk"]:checked')?.value;

    if (!timeCommitment || !budget || !interest || !location || !risk) {
        alert('Please answer all questions before submitting.');
        return;
    }

    let recommendation = '';
    let reasoning = [];

    // Score-based logic
    if (interest === 'snacks' && budget === '2500' && timeCommitment === '1-2') {
        recommendation = 'Snack Vending Starter Pack';
        reasoning = [
            'Low investment with low time commitment',
            'Ideal for beginners and part-time operators',
            'Best locations: Schools, offices, gyms',
            'Expected profit: $200–$400/month per machine'
        ];
    } else if (interest === 'drinks' && budget === '4000') {
        recommendation = 'Drink Vending Starter Pack';
        reasoning = [
            'Premium pricing and high demand',
            'Requires slightly higher investment (cooler)',
            'Best locations: Offices, factories, gyms',
            'Expected profit: $300–$500/month per machine'
        ];
    } else if (interest === 'healthy') {
        recommendation = 'Healthy Vending Starter Pack';
        reasoning = [
            'Growing market with premium pricing',
            'Best locations: Gyms, wellness centers',
            'Requires more inventory management',
            'Expected profit: $300–$500/month per machine',
            'Higher margins (40–60%)'
        ];
    } else if (interest === 'specialty' || risk === 'high') {
        recommendation = 'Specialty/Niche Vending Pack';
        reasoning = [
            'High profit margins (50–70%)',
            'Less competition and competition',
            'Requires market research and niche identification',
            'Best for experienced operators ready to scale',
            'Expected profit: $300–$600/month per machine'
        ];
    } else {
        recommendation = 'Combo Snack & Drink Pack';
        reasoning = [
            'Balanced approach for maximum revenue',
            'One location, multiple revenue streams',
            'Best locations: Large offices, campuses',
            'Expected profit: $500–$900/month per location',
            'Great for scaling to multiple machines'
        ];
    }

    const resultContent = document.getElementById('quizResultContent');
    let html = `<h3 style="color: #0D6EFD; margin-bottom: 1rem;">${recommendation}</h3>`;
    html += '<h4>Why this is right for you:</h4><ul style="list-style: none; padding-left: 0;">';

    reasoning.forEach(reason => {
        html += `<li style="padding: 0.5rem 0; display: flex; align-items: center;">
                    <span style="color: #00B894; margin-right: 0.7rem; font-size: 1.2em;">✓</span>
                    <span>${reason}</span>
                </li>`;
    });

    html += '</ul>';
    html += '<div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid #DFE6E9;">';
    html += '<h4>Next Steps:</h4>';
    html += '<ol style="padding-left: 1.5rem;">';
    html += '<li>Review the <a href="starter-packs.html">Starter Packs</a> page for detailed information</li>';
    html += '<li>Use the <a href="tools.html#cost-estimator">Cost Estimator</a> to calculate your investment</li>';
    html += '<li>Check the <a href="business-roadmap.html">Business Roadmap</a> for your 12-month plan</li>';
    html += '<li>Start scouting locations using our <a href="location-guide.html">Location Guide</a></li>';
    html += '</ol>';
    html += '</div>';

    resultContent.innerHTML = html;
    document.getElementById('quizResults').style.display = 'block';

    // Scroll to results
    setTimeout(() => {
        document.getElementById('quizResults').scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

// ===== PRODUCT RECOMMENDATION BASED ON LOCATION =====
function getProductRecommendations(locationType) {
    const recommendations = {
        offices: {
            title: 'Office Breakroom Recommendations',
            products: ['Premium snacks', 'Energy drinks', 'Coffee/tea options', 'Healthy options', 'Tech accessories'],
            machineType: 'Combo or Dual setup',
            profitRange: '$600–$1,000/month'
        },
        gyms: {
            title: 'Gym Vending Recommendations',
            products: ['Protein bars', 'Sports drinks', 'Recovery products', 'Energy supplements', 'Healthy snacks'],
            machineType: 'Refrigerated specialty machine',
            profitRange: '$400–$700/month'
        },
        schools: {
            title: 'School Vending Recommendations',
            products: ['Popular snacks', 'Bottled water', 'Sports drinks', 'Energy drinks', 'Gum/candy'],
            machineType: 'Combo or dual setup',
            profitRange: '$500–$1,000+/month'
        },
        specialty: {
            title: 'Specialty Location Recommendations',
            products: ['Hygiene items', 'Phone chargers', 'Headphones', 'Travel accessories', 'Emergency items'],
            machineType: 'Specialty/wall-mounted machine',
            profitRange: '$200–$500/month'
        }
    };

    return recommendations[locationType] || recommendations.offices;
}

// ===== INITIALIZE CALCULATORS ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cost estimator if present
    if (document.getElementById('machineType')) {
        updateCostEstimate();
    }

    // Initialize profit projection if present
    if (document.getElementById('dailyRevenue')) {
        updateProfitProjection();
    }

    // Add event listeners to calculator inputs
    const inputs = document.querySelectorAll('input[type="number"], select');
    inputs.forEach(input => {
        input.addEventListener('change', function() {
            if (this.id === 'machineType' || this.id === 'machineCount' || 
                this.id === 'machineCondition' || this.id === 'inventoryBudget' || 
                this.id === 'state') {
                updateCostEstimate();
            } else if (this.id === 'dailyRevenue' || this.id === 'productCost' || 
                       this.id === 'commissionSplit' || this.id === 'otherCosts') {
                updateProfitProjection();
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ===== UTILITY FUNCTION: Format Currency =====
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// ===== UTILITY FUNCTION: Calculate Profit =====
function calculateProfit(revenue, cogs_percentage, commission_percentage, otherCosts) {
    const cogs = revenue * (cogs_percentage / 100);
    const commission = revenue * (commission_percentage / 100);
    return revenue - cogs - commission - otherCosts;
}

// ===== TRACKING TABLE AUTO-CALCULATION =====
document.addEventListener('DOMContentLoaded', function() {
    const tableInputs = document.querySelectorAll('.table-input');
    
    tableInputs.forEach(input => {
        input.addEventListener('change', function() {
            const row = this.closest('tr');
            if (row) {
                const revenue = parseFloat(row.querySelector('td:nth-child(2) input').value) || 0;
                const productCost = parseFloat(row.querySelector('td:nth-child(3) input').value) || 0;
                const commission = parseFloat(row.querySelector('td:nth-child(4) input').value) || 0;
                const otherCosts = parseFloat(row.querySelector('td:nth-child(5) input').value) || 0;
                
                const netProfit = revenue - productCost - commission - otherCosts;
                const resultCell = row.querySelector('.result-cell');
                
                if (resultCell) {
                    resultCell.textContent = '$' + (netProfit > 0 ? netProfit.toFixed(0) : 0);
                }
            }
        });
    });
});

// ===== LOCATION SCORECARD AUTO-CALCULATION =====
document.addEventListener('DOMContentLoaded', function() {
    const scoreInputs = document.querySelectorAll('.score-input');
    
    scoreInputs.forEach(input => {
        input.addEventListener('change', function() {
            updateLocationScore();
        });
    });

    function updateLocationScore() {
        let totalScore = 0;
        const rows = document.querySelectorAll('.scorecard-table tbody tr:not(.total-row)');
        
        rows.forEach(row => {
            const weight = parseInt(row.querySelector('td:nth-child(2)').textContent) || 0;
            const score = parseInt(row.querySelector('.score-input').value) || 0;
            const weighted = weight * score;
            
            const weightedCell = row.querySelector('.weighted-output');
            if (weightedCell) {
                weightedCell.textContent = weighted;
            }
            
            totalScore += weighted;
        });

        const totalElement = document.getElementById('total-score');
        if (totalElement) {
            totalElement.textContent = totalScore;
        }
    }
});

// ===== EXPORT FUNCTIONALITY (Optional) =====
function exportChecklistAsJSON() {
    const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
    const checklist = [];

    checkboxes.forEach(checkbox => {
        const label = checkbox.nextElementSibling.textContent;
        checklist.push({
            task: label,
            completed: checkbox.checked
        });
    });

    const json = JSON.stringify(checklist, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vending-checklist.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// ===== ANALYTICS PLACEHOLDER =====
// You can add Google Analytics, Mixpanel, or other tracking here
console.log('VendStart website loaded successfully');
// Visitor Counter - Week 3 Cloud API Integration
document.addEventListener('DOMContentLoaded', function () {
    const visitorCountElement = document.getElementById('visitor-count');

    if (!visitorCountElement) {
        return;
    }

    fetch('./config.json')
        .then(response => response.json())
        .then(config => fetch(config.apiBaseUrl))
        .then(response => response.json())
        .then(data => {
            visitorCountElement.textContent = 'Visitors: ' + data.count;
        })
        .catch(error => {
            console.error('Visitor counter error:', error);
            visitorCountElement.textContent = 'Visitors: unavailable';
        });
});
