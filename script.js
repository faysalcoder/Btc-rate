const usdRate = document.getElementById("Usdrate");
const eurRate = document.getElementById("Eurrate");
const gbrRate = document.getElementById("Gbrrate");


const btcRate = async (currency) => {
    try {
        const url = `https://api.coindesk.com/v1/bpi/currentprice/${currency}.json`
        const res = await fetch(url)
        const data = await res.json()
        loadData(data.bpi)
    }
    catch {

    }
}

btcRate('eur')
btcRate('usd')

const loadData = (data) => {
    const usd = data.USD.rate;
    const eur = data.EUR.rate;
    console.log(usd)
    usdRate.innerText = `${usd}`;
    eurRate.innerText = `${eur}`;
}


//Rate

const today = new Date();
let date = 0;
let month = 0;
const dateValid = (number) => {
    if (number < 10) {
        return '0' + number;
    }
    else {
        return number
    }
}
const lastMonth = today.getFullYear() + '-' + (dateValid(today.getMonth())) + '-' + (dateValid(today.getDate()));
const currentMonth = today.getFullYear() + '-' + (dateValid(today.getMonth() + 1)) + '-' + (dateValid(today.getDate()));

const maxEurSelector = document.getElementById('topeurrate');
const minEurSelector = document.getElementById('lessusdrate');


const compareBtcRate = (currency) => {
    const url = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${lastMonth}&end=${currentMonth}&currency=${currency}`;
    fetch(url)
        .then(res => res.json())
        .then(data => { return data.bpi }
        )
}

const data = compareBtcRate('usd')
console.log(data)
const selectors = (max, min, data) => {
    const maxUsdSelector = document.getElementById(max);
    const minUsdSelector = document.getElementById(min);
    console.log(data)

    const getMaxValue = (datas) => {
        let rates = []
        const dates = Object.keys(datas);

        dates.map(date => {
            rates.push(datas[date])
        })
        const maxRate = Math.max.apply(null, rates);
        const minRate = Math.min.apply(null, rates);
        console.log(maxRate)
        maxUsdSelector.innerText = `${maxRate}`;
        minUsdSelector.innerText = minRate
    }
    getMaxValue(data)
}
const getValue = (currency) => {

    // if (data) {
    //     selectors(`top${currency}rate`, `less${currency}rate`, data)
    //     console.log(`top${currency}rate`)
}






getValue('usd')