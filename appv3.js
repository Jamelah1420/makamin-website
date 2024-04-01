document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('expense-form');

    // Initialize Charts
    const xBar = document.getElementById('over').getContext('2d');

    // Bar Chart for Over/Under production
    const over = new Chart(xBar, {
        type: 'bar',
        data: {
            labels: ['Consuption ', 'Preduction'],
            datasets: [{
                label: 'Amount in kWh',
                data: [0, 0], // Initially empty
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
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



    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const currentBillAmountValue = document.getElementById('bill-amount').value;
        const currentBillAmount = parseFloat(currentBillAmountValue);

        if (isNaN(currentBillAmount)) {
            alert('Please enter a valid number for the current bill amount.');
            return;
        }

        // Example calculations 
        const solarInRsa = 300 * 0.18; // not sure 
        const billWithSolarPower = currentBillAmount - solarInRsa;
        const savingsPercentage = ((currentBillAmount - billWithSolarPower) / currentBillAmount) * 100;

        // Update the charts
        over.data.datasets[0].data = [solarInRsa, currentBillAmount - solarInRsa];
        over.update();

      
        // Calculate and display environmental impact
        const CO2EmissionsPerKWh = 0.569; // CO2 emissions per kWh
        const TreesSavedPerKWh = 0.0117; // Trees saved per kWh
        const CarsOffRoadPerKWh = 0.0001; // Cars off the road per kWh

        const CO2EmissionsSaved = solarInRsa * CO2EmissionsPerKWh;
        const TreesSaved = solarInRsa * TreesSavedPerKWh;
        const CarsOffRoad = solarInRsa * CarsOffRoadPerKWh;


        document.getElementById('co2Emissions').textContent = ` ${CO2EmissionsSaved.toFixed(2)} kg`;
        document.getElementById('treesSaved').textContent = ` ${TreesSaved.toFixed(2)}`;
        document.getElementById('carsOffRoad').textContent = ` ${CarsOffRoad.toFixed(2)}`;
    });
});
