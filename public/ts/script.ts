const fromCurrency = document.getElementById("from-currency") as HTMLSelectElement;
const fromAmountElement = document.getElementById("from-amount");
const toCurrency = document.getElementById("to-currency") as HTMLSelectElement;
const toAmount = document.getElementById("to-amount") as HTMLInputElement;
const rate = document.getElementById("rate") as HTMLElement;
const exchange = document.getElementById("exchange") as HTMLButtonElement;

function isHTMLInputElement(element: HTMLElement | null): element is HTMLInputElement {
    return element !== null && element instanceof HTMLInputElement;
}

if (isHTMLInputElement(fromAmountElement)) {
    const fromAmount = fromAmountElement;

    if (fromCurrency) fromCurrency.addEventListener('change', convert);
    if (fromAmount) fromAmount.addEventListener('input', convert);
    if (exchange && fromCurrency && fromAmount && toCurrency && toAmount) exchange.addEventListener('click', () => {
        let tempCurrency = fromCurrency.value;
        let tempAmount = fromAmount.value;
        fromCurrency.value = toCurrency.value;
        fromAmount.value = toAmount.value;
        toCurrency.value = tempCurrency;
        toAmount.value = tempAmount;
    });
    if (toCurrency) toCurrency.addEventListener('change', convert);
    if (toAmount) toAmount.addEventListener('input', convert);

    function convert() {
        if (fromCurrency && toCurrency && toAmount && rate) {
            fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency.value}`)
                .then(res => res.json())
                .then(res => {
                    const rateValue: number = res.rates[`${toCurrency.value}`];
                    rate.innerHTML = `1 ${fromCurrency.value} = ${rateValue ? rateValue : ' '} ${toCurrency.value}`;
                    toAmount.value = (rateValue * parseInt(fromAmount.value)).toFixed(2);
                })
                .catch(error => console.log('Error:', error));
        }
    }
    
    convert();
}