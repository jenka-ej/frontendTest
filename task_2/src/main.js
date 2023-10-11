const baseCurrency = document.getElementById("baseCurrency");
const finalCurrency = document.getElementById("finalCurrency");
const amountInput = document.getElementById("amountInput");
const amountOutput = document.getElementById("amountOutput");

const directConvert = () => {
  const baseCurrencyValue = baseCurrency.value;
  const finalCurrencyValue = finalCurrency.value;
  const amountInputValue = amountInput.value;

  fetch(`https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/${baseCurrencyValue}`)
    .then((response) => response.json())
    .then((data) => {
      const exchangeRate = data.conversion_rates[finalCurrencyValue];
      const convertedAmount = amountInputValue * exchangeRate;
      amountOutput.value = Number(convertedAmount.toFixed(1));
    })
    .catch((err) => {
      console.log(err);
    });
}

const reverseConvert = () => {
  const baseCurrencyValue = baseCurrency.value;
  const finalCurrencyValue = finalCurrency.value;
  const amountOutputValue = amountOutput.value;

  fetch(`https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/${finalCurrencyValue}`)
    .then((response) => response.json())
    .then((data) => {
      const exchangeRate = data.conversion_rates[baseCurrencyValue];
      const convertedAmount = amountOutputValue * exchangeRate;
      amountInput.value = Number(convertedAmount.toFixed(1));
    })
    .catch((err) => {
      console.log(err);
    });
}

baseCurrency.addEventListener("change", directConvert);
finalCurrency.addEventListener("change", directConvert);
amountInput.addEventListener("input", directConvert);
amountOutput.addEventListener("input", reverseConvert);
