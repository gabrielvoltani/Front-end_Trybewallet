async function getCurrencies() {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currency = await response.json();
  return currency;
}

export default getCurrencies;
