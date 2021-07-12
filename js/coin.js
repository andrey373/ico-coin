const coinList = document.querySelector('.coin_list'),
coinCrypto = coinList.querySelectorAll('.coin_crypto'),
coinItem = coinList.querySelectorAll('.coin_item'),
rate = coinList.querySelectorAll('.rate');

let xhr = new XMLHttpRequest();
xhr.open('GET', 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,TRX,ETH,LTC,XRP,BNB,UNI,BCH,ETC,ADA,ICP,THETA&tsyms=USD&api_key=0f1159d6f84a071413e0af5edecf084a721fd8dbd7c6cbcd7c1f24eaaeb2f56b');
xhr.send();

xhr.addEventListener('load', function(){
    if(xhr.readyState === 4 && xhr.status < 400){
        coinInit(JSON.parse(xhr.response));
    }
})

function coinInit(currency){
    let coinRate = currency;
    let keysObj = Object.keys(coinRate.DISPLAY);
    
    for(let i = 0; i < rate.length; i++){
        coinCrypto[i].textContent = keysObj[i];
        coinCrypto[i].parentElement.previousElementSibling.src = `https://www.cryptocompare.com${coinRate.DISPLAY[keysObj[i]].USD.IMAGEURL}`;
        rate[i].textContent = coinRate.DISPLAY[keysObj[i]].USD.PRICE;

        if(coinRate.DISPLAY[keysObj[i]].USD.PRICE > coinRate.DISPLAY[keysObj[i]].USD.LOWHOUR){
            rate[i].style.cssText = 'color: green;';
        }else{
            rate[i].style.cssText = 'color: red;';
        }
    }
}

function scrollCoinList(){
    let firstElement = coinList.firstElementChild;
    let valueScoll = firstElement.offsetWidth + 30;
    firstElement.style.cssText = `margin-left: -${valueScoll}px;`;


    setTimeout(() => {
        coinRemove(firstElement);
    }, 2000)
}

setTimeout(() => {scrollCoinList();}, 1000);

function coinRemove(param){
    param.remove();
    param.style.marginLeft = 0;
    coinList.appendChild(param);    
    scrollCoinList(); 
}
