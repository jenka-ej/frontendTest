const baseCurrency = document.getElementById("baseCurrency");
const finalCurrency = document.getElementById("finalCurrency");
const amountInput = document.getElementById("amountInput");
const amountOutput = document.getElementById("amountOutput");

const directConvert = async () => {
  const baseCurrencyValue = baseCurrency.value;
  const finalCurrencyValue = finalCurrency.value;
  const amountInputValue = amountInput.value;

  
  try {
    const response = await fetch(`https://open.er-api.com/v6/latest/${baseCurrencyValue}`);
    const data = await response.json();
    const exchangeRate = data.conversion_rates[finalCurrencyValue];
    const convertedAmount = amountInputValue * exchangeRate;
    amountOutput.value = Number(convertedAmount.toFixed(1));
  } catch (err) {
    console.log(err);
  }
}

const reverseConvert = async () => {
  const baseCurrencyValue = baseCurrency.value;
  const finalCurrencyValue = finalCurrency.value;
  const amountOutputValue = amountOutput.value;
  
  try {
    const response = await fetch(`https://open.er-api.com/v6/latest/${finalCurrencyValue}`);
    const data = await response.json();
    const exchangeRate = data.conversion_rates[baseCurrencyValue];
    const convertedAmount = amountOutputValue * exchangeRate;
    amountInput.value = Number(convertedAmount.toFixed(1));
  } catch (err) {
    console.log(err);
  }
}

baseCurrency.addEventListener("change", directConvert);
finalCurrency.addEventListener("change", directConvert);
amountInput.addEventListener("input", directConvert);
amountOutput.addEventListener("input", reverseConvert);
