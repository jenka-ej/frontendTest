<script>
  let baseCurrency = 'RUB';
  let finalCurrency = 'RUB';
  let amountInput = 0;
  let amountOutput = 0;

  const apiKey = '412ab28c48d50813a8259807';

  function convert(type) {
    let url;
    if (type === 'direct') {
      url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${baseCurrency}/${finalCurrency}/${amountInput}`;
    } else {
      url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${finalCurrency}/${baseCurrency}/${amountOutput}`;
    }
    
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const result = data.conversion_result;
        if (type === 'direct') {
	  amountOutput = Number(result.toFixed(1));
        } else {
	  amountInput = Number(result.toFixed(1));
        }
      })
      .catch((err) => console.log(err));
  }  
</script>

<main>
  <h1>Сервис для конвертации валют</h1>
  
  <div class="form-group">
    <label for="baseCurrency">Исходная валюта:</label>
    <select id="baseCurrency" bind:value={baseCurrency}>
      <option value="RUB">RUB</option>
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="GBP">GBP</option>
      <option value="KZT">KZT</option>
      <option value="ETB">ETB</option>
    </select>
  </div>

  <div class="form-group">
    <label for="finalCurrency">Итоговая валюта:</label>
    <select id="finalCurrency" bind:value={finalCurrency}>
      <option value="RUB">RUB</option>
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="GBP">GBP</option>
      <option value="KZT">KZT</option>
      <option value="ETB">ETB</option>
    </select>
  </div>
  
  <div class="form-group">
    <label for="amountInput">Сумма конвертации:</label>
    <input type="number" bind:value={amountInput} on:change={() => convert('direct')} id="amountInput" min="0" step="0.1" />
  </div>
 
  <div class="form-group">
    <label for="amountOutput">Результат конвертации:</label>
    <input type="number" bind:value={amountOutput} on:change={() => convert('reverse')} id="amountOutput" min="0" step="0.1" />
  </div>
</main>

<style>
  .form-group {
    margin-bottom: 20px;
  }

  .form-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .form-group input {
    width: 20%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
</style>
