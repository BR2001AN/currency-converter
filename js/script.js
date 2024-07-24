const dropList = document.querySelectorAll(".drop-list select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
getButton = document.querySelector("form button");

for (let i = 0; i < dropList.length; i++) {
    for(currency_code in country_code){
        // SELECTING USD BY DEFAULT AS FROM CURRENCY AND  NPR TO CURRENCY
        let selected; 
        if (i == 0) {
            selected = currency_code == "USD" ? "selected" : "";
        }else if(i == 1) {
            selected = currency_code == "NPR" ? "selected"  :""
        }
        // CREATING A TAG FOR EACH CURRENCY CODE
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        // INSERT OPTIONS TAG INTO THE DROPDOWN LIST
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e => {
        loadFlag(e.target);
});
}
function loadFlag(element) {
    for(code in country_code){
        if(code == element.value){
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = 'https://flagsapi.com/' + country_code[code] + '/flat/64.png';
        }
    }
}

getButton.addEventListener("load", e => {
    getExchangeRate();
})

getButton.addEventListener("click", e => {
    e.preventDefault();
    getExchangeRate();
})

const exchangeIcon = document.querySelector(".drop-list .icon");
exchangeIcon.addEventListener("click", () => {
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency)
    loadFlag(toCurrency)
    getExchangeRate();
})

function getExchangeRate() {
    const amount = document.querySelector(".amount input");
    const exchangerateTxt = document.querySelector(".exchange-rate")
    let amountVal = amount.value;
    if(amountVal == "" || amountVal == "0") {
        amount.value = "1";
        amountVal = 1;
    }
    exchangerateTxt.innerText = "Getting exchange rate...";
    let url = ' https://v6.exchangerate-api.com/v6/095afe1819556fa2521c1f72/latest/USD';
    fetch(url).then(response => response.json()).then(result => {
        let exchangerate = result.conversion_rates[toCurrency.value];
        let totalExchangeRate= (amountVal * exchangerate).toFixed(2);
        exchangerateTxt.innerText = `${amountVal} ${fromCurrency.value}= ${totalExchangeRate} ${toCurrency.value}`
    }).catch(() =>{
        exchangerateTxt.innerText = "Something went wrong"
    })
}



