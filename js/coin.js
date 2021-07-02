const coinList = document.querySelector('.coin_list'),
coinCrypto = coinList.querySelectorAll('.coin_crypto');
rate = coinList.querySelectorAll('.rate');

let xhr = new XMLHttpRequest();
xhr.open('GET', 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC,BNB,XRP&tsyms=USD&api_key=0f1159d6f84a071413e0af5edecf084a721fd8dbd7c6cbcd7c1f24eaaeb2f56b');
xhr.send();

xhr.addEventListener('load', function(){
    if(xhr.readyState === 4 && xhr.status < 400){
        coinInit(JSON.parse(xhr.response));
    }
})

function coinInit(currency){
    let coinRate = currency;
    let keysObj = Object.keys(coinRate);

    for(let i = 0; i < rate.length; i++){
        coinCrypto[i].textContent = keysObj[i];
        rate[i].textContent = coinRate[keysObj[i]].USD;
    }
}
