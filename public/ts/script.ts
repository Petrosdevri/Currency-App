const fromCurrency: HTMLSelectElement | null = document.getElementById("from-currency");
const fromAmount: HTMLInputElement | null = document.getElementById("from-amount");
const toCurrency: HTMLSelectElement | null = document.getElementById("to-currency");
const toAmount: HTMLInputElement | null = document.getElementById("to-amount");
const rate: HTMLDivElement | null = document.getElementById("rate");
const exchange = document.getElementById("exchange");

if (fromCurrency) fromCurrency.addEventListener('change', convert);
if (fromAmount) fromAmount.addEventListener('input', convert);
if (toCurrency) toCurrency.addEventListener('change', convert);
if (toAmount) toAmount.addEventListener('input', convert);
if (exchange && fromCurrency && fromAmount && toCurrency && toAmount) exchange.addEventListener('click', () => {
    let tempCurrency = fromCurrency.value;
    let tempAmount = fromAmount.value;
    fromCurrency.value = toCurrency.value;
    fromAmount.value = toAmount.value;
    toCurrency.value = tempCurrency;
    toAmount.value = tempAmount;
});

function convert() {
    if (fromCurrency && typeof fromAmount === 'number' && toCurrency && toAmount && rate)
    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency.value}`)
        .then(res => res.json())
        .then(res => {
            const rateValue = res.rates[`${toCurrency.value}`];
            rate.innerHTML = `1 ${fromCurrency.value} = ${rateValue ? rateValue : ' '} ${toCurrency.value}`;
            toAmount.value = (rateValue * fromAmount.value).toFixed(2);
        })
        .catch(error => console.log('Error:', error));
}

convert();