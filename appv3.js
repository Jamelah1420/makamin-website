document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('expense-form');
    const messageElement = document.getElementById('over-under-message');

    // Initialize Charts
    const ctxBar = document.getElementById('expenseChart').getContext('2d');
    const xBar = document.getElementById('over').getContext('2d');
    const ctxDoughnut = document.getElementById('savingsChart').getContext('2d');

    // Bar Chart for Over/Under production
 
    // Expense Chart
    const expenseChart = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: ['Solar Production Energy ', 'Your Consumption of Electricty '],
            datasets: [{
                label: 'Amount in KWH',
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
        const solarInKWH = 300 ; // not sure 

        const billWithSolarPower = currentBillAmount - solarInRsa;
        const savingsPercentage = ((currentBillAmount - billWithSolarPower) / currentBillAmount) * 100;
        const currentBillAmountinKwh= currentBillAmount/0.18;

        expenseChart.data.datasets[0].data = [solarInKWH, currentBillAmountinKwh];
        expenseChart.update();

        savingsChart.data.datasets[0].data = [savingsPercentage, 100 - savingsPercentage];
        savingsChart.update();

      // Display the message based on solar production and consumption
      if (solarInKWH <= currentBillAmountinKwh) {
        messageElement.textContent = "Low solar energy! . Make sure to reduce your energy consumption this month to get greater savings.";
        messageElement.style.color = 'orange';
    } else {
        const excessKWH = solarInKWH - currentBillAmountinKwh; // Calculate the excess KWH
        messageElement.textContent = "High solar energy! You have " + excessKWH.toFixed(2) + " Kwh more to add to your current consumption.";
        messageElement.style.color = 'green';
    }
       
  
  
        // Calculate and display environmental impact
        const TreesSavedPerKWh = 0.0117; // Trees saved per kWh
        const CarsOffRoadPerKWh = 0.0001; // Cars off the road per kWh

        const TreesSaved = solarInRsa * TreesSavedPerKWh;
        const CarsOffRoad = solarInRsa * CarsOffRoadPerKWh;
// Assuming the values for CO2EmissionsSaved, TreesSaved, and CarsOffRoad have been defined elsewhere
 document.getElementById('treesSavedText').textContent = `${TreesSaved.toFixed(2)}`;
document.getElementById('carsOffRoadText').textContent = `${CarsOffRoad.toFixed(2)}`;

// Set the text of the span to the value of currentBillAmount
document.getElementById('currentBillAmount').textContent =`Avg Energy Consumption: Khw / Monthly: ${ currentBillAmountinKwh.toFixed(2)} Kwh`;
 

document.getElementById('currentBillAmountinkw').textContent =`Solar Energy Preduction: Kwh / Monthly: ${ solarInKWH} Kwh`;


    });
});




/////////////////////////////////////


// the appv2 js file 
document.addEventListener('DOMContentLoaded', function() {
    var ctx = document.getElementById('ycostSavingChart').getContext('2d');

    // Initialize the chart with zeros
    var costSavingChart = new Chart(ctx, {
        type: 'bar',
        
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Cost Saving Estimation for 10 years',
                data: new Array(10).fill(0), // Start with zeros
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value + ' SR';
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + Math.round(context.parsed.y) + ' SR';
                        }
                    }
                }
            }
        }
    });

    // Update the chart after the user submits the form
    document.getElementById('expense-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Assuming solarInRsa is the savings amount per year
        const solarInRsa = 300 * 0.18; // This should be calculated based on user input
        const yearlyIncrement = solarInRsa;
        var dataForTenYears = Array.from({ length: 10 }, (item, index) => yearlyIncrement * (index + 1));
        
        // Update chart data
        costSavingChart.data.datasets[0].data = dataForTenYears;
        costSavingChart.update();
    });


     const annualGeneration = solarInRsa * 12; // Multiply by 12 for the annual generation

    // Update the chart with the new data
    var dataForTenYears = Array.from({ length: 10 }, (_, index) => (index + 1) * annualGeneration);

    costSavingChart.data.datasets[0].data = dataForTenYears;
    costSavingChart.update();

    // Update the 'estimatedGenerationLabel' element with the annual generation
    var estimatedGenerationLabel = document.getElementById('estimatedGenerationLabel');
    if(estimatedGenerationLabel) {
        estimatedGenerationLabel.textContent = `Estimated 1st Year Generation: ${annualGeneration.toFixed(2)} kWh`;
    }
});




document.getElementById('expense-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const billAmountElement = document.getElementById('bill-amount');
    const billAmount = parseFloat(billAmountElement.value);
    
    if (isNaN(billAmount)) {
        alert('Please enter a valid number for the bill amount.');
        return;
    }
 
});

function calculateSolarInRsa(billAmount) {
    // Replace this with your actual calculation for solarInRsa
    return billAmount * 0.18; // Example, assuming 0.18 is the multiplier for solarInRsa
}
