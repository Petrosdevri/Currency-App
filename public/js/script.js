const fromCurrency = document.getElementById("from-currency");
const fromAmount = document.getElementById("from-amount");
const toCurrency = document.getElementById("to-currency");
const toAmount = document.getElementById("to-amount");
const rate = document.getElementById("rate");
const exchange = document.getElementById("exchange");

fromCurrency.addEventListener('change', convert);
fromAmount.addEventListener('input', convert);
toCurrency.addEventListener('change', convert);
toAmount.addEventListener('input', convert);
exchange.addEventListener('click', () => {
    let tempCurrency = fromCurrency.value;
    let tempAmount = fromAmount.value;
    fromCurrency.value = toCurrency.value;
    fromAmount.value = toAmount.value;
    toCurrency.value = tempCurrency;
    toAmount.value = tempAmount;
});

function convert() {
    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency.value}`)
        .then(res => res.json())
        .then(res => {
            const rateValue = res.rates[`${toCurrency.value}`];
            rate.innerHTML = `1 ${fromCurrency.value} = ${rateValue} ${toCurrency.value}`;
            toAmount.value = (rateValue * fromAmount.value).toFixed(2);
        })
        .catch(error => console.log('Error:', error));
}

convert();