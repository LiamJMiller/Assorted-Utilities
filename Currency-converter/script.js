document.getElementById("convert").addEventListener("click", function () {
	var fromCurrency = document.getElementById("fromCurrency").value;
	var toCurrency = document.getElementById("toCurrency").value;
	var amount = document.getElementById("amount").value;
	var conversionRates = {
		GBP: { GBP: 1, USD: 1.33, EUR: 1.13, JPY: 146.87, AUD: 1.78 },
		USD: { GBP: 0.75, USD: 1, EUR: 0.85, JPY: 110.15, AUD: 1.34 },
		EUR: { GBP: 0.88, USD: 1.18, EUR: 1, JPY: 130.33, AUD: 1.58 },
		JPY: { GBP: 0.0068, USD: 0.0091, EUR: 0.0077, JPY: 1, AUD: 0.012 },
		AUD: { GBP: 0.56, USD: 0.75, EUR: 0.63, JPY: 83.33, AUD: 1 },
	};
	var result = amount * conversionRates[fromCurrency][toCurrency];
	document.getElementById("result").value = result.toFixed(2);
});
