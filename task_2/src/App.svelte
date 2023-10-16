<script lang="ts">
  let baseCurrency: string = 'RUB';
  let finalCurrency: string = 'RUB';
  let amountInput: number = 0;
  let amountOutput: number = 0;
  let directRate: number = 1;
  let reverseRate: number = 1;

  const apiKey = '412ab28c48d50813a8259807';
  
  async function changeRate() {
    const directUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${baseCurrency}`;
    const reverseUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${finalCurrency}`;

    const [directData, reverseData] = await Promise.all([
      fetch(directUrl).then((response) => response.json()), 
      fetch(reverseUrl).then((response) => response.json()),
    ]);
    
    directRate = directData.conversion_rates[finalCurrency];
    reverseRate = reverseData.conversion_rates[baseCurrency];
    const directResult = amountInput * directRate;
    amountOutput = directResult.toFixed(2);
  }

  const changeInput = (type: string) => {
    if (type === 'direct') {
      const directResult = amountInput * directRate;
      amountOutput = directResult.toFixed(2);
    } else {
      const reverseResult = amountOutput * reverseRate;
      amountInput = reverseResult.toFixed(2);
    }
  };
</script>

<main>
  <h1>Сервис для конвертации валют</h1>

  <div class="form-group">
    <label for="amountInput">Сумма конвертации:</label>
    <input type="number" bind:value={amountInput} on:input={() => changeInput('direct')} id="amountInput" min="0" />
    <select id="baseCurrency" bind:value={baseCurrency} on:change={changeRate}>
      <option value="RUB">RUB</option>
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="GBP">GBP</option>
      <option value="KZT">KZT</option>
      <option value="ETB">ETB</option>
    </select>
  </div>

  <div class="form-group">
    <label for="amountOutput">Результат конвертации:</label>
    <input type="number" bind:value={amountOutput} on:input={() => changeInput('reverse')} id="amountOutput" min="0" />
    <select id="finalCurrency" bind:value={finalCurrency} on:change={changeRate}>
      <option value="RUB">RUB</option>
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="GBP">GBP</option>
      <option value="KZT">KZT</option>
      <option value="ETB">ETB</option>
    </select>
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
