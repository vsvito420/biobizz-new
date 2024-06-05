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
            "Root Juice":   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "Bio Grow":     [1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
            "Fish Mix":     [1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
            "Bio Bloom":    [1, 2, 2, 3, 3, 4, 4, 4, 0, 0],
            "Top Max":      [1, 1, 1, 1, 1, 4, 4, 4, 0, 0],
            "Bio Heaven":   [2, 2, 3, 4, 4, 5, 5, 5, 0, 0],
            "Acti Vera":    [2, 2, 3, 4, 4, 5, 5, 5, 0, 0],
            "Microbes":     [0.2, 0.2, 0.4, 0.4, 0.2, 0.2, 0.2, 0, 0, 0]
        },
        lightmix: {
            "Root Juice":   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "Bio Grow":     [2, 2, 3, 3, 4, 4, 4, 4, 0, 0],
            "Fish Mix":     [2, 2, 3, 3, 4, 4, 4, 4, 0, 0],
            "Bio Bloom":    [1, 2, 2, 3, 3, 4, 4, 4, 0, 0],
            "Top Max":      [1, 1, 1, 1, 1, 4, 4, 4, 0, 0],
            "Bio Heaven":   [2, 2, 3, 4, 4, 5, 5, 5, 0, 0],
            "Acti Vera":    [2, 2, 3, 4, 4, 5, 5, 5, 0, 0],
            "Alg A Mic": [1, 2, 2, 3, 3, 4, 4, 4, 0, 0],
            "Microbes":     [0.2, 0.2, 0.4, 0.4, 0.2, 0.2, 0.2, 0, 0, 0]        }
    };

    const colors = {
        "Root Juice": "#6f564f",
        "Bio Grow": "#3c6e41",
        "Fish Mix": "#164178",
        "Bio Bloom": "#ff6e5a",
        "Top Max": "#b93d3b",
        "Bio Heaven": "#39a0a7",
        "Acti Vera": "#629a3c",
        "Alg A Mic": "#3ab34a",
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
                        <th>Produkt</th>
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
