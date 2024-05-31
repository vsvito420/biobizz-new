document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("button");
    const weekInput = document.getElementById("week");
    const dateInput = document.getElementById("date");
    const waterAmountInput = document.getElementById("water-amount");
    const waterAmountValue = document.getElementById("water-amount-value");
    const output = document.getElementById("output");
    const soilType = document.getElementById("soil-type");

    const dosages = {
        allmix: {
            "Root Juice": [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
            "Bio Grow": [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5],
            "Fish Mix": [2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5],
            "Bio Bloom": [2, 2, 3, 3, 4, 4, 4, 4, 4, 4],
            "Top Max": [1, 2, 3, 3, 4, 4, 4, 4, 4, 4],
            "Bio Heaven": [2, 2, 2, 3, 3, 4, 4, 4, 4, 4],
            "Acti Vera": [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
            "Microbes": [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5]
        },
        lightmix: {
            "Root Juice": [0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25],
            "Bio Grow": [0.5, 0.8, 1, 1.2, 1.5, 1.8, 2, 2.2, 2.5, 2.8],
            "Fish Mix": [1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25],
            "Bio Bloom": [1, 1, 1.5, 1.5, 2, 2, 2, 2, 2, 2],
            "Top Max": [0.5, 1, 1.5, 1.5, 2, 2, 2, 2, 2, 2],
            "Bio Heaven": [1, 1, 1, 1.5, 1.5, 2, 2, 2, 2, 2],
            "Acti Vera": [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5],
            "Microbes": [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75]
        }
    };

    const colors = {
        "Root Juice": "#6f564f",
        "Bio Grow": "#3c6e41",
        "Fish Mix": "#164178",
        "Bio Bloom": "#ff6e5a",
        "Top Max": "#b93d3b",
        "Bio Heaven": "#39a0a7",
        "Acti Vera": "#629a3c",
        "Microbes": "#2b231c"
    };

    waterAmountInput.addEventListener("input", () => {
        waterAmountValue.textContent = `${waterAmountInput.value} ml`;
    });

    button.addEventListener("click", () => {
        const selectedSoil = soilType.value;
        const week = parseInt(weekInput.value, 10);
        const date = dateInput.value;
        const waterAmount = parseInt(waterAmountInput.value, 10);

        let calculatedWeek = null;

        if (week >= 1 && week <= 10) {
            calculatedWeek = week;
        } else if (date) {
            const startDate = new Date("2024-05-01"); // Beispiel-Startdatum
            const inputDate = new Date(date);
            const diffTime = Math.abs(inputDate - startDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            calculatedWeek = Math.ceil(diffDays / 7);
            if (calculatedWeek > 10) calculatedWeek = 10;
        }

        if (!calculatedWeek) {
            output.textContent = "Bitte geben Sie entweder eine gültige Woche (1-10) oder ein gültiges Datum ein.";
            return;
        }

        const selectedDosages = dosages[selectedSoil];
        let result = `
            <table>
                <thead>
                    <tr>
                        <th>Dünger</th>
                        <th>Menge (ml)</th>
                    </tr>
                </thead>
                <tbody>
        `;

        for (const [nutrient, doses] of Object.entries(selectedDosages)) {
            const dose = doses[calculatedWeek - 1] * waterAmount / 1000;
            result += `
                <tr style="color: ${colors[nutrient]}">
                    <td>${nutrient}</td>
                    <td>${dose.toFixed(2)} ml</td>
                </tr>
            `;
        }

        result += "</tbody></table>";
        output.innerHTML = result;
    });
});
