document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('expense-form');

    // Initialize Charts
    const ctxBar = document.getElementById('expenseChart').getContext('2d');
    const xBar = document.getElementById('over').getContext('2d');
    const ctxDoughnut = document.getElementById('savingsChart').getContext('2d');

    // Bar Chart for Over/Under production
 
    // Expense Chart
    const expenseChart = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: ['Current Bill', 'Bill with Solar Power'],
            datasets: [{
                label: 'Amount in SAR',
                data: [0, 0], // Initially empty
                backgroundColor: ['#FFBB26', '#FF7426'],
                borderColor: ['#FFF0E6', '#FFF0E6'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    const savingsChart = new Chart(ctxDoughnut, {
        type: 'doughnut',
        data: {
            labels: ['Savings Percentage ', ''],
            datasets: [{
                data: [0, 100], // Initially 0% savings
                backgroundColor: ['#FF7426', '#B1B1B1'],
                borderColor: ['#FFF0E6', '#FFF0E6'],
                borderWidth: 1
            }]
        },
        options: {
            cutout: '70%',
            plugins: {
                tooltip: { enabled: false },
                legend: { display: false } // Set to false if you don't want to display the legend
            },
            aspectRatio: 1, // Keep the chart as a square
            maintainAspectRatio: false // Allow resizing to not maintain the aspect ratio
        },
        plugins: [{
            beforeDraw: function(chart) {
                var width = chart.width,
                    height = chart.height,
                    ctx = chart.ctx;
                ctx.restore();
                var fontSize = (height / 200).toFixed(2);
                ctx.font = fontSize + "em sans-serif";
                ctx.textBaseline = "middle";
                var text = chart.data.datasets[0].data[0].toFixed(1) + "% Savings",
                    textX = Math.round((width - ctx.measureText(text).width) / 2),
                    textY = height / 2;
                ctx.fillText(text, textX, textY);
                ctx.save();
            }
        }]
    });
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const currentBillAmountValue = document.getElementById('bill-amount').value;
        const currentBillAmount = parseFloat(currentBillAmountValue);

        if (isNaN(currentBillAmount)) {
            alert('Please enter a valid number for the current bill amount.');
            return;
        }
             // ... existing code ...
        
    
            // ... rest of your existing code ...
 
        // Example calculations 
        const solarInRsa = 300 *0.18; // not sure 
        const billWithSolarPower = currentBillAmount - solarInRsa;
        const savingsPercentage = ((currentBillAmount - billWithSolarPower) / currentBillAmount) * 100;
        const solarInkw= currentBillAmount/0.18;

        expenseChart.data.datasets[0].data = [currentBillAmount, billWithSolarPower];
        expenseChart.update();

        savingsChart.data.datasets[0].data = [savingsPercentage, 100 - savingsPercentage];
        savingsChart.update();

    
       
  
  
        // Calculate and display environmental impact
        const TreesSavedPerKWh = 0.0117; // Trees saved per kWh
        const CarsOffRoadPerKWh = 0.0001; // Cars off the road per kWh

        const TreesSaved = solarInRsa * TreesSavedPerKWh;
        const CarsOffRoad = solarInRsa * CarsOffRoadPerKWh;
// Assuming the values for CO2EmissionsSaved, TreesSaved, and CarsOffRoad have been defined elsewhere
 document.getElementById('treesSavedText').textContent = `${TreesSaved.toFixed(2)}`;
document.getElementById('carsOffRoadText').textContent = `${CarsOffRoad.toFixed(2)}`;

// Set the text of the span to the value of currentBillAmount
document.getElementById('currentBillAmount').textContent =`Avg Energy Consumption / Monthly: ${ currentBillAmount.toFixed(2)} SAR`;
 

document.getElementById('currentBillAmountinkw').textContent =`Solar Energy Preduction / Monthly: ${ solarInkw.toFixed(2)} SAR`;


    });
});

 